import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';

export const load = () => {

}

export const actions = {
    account:async({request}) => {
        try {
            const account = await stripe.accounts.create({
                
              });
            console.log(account)
            return json({account: account.id});
            //throw redirect()
        } catch (error) {
            console.error('An error occurred when calling the Stripe API to create an account:', error);
            return {error: error};
        }
    },
    account_link:async({request}) => {
        try {
            const data = await request.formData();
            const  account = data.get('account');
            if (typeof account === "string"){
              const accountLink = await stripe.accountLinks.create({
                account: account,
                refresh_url: `${request.headers.get('origin')}/refresh/${account}`,
                return_url: `${request.headers.get('origin')}/return/${account}`,
                type: "account_onboarding",
              });
              return json({url: accountLink.url});
            }
          } catch (error) {
            console.error(
              "An error occurred when calling the Stripe API to create an account link:",
              error
            );
            return json({ error: error, status:500 });
          }
    }
}