import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/server/supabaseClient";

export const load:PageServerLoad = async({ locals:{ user, supabase} }) => {
    try{
        const { data } = await supabase.from("Cart").select(`*, Work(title)`).eq("user_id", user?.id);
        const items = data;
        return { items };
    } catch(error) {

    }
};