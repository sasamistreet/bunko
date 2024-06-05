import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/server/supabaseClient";

async function getWishlist(userId:string|undefined) {
    try {
        const { data } = await supabase.from("Wishlist").select(`*, Work(title)`).eq("user_id", userId);
        return data
        
    } catch(error) {
        return error;
    }
}

export const load: PageServerLoad = async({ locals:{ user } }) => {
    try {
        const items = await getWishlist(user?.id)
        return { items };
    } catch(error) {
        console.log(error);
    }
};

export const actions = {
    delete: async({ locals:{ supabase, user }, request }) => {
        try {
            const data = await request.formData();
            const { error } = await supabase.from("Wishlist").delete().match({"user_id": user?.id, "work_id": data.get('work_id')})
            if (error){
                console.log(error);
            }
        } catch( error ) {
            return error
        }
    },
    cart: async() => {

    }
};