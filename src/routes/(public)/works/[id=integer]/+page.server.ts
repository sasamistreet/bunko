import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({locals:{user, supabase}, params}) => {
    try {
        const { data } = await supabase.from('work').select(`*, profile(display_name)`).eq('id', params.id).limit(1).single();
        const work = data;
        return { work }; 
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
            const { data } = await supabase.from('cart').insert({user_id:user?.id, work_id:formdata.get('workId')});
            return data;
        } catch (error) {
            console.log( error );
        }
    }
}