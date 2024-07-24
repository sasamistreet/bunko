import "https://esm.sh/v135/@supabase/functions-js@2.4.2/src/edge-runtime.d.ts"
import Stripe from 'https://esm.sh/stripe@11.16.0?target=deno';
 
const stripe = new Stripe(Deno.env.get('SECRET_STRIPE_KEY') as string, {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log("Hello from Functions!")

Deno.serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')
 
  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text()
  let receivedEvent
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    )
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
  switch (receivedEvent.type) {
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
					//const session = event.data.object;
					// Save an order in your database, marked as 'awaiting payment'
					//createOrder(session);
					break;
        case 'checkout.session.async_payment_succeeded':
          //fulfillCheckout(event.data.object.id);
          break;
				case 'checkout.session.async_payment_failed': 
					// Send an email to the customer asking them to retry their order
					//emailCustomerAboutFailedPayment(event.data.object);
					break;
        case 'payment_intent.created': 
					console.log("payment intent created!");
					break;
				default:
					throw new Error('Unhandled relevant event!');
  }
  
  console.log(`🔔 Event received: ${receivedEvent.id}`)
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})