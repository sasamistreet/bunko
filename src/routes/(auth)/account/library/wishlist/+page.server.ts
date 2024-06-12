import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/server/supabaseClient";
import { json } from "@sveltejs/kit";

async function getWishlist(userId:string|undefined) {
    try {
        const { data } = await supabase.from("Wishlist").select(`*, Work(title)`).eq("user_id", userId);
        console.log(data);
        return data
        
    } catch(error) {
        return error;
    }
}

export const load: PageServerLoad = async({ locals:{ user, supabase} }) => {
    try {
        //const items = await getWishlist(user?.id)
        const { data } = await supabase.from("Wishlist").select(`*, Work(title)`).eq("user_id", user?.id);
        const items = data;
        return { items };
    } catch(error) {
        console.log(error);
    }
};

export const actions = {
    delete: async({ locals:{ supabase, user }, request }) => {
            //await new Promise((fulfil) => setTimeout(fulfil, 1000));
            const data = await request.formData();
            await supabase.from("Wishlist").delete().match({"user_id": user?.id, "work_id": data.get('work_id')})
    },
    cart: async() => {

    }
};