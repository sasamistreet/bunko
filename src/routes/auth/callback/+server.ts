import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      console.log("loggedIn");
      //throw redirect(303, `/${next.slice(1)}`);
      redirect(303, `/dashboard`);
    }
  }

  // return the user to an error page with instructions
  redirect(303, '/auth/auth-code-error');
};