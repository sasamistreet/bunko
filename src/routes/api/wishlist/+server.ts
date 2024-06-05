import { supabase } from "$lib/server/supabaseClient";
import { json } from '@sveltejs/kit';

async function getWishlist(userId:String|undefined, workId:String|null){
    const {data, error} = await supabase.from('Wishlist').select().match({'user_id':userId, 'work_id':workId})
    if (!error){
        console.log(userId)
        console.log(workId)
        console.log(data)
        return data;
    } else {
        console.log(error);
    }
}

export async function GET({locals:{user}, url}){
    try {
        const res = await getWishlist(user?.id, url.searchParams.get('work') )
        //const res = await supabase.from('Wishlist').select().match({'user_id':user?.id, 'work_id': url.searchParams.get('work')})
        return json(res);
    } catch(error) {
        console.log(error)
    }
}