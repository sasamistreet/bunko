import { json } from '@sveltejs/kit';
import { supabase } from "$lib/server/supabaseClient";

async function getSingleStep(workId: number, step: number){
    const{ data, error } = await supabase.from("Step").select().match({ workId: workId, step: step }).single();
    return data;
}

export async function GET({ url }) {
    try {
        //const stepJson = await getSingleStep(url.searchParams.get('work'), url.searchParams.get('step'));
        const stepJson = await getSingleStep(1, 1);
        return json(stepJson);
    } catch (error) {
        const stepJson = await getSingleStep(1, 1);
        return json(stepJson);
    }
}