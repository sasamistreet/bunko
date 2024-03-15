import type { Actions } from './$types'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'



/*export const actions: Actions = {
	default: async (event) => {
    const { request, url, locals: { supabase } } = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
    
	}
}*/

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
  const session = await getSession()

  // if the user is already logged in return them to the account page
  if (session) {
    redirect(302, `${url.origin}/dashboard`);
    console.log("inneda")
  }

  return { url: url.origin }
}