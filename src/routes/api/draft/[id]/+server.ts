import { json } from '@sveltejs/kit';

export async function POST({locals:{user, supabase}, params, url}){
    try {
        const res = await supabase.from('work').update({'user_id':user?.id, 'order_drafted': url.searchParams.get('steps')}).eq('id', params.id)
        return json(res);
    } catch(error) {
        console.log(error)
    }
}