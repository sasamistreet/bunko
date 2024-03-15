<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio"
    import * as Select from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button"
    import { Toggle } from "$lib/components/ui/toggle";
    import { Trash2, MoreVertical } from "lucide-svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    const sorts = [
        { value: "date", label: "Date" },
        { value: "name", label: "Name" },
    ];
</script>
<div class="container">
<div class="flex justify-between my-4 p-4">
    <h1 class="text-2xl font-bold">Wishlist</h1>
    <Select.Root portal={null}>
        <Select.Trigger class="w-[180px]">
        <Select.Value placeholder="Sort" />
        </Select.Trigger>
        <Select.Content>
        <Select.Group>
            {#each sorts as sort}
            <Select.Item value={sort.value} label={sort.label}>{sort.label}</Select.Item>
            {/each}
        </Select.Group>
        </Select.Content>
        <Select.Input name="favoriteFruit" />
    </Select.Root>
</div>

<div class="w-[640px] mx-auto">
    <div class="flex border-t items-center gap-2">
        <div>
            <Checkbox id="trash" />
        </div>
        <a href="/works/1">
            <div class="bg-muted w-[80px] h-[80px]"></div>
        </a>
        <div class="grow px-2">
            <p class="mt-2">title</p>
            <p class="text-xs">by author</p>
        </div>
        <div>¥1,000</div>
        <div>
            <Button size="sm">Cart</Button>
        </div>
        
    </div>
</div>
</div>