import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { SECRET_STRIPE_KEY } from '$env/static/private'
import Stripe from 'stripe'

export async function GET({request}){
    //const stripe = require('stripe')('sk_test_51C2wLoKf3NgKqC99C5UcjQZGsphNUV5WS71Us8Rp06tLJnSICB5TobhpTlk1zfhtYvB20UQBsA6lKiPs1qRmrOaL00pJA5E4De');

    const stripe = new Stripe(SECRET_STRIPE_KEY)
    try{
    const session = await stripe.checkout.sessions.create({
    line_items: [
        {
        price: 'price_1KTfddKf3NgKqC99gmaxn8Tt',
        quantity: 1,
        },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/checkout/?success',
    cancel_url: `http://localhost:5173/checkout/?canceled=true`,
    });

    return json(session);
    //redirect(303, session.url);
  } catch (error) {
    console.log(error)
  }
}