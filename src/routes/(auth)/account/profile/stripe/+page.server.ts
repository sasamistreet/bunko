import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';

export const load = () => {

}

export const actions = {
    default:async({request}) => {
        try {
            const account = await stripe.accounts.create({});
            return {account: account.id};
        } catch (error) {
            console.error('An error occurred when calling the Stripe API to create an account:', error);
            return {error: error};
        }
    }
}