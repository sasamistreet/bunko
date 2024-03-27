import { supabase } from '$lib/server/supabaseClient'

export async function loadSteps() {
   // const works = 
   const{ data, error } = await supabase.from("Step").select().eq('workId', 1).filter('step', 'in', "(1,2,3,4,5)").order('step', { ascending: true });
   return data;
}