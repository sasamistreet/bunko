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

    const form = superForm(data, { validators: zodClient(formSchema) });
    const { form: formData, enhance } = form;
</script>
<div class="container">
    <div class="flex w-full">
        <div>
            Settings
        </div>
        <div>
            
        </div>
    </div>
    <div class="flex gap-8">
        
        <div class="w-2/3">
            <form>
            <Form.Field {form} name="title">
                <Form.Control>
                    <Label for="title">Title</Label>
                    <Input type="text" id="title" placeholder="" class="mb-4" />
                </Form.Control>
            </Form.Field>
                
                
                <Label for="description">Description</Label>
                <Textarea id="description" class="mb-4"/>
                <Label for="tags">Tags</Label>
                <Input type="text" id="tags" placeholder="" class="mb-4" />
                <Label for="seo">SEO Words</Label>
                <Input type="text" id="seo" placeholder="" class="mb-4" />
                <Label for="title">Cover Images</Label>
                <div class="w-[240px] h-[240px] rounded-md border border-dashed"></div>

                <Label for="difficulty text-md">Difficulty</Label>
                <RadioGroup.Root value="difficulty" class="flex mb-4">
                    <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="easy" id="r1" />
                    <Label for="r1">Easy</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="intermediate" id="r2" />
                    <Label for="r2">Intermediate</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="difficult" id="r3" />
                    <Label for="r3">Difficult</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value="supercomplex" id="r3" />
                        <Label for="r3">Super Complex</Label>
                    </div>
                    <RadioGroup.Input name="spacing" />
                </RadioGroup.Root>
                <Label for="sheets">Sheets of Paper</Label>
                <RadioGroup.Root value="sheets" class="flex mb-4">
                    <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="one" id="r1" />
                    <Label for="r1">One</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="multiple" id="r2" />
                    <Label for="r2">multiple</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="moduler" id="r3" />
                    <Label for="r3">Moduler</Label>
                    </div>
                    <RadioGroup.Input name="spacing" />
                </RadioGroup.Root>
            </form>
                <div class="mb-4">
                <p class="text-sm font-medium">Shape of Paper</p>
                    {#each shapes as shape}
                        <Checkbox id="{shape.id}" aria-labelledby="shapes-label" />
                        <Label id="{shape.label}" for="{shape.id}" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {shape.label}
                        </Label>
                    {/each}
                </div>

                <div class="mb-4">
                    <p class="text-sm font-medium">Tools</p>
                    {#each tools as tool}
                        <Checkbox id="{tool.id}" aria-labelledby="tools-label" />
                        <Label id="{tool.label}" for="{tool.id}" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {tool.label}
                        </Label>
                    {/each}
                </div>
        </div>
        <div class="w-1/3 relative">
            <div class="fixed">
                <Button>Publish</Button>
            </div>
        </div>
    </div>
</div>