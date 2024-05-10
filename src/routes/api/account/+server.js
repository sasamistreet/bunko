import {stripe} from '$lib/utils';
import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';


export async function POST({ request }){

    try {
      const account = await stripe.accounts.create({
        country: 'US',
        email: 'jenny.rosen@example.com',
        controller: {
          fees: {
            payer: 'application',
          },
          losses: {
            payments: 'application',
          },
          stripe_dashboard: {
            type: 'express',
          },
        },
      });

      request.json({account: account.id});
    } catch (error) {
      console.error('An error occurred when calling the Stripe API to create an account:', error);
      request.status(500);
      request.json({error: error.message});
    }

}