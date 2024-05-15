import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { profileFormSchema } from "./profile-form.svelte";
import { fail, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals:{supabase}}) => {
	//sample
	//const { data:countries } = await supabase.from('countries').select('name').limit(5).order('name')
	return {
		//countries: countries ?? [],
		form: await superValidate(zod(profileFormSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(profileFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		return {
			form,
		};
	},
};