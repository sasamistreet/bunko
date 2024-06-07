import { supabase } from "$lib/server/supabaseClient";
import { json } from '@sveltejs/kit';


export async function GET({locals:{user, supabase}, url}){
    try {
        const res = await supabase.from('Wishlist').select().match({'user_id':user?.id, 'work_id': url.searchParams.get('work')})
        return json(res);
    } catch(error) {
        console.log(error)
    }
}