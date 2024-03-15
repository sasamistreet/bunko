<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { formSchema, type FormSchema } from "./schema";
    import type { SuperValidated } from "sveltekit-superforms";
    export let form: SuperValidated<FormSchema>;
</script>
<Form.Root method="POST" {form} schema={formSchema} let:config>
    <Form.Field {config} name="username">
        <Form.Item>
            <Form.Label>Username</Form.Label>
            <Form.Input />
            <Form.Description>This is your public display name.</Form.Description>
            <Form.Validation />
        </Form.Item>
    </Form.Field>
    <Form.Field {config} name="accountname">
        <Form.Item>
            <Form.Label>Accountname</Form.Label>
            <Form.Input />
            <Form.Description>This is your public display name.</Form.Description>
            <Form.Validation />
        </Form.Item>
    </Form.Field>
    <Form.Field {config} name="x">
        <Form.Item>
            <Form.Label>X</Form.Label>
            <Form.Input />
            <Form.Description>X account</Form.Description>
            <Form.Validation />
        </Form.Item>
    </Form.Field>
    <Form.Field {config} name="instagram">
        <Form.Item>
            <Form.Label>Instagram</Form.Label>
            <Form.Input />
            <Form.Description>Instagram account</Form.Description>
            <Form.Validation />
        </Form.Item>
    </Form.Field>
    <Form.Field {config} name="description">
        <Form.Item>
            <Form.Label>Bio</Form.Label>
            <Form.Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize-none"
            />
            <Form.Description>
              You can <span>@mention</span> other users and organizations.
            </Form.Description>
            <Form.Validation />
          </Form.Item>
    </Form.Field>
    <Form.Button>Submit</Form.Button>
</Form.Root>