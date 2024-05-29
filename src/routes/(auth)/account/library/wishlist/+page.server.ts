import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/server/supabaseClient";

async function getWishlist(userId:string) {
    try {
        const { data } = await supabase.from("Wishlist").select(`*, Work(title)`).eq("user_id", userId);
        return data
        
    } catch(error) {
        return error;
    }
}

export const load: PageServerLoad = async({ locals:{ user } }) => {
    try {
        if (user){
            const items = await getWishlist(user.id)
            return { items };
        }
    } catch(error) {
        console.log(error);
    }
};

export const actions = {
    delete:async({locals,request}) => {
        try {
            if (locals.user){
                const data = await request.formData();
                await supabase.from("Wishlist").delete().eq("id", data.get('id'))
            }
        } catch(error) {
            return error
        }
    }
}