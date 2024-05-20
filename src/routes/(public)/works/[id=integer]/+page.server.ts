import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad } from './$types';
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { wishlistSchema, cartSchema } from "./schema"


async function addToWishlist(userId:String, workId:unknown){
    await supabase.from('Wishlist').upsert({user_id:userId, work_id:workId}).select()
}

async function getWishlist(workId:number){
    await supabase.from('Wishlist').upsert({work_id:workId}).select
}

async function getFeatured(path:string){
    const { data } = await supabase.storage.from('works').getPublicUrl(path);
    return data;
}

export const load: PageServerLoad = (async ({ locals:{supabase, user }}) => {
    try {
        const wishlist = await superValidate(zod(wishlistSchema));
        const cart = await superValidate(zod(cartSchema))
        return { user, wishlist, cart } ;
    } catch (error) {

    }
});

export const actions = {
    addWishlist:async({locals, request})=>{
        if (locals.user) {
			const data = await request.formData();
			await addToWishlist(locals.user.id, data.get('workId'));
		}
        console.log("pressed")
    },
    addCart:async() => {

    }
}