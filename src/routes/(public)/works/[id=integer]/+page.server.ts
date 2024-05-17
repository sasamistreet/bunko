import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad } from './$types';
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { wishlistSchema, cartSchema } from "./schema"


async function addToWishlist(workId:number){
    await supabase.from('Wishlist').upsert({work_id:workId}).select()
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
    addWishlist:async(event)=>{
        const form = await superValidate(event, zod(wishlistSchema));
        if (!form.valid) {
        return fail(400, {
            form,
        });
        }
        return {
            form,
        };
    },
    addCart:async() => {

    }
}