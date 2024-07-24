import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";


async function getSteps(stepId:string){
  try {
    const{ data, error } = await supabase.from("Step").select().eq('workId', stepId).order('step', { ascending: true });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getOrder(workId:string){
  try {
    const{ data, error } = await supabase.schema('public').from("Work").select().eq('id', workId).select('order_drafted').single();
    if (error) {
      throw error;
    }
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}


/*export const load = (async ({ locals, params }) => {
  try {
      const featured = getFeatured("work/Apple_logo_black.svg");
      return { featured } ;
  } catch (error) {

  }
})  satisfies PageServerLoad;*/


export const load: PageServerLoad = async ({ params }) => {
  try {
    const steps = await getOrder(params.id);
    return steps;
  } catch (error) {

  }
};

export const actions: Actions = {
  
};