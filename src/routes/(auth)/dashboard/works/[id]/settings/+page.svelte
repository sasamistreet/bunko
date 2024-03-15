<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import RangeCalendar from "$lib/components/ui/range-calendar/range-calendar.svelte";
    import AspectRatio from "$lib/components/ui/aspect-ratio/aspect-ratio.svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";
    const start = today(getLocalTimeZone());
    const end = start.add({ days: 7 });
    let value = {
        start,
        end
    };
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
</script>
<div class="container">
    <ul class="tabmenu pt-4 grid grid-cols-3 text-center">
        <li><a href="./">Edit</a></li>
        <li><a href="./summary">Summary</a></li>
        <li class="current">Settings(Drafted)</li>
    </ul>
    <div class="text-right">
        <Button variant="outline">Save</Button>
        <Button>Publish</Button>
    </div>
    <div class="flex gap-8">
        
        <div class="w-2/3">
            <h2 class="font-bold">Diagrams</h2>
                <Label for="title">Title</Label>
                <Input type="text" id="title" placeholder="" class="mb-4" />
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
                <Label for="description">Description</Label>
                <Textarea id="description" class="mb-4"/>
                <Label for="tags">Tags</Label>
                <Input type="text" id="tags" placeholder="" class="mb-4" />
                <Label for="seo">SEO Words</Label>
                <Input type="text" id="seo" placeholder="" class="mb-4" />
        </div>
        <div class="w-1/3">
            <Label for="price">Price</Label>
            <Input id="price" type="number" class="mb-8"/>
            <div class="flex justify-between mb-2">
                <h3>Sale</h3>
                <Switch id="sale" />
                <Label for="sale"></Label>
            </div>
            <Label for="sale">Rate</Label>
            <div class="flex mb-4">
                <Input id="sale" type="number" class="max-w-20"/><span class="text-xl">%</span>
            </div>
            <Label for="saledate">Date</Label>
            <div class="flex">
                <RangeCalendar bind:value class="border rounded-md" id="saledate"/>
            </div>
        </div>
    </div>
</div>