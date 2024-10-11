import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({ locals:{ user, supabase} }) => {
    try {
        const { data } = await supabase.from("library").select(`*, work(title, author_id)`).eq("user_id", user?.id);
        const items = data;
        return { items };
        
    } catch(error) {
        console.log(error);
    }
};