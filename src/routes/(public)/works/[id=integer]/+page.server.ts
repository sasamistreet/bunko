import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({locals:{user, supabase}, params}) => {
    try {
        const { data:work } = await supabase.from('work').select(`*, profile(display_name)`).eq('id', params.id).limit(1).single();
        const {data:library} = await supabase.from('library').select().match({'user_id':user?.id, 'work_id': params.id});
        const {data:cart} = await supabase.from('cart').select().match({'user_id':user?.id, 'work_id': params.id});
        let isLibrary = false;
        if (library?.length != 0){
            isLibrary = true;
        } else {
            isLibrary = false;
        }
        let isCart = false;
        return { work, isLibrary }; 
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