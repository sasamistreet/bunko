import { supabase } from "$lib/server/supabaseClient";
import { json } from '@sveltejs/kit';

async function getWishlist(userId:String|undefined, workId:String|null){
    const {data, error} = await supabase.from('Wishlist').select().match({'user_id':userId, 'work_id':workId})
    return data;
}

export async function GET({locals:{user}, url}){
    try {
        const res = getWishlist(user?.id, url.searchParams.get('workId') )
        return json(res)
    } catch(error) {

    }
}