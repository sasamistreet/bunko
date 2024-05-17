import { supabase } from "$lib/server/supabaseClient";
import { json } from '@sveltejs/kit';

async function postWishlist(userId:String|undefined, workId:String|null){
    const {data, error} = await supabase.from('Wishlist').insert({ user_id:userId, work_id:workId })
    return data;
}

async function getWishlist(userId:String|undefined, workId:String|null){
    const {data, error} = await supabase.from('Wishlist').select().eq('user_id', userId)
    return data;
}

export async function POST(){
    try {
        const res = postWishlist("673aeacf-3fd6-4853-a87e-107f68005117", "1" )
        return json(res)
    } catch(error) {

    }

}
export async function GET({locals:{user}, url}){
    try {
        const res = getWishlist(user?.id, url.searchParams.get('workId') )
        return json(res)
    } catch(error) {

    }
}