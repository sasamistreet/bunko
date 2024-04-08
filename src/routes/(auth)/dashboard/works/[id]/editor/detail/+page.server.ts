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

async function uploadSVG(svgContent:string|undefined) {
  //const dispatch = createEventDispatcher()
  try {

    if (!svgContent || svgContent.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    //const blob = new Blob([svgContent], { type : 'image/svg+xml' });
    const filePath = `${Math.random()}.svg`
    const { error } = await supabase.storage.from('works').upload(filePath, svgContent, {contentType: 'image/svg+xml'})

    if (error) {
      throw error
    } else {
      console.log("success");
      return filePath;
    }
    /*setTimeout(() => {
      //dispatch('')
    }, 100)*/
    
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
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
    const svgContent = form.data.svgContent
    let figure_svg_path:string = ""
    const {locals: { supabase } } = event
    if (!form.valid) {
      return fail(400, {
        form
      });
      console.log("no form")
    }

    

    try {
      if (!svgContent || svgContent.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const { data } = await supabase.auth.getSession()
      if (data.session){
        const blob = new Blob([svgContent], { type : 'image/svg+xml' });
  
        const filePath = `wwwwww.svg`
        const { error }  = await supabase.storage.from('works').upload(`work/${filePath}`, svgContent, { contentType : 'image/svg+xml', upsert: true, })
        //const { error }  = await supabase.storage.from('works').remove(['work/Apple_logo_black.svg'])
        if (error) {
          throw error;
        }
      } else {
        console.log(data)
      }
      

      //const { error } = await supabase.from('Step').update({ transition:transition, caption: caption, figure_svg_path:filePath }).eq('id', form.data.id)
      console.log(caption);
      console.log(figure_svg_path);
      return message(form, { text: 'Updated'});
    } catch (error) {
        console.log(error)
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