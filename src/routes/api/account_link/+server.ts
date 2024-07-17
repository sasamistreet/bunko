import { stripe } from '$lib/server/stripe';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST:RequestHandler = async({request}) => {

    try {
      const { account } = request.body?.get('account');

      const accountLink = await stripe.accountLinks.create({
        account: account,
        refresh_url: `${request.headers.get('origin')}/refresh/${account}`,
        return_url: `${request.headers.get('origin')}/return/${account}`,
        type: "account_onboarding",
      });

      return json({url: accountLink.url});

    } catch (error) {
      console.error(
        "An error occurred when calling the Stripe API to create an account link:",
        error
      );
      return { error: error, status:500 };
    }
  }
