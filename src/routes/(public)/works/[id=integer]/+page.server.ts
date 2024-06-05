import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad } from './$types';


async function addToWishlist(userId:string|undefined, workId:unknown){
    const { data, error } = await supabase.from('Wishlist').insert({user_id:userId, work_id:workId});
    if ( error ) {
        console.log( error );
    } else {
        return data;
    }
}

async function addToCart(userId:String, workId:unknown){ 
    const { data, error } = await supabase.from('Cart').insert({user_id:userId, work_id:workId})
    return data;
}

async function getProfile(id:string|undefined){
    const { data } = await supabase.from('profile').select().eq("id", id);
    return data;
}

export const load: PageServerLoad = async ({params, depends, locals:{ supabase } }) => {
    try {
        /*depends('supabase:db:Work');
        const { data: work } = await supabase.from('Work').select().eq('id', params.id);
        return { work: work ?? [] }; */
    } catch (error) {
        return { error }
    };
};

export const actions = {
    
    wishlist:async({locals:{ user, supabase }, request})=>{

        const data = await request.formData();
        try {
            //await addToWishlist(user?.id, data.get('workId'));
            const { error } = await supabase.from('Wishlist').insert({user_id:user?.id, work_id:data.get('workId')});
            throw error;
        } catch (error) {
            console.log( error );
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