import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({ locals:{ user, supabase} }) => {
    try {
        const { data } = await supabase.from("wishlist").select(`*, work(title)`).eq("user_id", user?.id);
        const items = data;
        return { items };
    } catch(error) {
        console.log(error);
    }
};

export const actions = {
    delete: async({ locals:{ supabase }, request }) => {
        const data = await request.formData();
        await supabase.from("Wishlist").delete().eq("id", data.get('id'))
    },
    cart: async({ locals:{ supabase, user }, request }) => {
        const formdata = await request.formData();
        try {
            const { data } = await supabase.from('cart').insert({user_id:user?.id, work_id:formdata.get('workId')});
            return data;
        } catch (error) {
            console.log( error );
        }
    }
};