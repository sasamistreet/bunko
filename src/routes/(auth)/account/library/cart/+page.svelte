<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from 'svelte/transition';
    import { enhance } from "$app/forms";
    import { Button } from "$lib/components/ui/button"
    import * as Card from "$lib/components/ui/card";
    import { Trash2 } from "lucide-svelte";

    type WorkInfo = {
        title:String,
        author:String
    }
    type WishItem = {
        id:Number,
        work_id:Number,
        Work:WorkInfo
    }
    let deleting:Number[] = $state([]);
</script>
{#snippet cartItem(work)}
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
        <div>{work.Work.price}</div>
    </div>
{/snippet}
<h1 class="text-2xl font-bold">Cart</h1>
<div class="container flex gap-8">
    <div class="glow">
        {#each $page.data.items.filter((item:WishItem) => !deleting.includes(item.id)) as item(item.id)}
            {@render cartItem(item)} 
        {/each}
        <hr />
        <div class="text-right py-4">Total ￥{$page.data.sum}</div>
    </div>
    <div class="w-64 flex-none">
        <Card.Root>
            <Card.Header>
              <Card.Title>Card Title</Card.Title>
              <Card.Description>Card Description</Card.Description>
            </Card.Header>
            <Card.Content>
                <div>Total ￥1,000</div>
                <div>Tax ￥10</div>
                <hr />
              <Button>Checkout</Button>
            </Card.Content>
          </Card.Root>
    </div>
</div>