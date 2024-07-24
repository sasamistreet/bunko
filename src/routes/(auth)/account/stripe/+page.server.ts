import type { PageServerLoad,} from "./$types";
import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';

export const load:PageServerLoad = async () => {
    return  { connected:true };
}

export const actions = {
    account:async() => {
        try {
            const account = await stripe.accounts.create({});
            const account_serialized = JSON.parse(JSON.stringify(account));
            return { account: account_serialized.id };
            //throw redirect()
        } catch (error) {
            console.error('An error occurred when calling the Stripe API to create an account:', error);
            return {error: error};
        }
    },
    account_link:async({request}) => {
        try {
            const data = await request.formData();
            const  account = data.get('account') as string;
            const accountLink = await stripe.accountLinks.create({
              account: account,
              refresh_url: `${request.headers.get('origin')}/account/stripe/refresh/${account}`,
              return_url: `${request.headers.get('origin')}/account/stripe/return/${account}`,
              type: "account_onboarding",
            });
            console.log(accountLink)
            const link_serialized = JSON.parse(JSON.stringify(accountLink));
            return {url: link_serialized.url};
        } catch (error) {
            console.error(
              "An error occurred when calling the Stripe API to create an account link:",
              error
            );
            return json({ error: error, status:500 });
        }
    }
}