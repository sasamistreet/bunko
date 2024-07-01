import { json } from '@sveltejs/kit';

export async function GET({locals:{user, supabase}, params}){
    try {
        const res = await supabase.from('cart').select().match({'user_id':user?.id, 'work_id': params.id})
        return json(res);
    } catch(error) {
        console.log(error)
    }
}
export async function POST({locals:{user, supabase}, params}){
    try {
        const res = await supabase.from('cart').insert({'user_id':user?.id, 'work_id': params.id})
        return json(res);
    } catch(error) {
        console.log(error)
    }
}