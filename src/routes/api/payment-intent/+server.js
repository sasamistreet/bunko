import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit';
//import type { RequestHandler } from './$types';

// initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY)

// handle POST /create-payment-intent
export async function POST() {
  // create the payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    // note, for some EU-only payment methods it must be EUR
    currency: 'usd',
    // specify what payment methods are allowed
    // can be card, sepa_debit, ideal, etc...
    //payment_method_types: ['card'],
    automatic_payment_methods: {
      enabled: true
    }
  })
  return json({
      clientSecret: paymentIntent.client_secret,
  });
}