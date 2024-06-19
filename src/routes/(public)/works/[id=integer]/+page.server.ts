import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
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
        const formdata = await request.formData();
        try {
            const { data } = await supabase.from('Wishlist').insert({user_id:user?.id, work_id:formdata.get('workId')});
            return data;
        } catch (error) {
            console.log( error );
        }
    },
    cart:async({locals:{user, supabase}, request}) => {
        const formdata = await request.formData();
        try {
            const { data } = await supabase.from('Cart').insert({user_id:user?.id, work_id:formdata.get('workId')});
            return data;
        } catch (error) {
            console.log( error );
        }
    }
}