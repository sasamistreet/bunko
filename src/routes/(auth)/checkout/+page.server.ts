import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async({locals:{supabase, user}}) => {
    const { data: notes } = await supabase.from('notes').select('id,note').order('id');
    return { notes: notes ?? [] }
}

export const actions = {
    default:async() => {

    }
}