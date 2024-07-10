import { env } from '$env/dynamic/private';
import Stripe from 'stripe';

export const stripe = new Stripe(env.SECRET_STRIPE_KEY ?? '', {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: '2024-04-10',
	// Register this as an official Stripe plugin.
	// https://stripe.com/docs/building-plugins#setappinfo
	appInfo: {
		name: 'SvelteKit Subscription Starter',
		version: '0.0.1'
	}
});