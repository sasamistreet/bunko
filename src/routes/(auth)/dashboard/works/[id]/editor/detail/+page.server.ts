import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { stepDetailSchema } from "./schema";
import { zod } from 'sveltekit-superforms/adapters';

async function getWork(workId:Number){
  const{ data, error } = await supabase.from("Work").select().eq('id', workId).single();
  return data;
}

async function getStep(stepId:Number){
  const{ data, error } = await supabase.from("Step").select().eq('id', stepId).single();
  return data;
}

async function getStorage(){
  const { data } = await supabase.storage.from('works').getBucket();
  return data;
}

async function getFeatured(path:string){
  const { data } = await supabase.storage.from('works').getPublicUrl(path);
  return data;
}

/*export const load = (async ({ locals, params }) => {
  try {
      const featured = getFeatured("work/Apple_logo_black.svg");
      return { featured } ;
  } catch (error) {

  }
}) satisfies PageServerLoad;*/

async function getSingleStep(workId: number, step: number){
  const{ data, error } = await supabase.from("Step").select().match({ workId: workId, step: step }).single();
  return data;
}

export const load: PageServerLoad = async ({ params }) => {
  const stepJson = await getSingleStep(1, 1);
  const form = await superValidate(stepJson, zod(stepDetailSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const form =  await superValidate(event, zod(stepDetailSchema));
    const transition = form.data.transition as string
    const caption = form.data.caption as string
    if (!form.valid) {
      return fail(400, {
        form
      });
      console.log("no form")
    }
    
    if (!form.data.id) {
      //create step
      console.log("no form data")
    } else {
      //update step
      const { error } = await supabase.from('Step').update({ transition:transition, caption: caption }).eq('id', form.data.id)
      if (error) {
        return fail(500, {
          caption,
        })
        console.log("error!")
      } else {
        return message(form, { text: 'Updated'});
      }
    }
  }
};