<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import { page } from "$app/stores";
    import { fade } from 'svelte/transition';
    import { deleting } from "./stores.svelte";
    import WishlistItem from "./WishlistItem.svelte";
    const sorts = [
        { value: "date", label: "Date" },
        { value: "name", label: "Name" },
    ];

    type WishItem = {
        id:number,
        work_id:number,
        Work:{
            title:string,
            author:string
        }
    }

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
    {#each $page.data.items.filter((item:WishItem) => !deleting.includes(item.id)) as item(item.id)}
    <div out:fade>  
        <WishlistItem work={item}/>
    </div>  
    {/each}
</div>
</div>