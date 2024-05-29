<script>
    import * as Select from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button"
    import { Trash2 } from "lucide-svelte";
    import { page } from "$app/stores";
	import { enhance } from "$app/forms";
    const sorts = [
        { value: "date", label: "Date" },
        { value: "name", label: "Name" },
    ];
    const items = $state($page.data.items);
</script>
{#snippet wishlistItem(work)}
<div class="flex border-t items-center gap-2">
    <div>
        <form method="POST" action="?/delete" use:enhance>
            <input type="hidden"  value="{work.id}"/>
            <Button size="icon" variant="ghost"><Trash2 strokeWidth={1}/></Button>
        </form>
    </div>
    <a href="/works/{work.work_id}">
        <div class="bg-muted w-[80px] h-[80px]"></div>
    </a>
    <div class="grow px-2">
        <p class="mt-2">{work.Work.title}</p>
        <p class="text-xs">{work.author}</p>
    </div>
    <div>{work.price}</div>
    <div>
        <Button size="sm">Cart</Button>
    </div>
    
</div>
{/snippet}
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
    {#each items as item}
        {@render wishlistItem(item)}
    {/each}
</div>
</div>