import { supabase } from "$lib/server/supabaseClient";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { stepDetailSchema } from "./schema";
import { zod } from 'sveltekit-superforms/adapters';


async function getSingleStep(workId: string, id: string){
  const{ data, error } = await supabase.from("Step").select().match({ workId: workId, id: id }).single();
  return data;
}

/*const uploadSVG = async ( SVGContent, { locals }) => {
  try {
    if (!svgContent || svgContent.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    const session = await event.getSession()
    if ( session ){
      const filePath = `${Math.random().toString(32).substring(2)}.svg`
      const { error } = await supabase.storage.from('works').upload(`work/${filePath}`, svgContent, { contentType : 'image/svg+xml', upsert: true, })
      setTimeout(() => {
        console.log("Delayed for 0.5 second.");
      }, );
      if (error) {
        throw error;
      } else {
        return filePath
      }
    }
  } catch (error) {
      console.log(error)
  }
}*/

export const load: PageServerLoad = async ({ params, url }) => {
  //const step = Number(url.searchParams.get('step') ?? '0');
  const id= url.searchParams.get('step') ?? '';
  const stepJson = await getSingleStep(params.id, id);
  const form = await superValidate(stepJson, zod(stepDetailSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const {locals: { getSession, supabase } } = event
    const form =  await superValidate(event, zod(stepDetailSchema));
    const transition = form.data.transition as string
    const caption = form.data.caption as string
    const svgContent = form.data.svgContent
    //let figure_svg_path:string|undefined = ""
    
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    try {
      if (!svgContent || svgContent.length === 0) {
        throw new Error('You must select an image to upload.')
      }
      const filePath = `work/${Math.random().toString(32).substring(2)}.svg`
      const session = await getSession()
      if (session){
        const { error }  = await supabase.storage.from('works').upload(`${filePath}`, svgContent, { contentType : 'image/svg+xml', upsert: true, })
        if (error) {
          throw error;
        }
        console.log(filePath)
      } else {
        console.log("no session")
      }
      //figure_svg_path = await uploadSVG(event, svgContent)
      const { error } = await supabase.from('Step').update({ transition:transition, caption: caption, figure_svg_path:filePath }).eq('id', form.data.id)
      console.log(caption);
      //console.log(figure_svg_path);
      if (error) {
        throw error;
      } else {
        return message(form, { text: 'Updated'});
      }
      
    } catch (error) {
        console.log(error)
    }
  }
};