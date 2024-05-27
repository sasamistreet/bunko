import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad } from './$types';
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { wishlistSchema, cartSchema } from "./schema"


async function addToWishlist(userId:String, workId:unknown){ 
    const { data, error } =await supabase.from('Wishlist').insert({user_id:userId, work_id:workId})
    return data;
}

async function addToCart(userId:String, workId:unknown){ 
    const { data, error } =await supabase.from('Cart').insert({user_id:userId, work_id:workId})
    return data;
}


async function getProfile(id:string){
    const { data } = await supabase.from('profile').select().eq("id", id);
    return data;
}

export const load: PageServerLoad = async ({ locals:{ user }}) => {
    try {
        if (user) {
            const profile = await getProfile(user.id);
            return { profile }
        }
        
    } catch (error) {

    };
};

export const actions = {
    wishlist:async({locals, request})=>{
        try {
            if (locals.user) {
                const data = await request.formData();
                await addToWishlist(locals.user.id, data.get('workId'));

            }
        } catch (error) {

        }
        
    },
    cart:async({locals, request}) => {
        try {
            if (locals.user) {
                const data = await request.formData();
                await addToCart(locals.user.id, data.get('workId'));
            }
        } catch (error) {

        }
    }
}