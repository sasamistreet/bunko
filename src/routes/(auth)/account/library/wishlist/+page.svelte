<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button"
    import { Trash2 } from "lucide-svelte";
    import { page } from "$app/stores";
    import { fade } from 'svelte/transition';
	import { enhance } from "$app/forms";
    const sorts = [
        { value: "date", label: "Date" },
        { value: "name", label: "Name" },
    ];
    type WorkInfo = {
        title:String,
        author:String
    }
    type WishItem = {
        id:Number,
        work_id:Number,
        Work:WorkInfo
    }
    //let items:WishItem[] = $state($page.data.items);
    let deleting:Number[] = $state([]);

</script>

{#snippet wishlistItem(work)}
    <div class="flex border-t items-center gap-2" out:fade>
        <div>
            <form method="POST" action="?/delete" use:enhance={()=>{
                deleting = [...deleting, work.work_id];
                return async ({ update }) => {
                    await update();
                    deleting = deleting.filter((id) => id !== work.work_id);

                };
            }}>
                <input type="hidden" name="work_id" value={work.work_id}/>
                <Button type="submit" size="icon" variant="ghost"><Trash2 strokeWidth={1}/></Button>
            </form>
        </div>
        <a href="/works/{work.work_id}">
            <div class="bg-muted w-[80px] h-[80px]"></div>
        </a>
        <div class="grow px-2">
            <p class="mt-2">{work.Work.title}</p>
            <p class="text-xs">{work.Work.author}</p>
        </div>
        <div>{work.price}</div>
        <div>
            <form method="POST" action="?/cart" use:enhance={()=>{
            }} >
                <Button type="submit"  size="sm">Cart</Button>
            </form>
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
    {#each $page.data.items.filter((item:WishItem) => !deleting.includes(item.work_id)) as item(item.work_id)}
        {@render wishlistItem(item)}
    {/each}
</div>
</div>