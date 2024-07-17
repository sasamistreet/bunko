import { json, type RequestHandler } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';

export const POST:RequestHandler = async({request}) => {
    try {
        const account = await stripe.accounts.create({});
        return json({account: account.id});
      } catch (error) {
        console.error('An error occurred when calling the Stripe API to create an account:', error);
        return json({error: error}, {status: 500});
      }
}