import { env } from '$env/dynamic/private';
import { stripe } from '$lib/server/stripe';
import fulfillCheckout from '$lib/server/fulfill_checkout';
/*import {
	manageSubscriptionStatusChange,
	upsertPriceRecord,
	upsertProductRecord
} from '$lib/server/supabaseAdmin';*/
import { json, text, type RequestHandler } from '@sveltejs/kit';
import type Stripe from 'stripe';

const relevantEvents = new Set([
	'product.created',
	'product.updated',
	'price.created',
	'price.updated',
	'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
	'checkout.session.async_payment_failed',
	'customer.subscription.created',
	'customer.subscription.updated',
	'customer.subscription.deleted'
]);
/*
const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
}
*/

const createOrder = (session:any) => {
  // TODO: fill me in
  console.log("Creating order", session);
}

const emailCustomerAboutFailedPayment = (session:any) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
}

export const POST: RequestHandler = async ({ request }) => {
	const sig = request.headers.get('stripe-signature');
	const webhookSecret = env.STRIPE_WEBHOOK_SECRET_LIVE ?? env.STRIPE_WEBHOOK_SECRET;
	let event: Stripe.Event;

	try {
		if (!request.body || !sig || !webhookSecret) return text('Client Error', { status: 400 });
		const buf = Buffer.from(await request.arrayBuffer());
		event = await stripe.webhooks.constructEventAsync(buf, sig, webhookSecret);
	} catch (err: any) {
		console.log(`❌ Error message: ${err.message}`);
		return text(`Webhook Error: ${err.message}`, { status: 400 });
	}

	if (relevantEvents.has(event.type)) {
		try {
			switch (event.type) {
				case 'product.created':
				case 'product.updated':
					//await upsertProductRecord(event.data.object as Stripe.Product);
					break;
				case 'price.created':
				case 'price.updated':
					//await upsertPriceRecord(event.data.object as Stripe.Price);
					break;
				case 'customer.subscription.created':
				case 'customer.subscription.updated':
				case 'customer.subscription.deleted':
					/*const subscription = event.data.object as Stripe.Subscription;
					await manageSubscriptionStatusChange(
						subscription.id,
						subscription.customer as string,
						event.type === 'customer.subscription.created'
					);*/
					break;
				case 'checkout.session.completed':
					//fulfillCheckout(event.data.object.id);
					const session = event.data.object;
					// Save an order in your database, marked as 'awaiting payment'
					createOrder(session);
					break;
                case 'checkout.session.async_payment_succeeded':
                    fulfillCheckout(event.data.object.id);
                    break;
				case 'checkout.session.async_payment_failed': 
					// Send an email to the customer asking them to retry their order
					emailCustomerAboutFailedPayment(event.data.object);
					break;
				default:
					throw new Error('Unhandled relevant event!');
			}
		} catch (err) {
			console.log(err);
			return text('Webhook error: "Webhook handler failed. View logs."', { status: 400 });
		}
	}

	return json({ received: true });
};