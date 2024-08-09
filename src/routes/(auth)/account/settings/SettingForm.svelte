<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { formSchema, type FormSchema } from "./schema";
    import { Switch } from "$lib/components/ui/switch";
    import {
      type SuperValidated,
      type Infer,
      superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
   
    export let data: SuperValidated<Infer<FormSchema>>;
   
    const form = superForm(data, {
      validators: zodClient(formSchema),
    });
   
    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="marketing_emails">
      <Form.Control let:attrs>
        <div class="space-y-0.5">
          <Form.Label>Marketing Emails</Form.Label>
          <Form.Description>qaaaaaaa</Form.Description>
        </div>
        <Switch
            includeInput
            {...attrs}
            bind:checked={$formData.marketing_emails}
        />
      </Form.Control>
      
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="security_emails">
        <Form.Control let:attrs>
          <div class="space-y-0.5">
            <Form.Label>Security Emails</Form.Label>
            <Form.Description>qaaaaaaa</Form.Description>
          </div>
          <Switch
            {...attrs}
            includeInput
            bind:checked={$formData.security_emails}
          />
        </Form.Control>
       
        <Form.FieldErrors />
      </Form.Field>
      <div class="text-right">
        <Form.Button>Submit</Form.Button>
      </div>
  </form>