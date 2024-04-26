<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
	import { Field } from "formsnap";
    import { formSchema, type FormSchema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    export let data: SuperValidated<Infer<FormSchema>>;
    export let form = superForm(data, {
        validators: zodClient(formSchema),
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="user_id">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input {...attrs} bind:value={$formData.user_id}/>
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="user_name">
        <Form.Control let:attrs>
            <Form.Label>Account Name</Form.Label>
            <Input {...attrs} bind:value={$formData.user_name}/>
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="x">
        <Form.Control let:attrs>
            <Form.Label>X</Form.Label>
            <Input {...attrs} bind:value={$formData.x}/>
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="instagram">
        <Form.Control let:attrs>
            <Form.Label>Account Name</Form.Label>
            <Input {...attrs} bind:value={$formData.instagram}/>
        </Form.Control>
        <Form.Description>This is your public display name.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Button>Submit</Form.Button>
</form>
