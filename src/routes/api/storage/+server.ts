import { supabase } from "$lib/server/supabaseClient";
import { json } from '@sveltejs/kit';

async function getStorageRoot(path:string){
    const { data } = await supabase.storage.from('works').getPublicUrl(path);
    return data;
}

export async function GET({ url }) {
    const res = await getStorageRoot(url.searchParams.get('path'));
    return json(res);
}