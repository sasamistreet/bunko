<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import Label from "$lib/components/ui/label/label.svelte";

    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Checkbox } from "$lib/components/ui/checkbox";
    
    let checked = false;
    const shapes = [
        {
            id: "square",
            label: "Square",
        },
        {
            id: "rectangle",
            label: "Rectangle"
        },
        {
            id: "other",
            label: "Other"
        }
    ]
    const tools = [
        {
            id: "scissors",
            label: "Scissors",
        },
        {
            id: "cutter",
            label: "Cutter"
        },
        {
            id: "glue",
            label: "Glue"
        },
        {
            id: "pen",
            label: "Pen"
        },
    ]

    import { formSchema, type FormSchema } from "./schema";
    import{ type SuperValidated, type Infer, superForm, } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, { 
        validators: zodClient(formSchema),
        dataType:'json'
    });
    const { form: formData, enhance } = form;

</script>
<div class="flex w-full justify-between bg-white shadow-sm z-50">
    <div>
        Settings
    </div>
    <div>
        <Button>Save</Button>
    </div>
</div>
<div class="container max-h-full overflow-y-scroll fixed z-10">
    <div class="flex gap-8">
        <div class="w-2/3">
            <form method="POST" use:enhance>
            <Form.Field {form} name="title" class="mb-8">
                <Form.Control let:attrs>
                    <Form.Label for="title">Title</Form.Label>
                    <Input {...attrs} type="text" id="title" placeholder="" class="mb-4" />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="description" class="mb-8">
                <Form.Control let:attrs>
                    <Form.Label for="description">Description</Form.Label>
                    <Textarea {...attrs} id="description" class="mb-4"/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="tags" class="mb-8">
                <Form.Control let:attrs>
                    <Form.Label for="tags">Tags</Form.Label>
                    <Input {...attrs} type="text" id="tags" placeholder="" class="mb-4" />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="seo" class="mb-8">
                <Form.Control let:attrs>
                    <Form.Label for="seo">SEO Words</Form.Label>
                    <Input type="text" id="seo" placeholder="" class="mb-4" />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            
            <div class="mb-8">
                <Label for="title">Cover Images</Label>
                <div class="w-[240px] h-[240px] rounded-md border border-dashed"></div>
            </div>

            <Form.Fieldset {form} name="sheets" class="mb-8">
                <Form.Legend class="text-base">Sheets of Paper</Form.Legend>
                <RadioGroup.Root value="sheets" class="flex flex-col space-y-1">
                    <div class="flex items-center space-x-3 space-y-0">
                        <Form.Control let:attrs>
                            <RadioGroup.Item value="one" {...attrs}/>
                            <Form.Label class="font-normal">One</Form.Label>
                        </Form.Control>
                    </div>
                    <div class="flex items-center space-x-2 space-y-0">
                        <Form.Control let:attrs>
                            <RadioGroup.Item value="multiple" {...attrs}/>
                            <Form.Label class="font-normal">Multiple</Form.Label>
                        </Form.Control>
                    </div>
                    <div class="flex items-center space-x-2">
                        <Form.Control let:attrs>
                            <RadioGroup.Item value="moduler" {...attrs}/>
                            <Form.Label class="font-normal">Moduler</Form.Label>
                        </Form.Control>
                    </div>
                    <RadioGroup.Input name="sheets" />
                </RadioGroup.Root>
                <Form.FieldErrors />
            </Form.Fieldset>
            <Form.Fieldset {form} name="shape" class="mb-8">
                <Form.Control let:attrs>
                    <Form.Legend class="text-base">Shape of Paper</Form.Legend>
                    <div class="space-y-3">
                        {#each shapes as shape}
                        <div class="flex flex-row items-start space-x-1">
                            <Form.Control let:attrs>
                            <Checkbox id="{shape.id}" aria-labelledby="shapes-label" />
                            <Form.Label id="{shape.label}" for="{shape.id}" class="font-normal">
                                {shape.label}
                            </Form.Label>
                            </Form.Control>
                        </div>
                        {/each}
                    </div>
                </Form.Control>
            </Form.Fieldset>
            <Form.Fieldset {form} name="tools" class="mb-8">
                    <div class="mb-4">
                    <Form.Legend class="text-base">Tools</Form.Legend>
                    </div>
                    <div class="space-y-3">
                    {#each tools as tool}
                    <div class="flex flex-row items-start space-x-1">
                    <Form.Control let:attrs>
                        <Checkbox {...attrs} {checked} onCheckedChange={()=>{}} id="{tool.id}" aria-labelledby="tools-label" />
                        <Form.Label id="{tool.label}" for="{tool.id}" class="font-normal">
                            {tool.label}
                        </Form.Label>
                        <input hidden type="checkbox" name={attrs.name} value={tool.id} {checked}/>
                    </Form.Control>
                    </div>
                    {/each}
                    </div>
            </Form.Fieldset>
            </form>
        </div>
        <div class="w-1/3 relative">
            <div class="fixed">
                
            </div>
        </div>
    </div>
</div>