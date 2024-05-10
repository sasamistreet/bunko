import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad } from './$types';

async function addToWishlist(workId:number){
    await supabase.from('Wishlist').upsert({work_id:workId}).select
}

async function getFeatured(path:string){
    const { data } = await supabase.storage.from('works').getPublicUrl(path);
    return data;
}

export const load = (async ({ locals, params }) => {
    try {
        const featured = getFeatured("work/Apple_logo_black.svg");
        return { featured } ;
    } catch (error) {

    }
})  satisfies PageServerLoad;