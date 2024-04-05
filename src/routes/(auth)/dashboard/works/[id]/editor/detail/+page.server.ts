import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { stepDetailSchema } from "./schema";
import { zod } from 'sveltekit-superforms/adapters';
import { createEventDispatcher } from 'svelte'


async function getSingleStep(workId: number, step: number){
  const{ data, error } = await supabase.from("Step").select().match({ workId: workId, step: step }).single();
  return data;
}

async function uploadSVG(svgContent:string) {
  const dispatch = createEventDispatcher()
  try {

    if (!svgContent || svgContent.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const filePath = `${Math.random()}.svg`

    const { error } = await supabase.storage.from('works').upload(filePath, svgContent)

    if (error) {
      throw error
    }
    setTimeout(() => {
      dispatch('')
    }, 100)
    return filePath;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
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
    const figure_svg_path = await uploadSVG(form.data.svgContent as string)
    if (!form.valid) {
      return fail(400, {
        form
      });
      console.log("no form")
    }

    try {
      const { error } = await supabase.from('Step').update({ transition:transition, caption: caption, figure_svg_path:figure_svg_path }).eq('id', form.data.id)
      return message(form, { text: 'Updated'});
    } catch (error) {
      if (error instanceof Error) {
				console.log(error.message)
			}
    }
    
    /*if (!form.data.id) {
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
    }*/
  }
};