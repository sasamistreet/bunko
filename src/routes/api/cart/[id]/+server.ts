import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export async function GET({locals:{user, supabase}, params}){
    try {
        const res = await supabase.from('Cart').select().match({'user_id':user?.id, 'work_id': params.id})
        return json(res);
    } catch(error) {
        console.log(error)
    }
}
export async function POST({locals:{user, supabase}, params}){
    try {
        const res = await supabase.from('Cart').insert({'user_id':user?.id, 'work_id': params.id})
        return json(res);
    } catch(error) {
        console.log(error)
    }
}