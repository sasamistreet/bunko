<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from 'svelte/transition';
    import { enhance } from "$app/forms";
    import { invalidateAll } from '$app/navigation';
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
    const items = $page.data.items
</script>
{#snippet cartItem(work)}
    <div class="flex border-t items-center gap-2" out:fade>
        <div>
            <form method="POST" action="?/delete" use:enhance={()=>{
                deleting = [...deleting, work.work_id];
                return async ({ update }) => {
                    await update();
                    deleting = deleting.filter((id) => id !== work.work_id);
                    //カートのアイテムを削除したらload関数を再実行して価格を再計算
                    invalidateAll();
                };
            }}>
                <input type="hidden" name="id" value={work.id}/>
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
        <div>￥{work.Work.price}</div>
    </div>
{/snippet}
<h1 class="text-2xl font-bold">Cart</h1>
<div class="container flex gap-8">
    <div class="grow">
        {#if $page.data.items.length == 0}
            <p>There is no items in cart.</p>
        {:else}
            {#each $page.data.items.filter((item:WishItem) => !deleting.includes(item.id)) as item(item.id)}
                {@render cartItem(item)} 
            {/each}
            <hr />
            <div class="text-right py-4">Total ￥{$page.data.sum}</div>
        {/if}
    </div>
    <div class="w-96 flex-none">
        <Card.Root class="bg-zinc-100">
            <Card.Header>
              <Card.Title>Order Summery</Card.Title>
            </Card.Header>
            <Card.Content class="text-right">
                <form>
                    <dl class="lk abx">
                        <div class="flex justify-between border-b py-4 text-sm"><dt class="text-zinc-400">Subtotal</dt><dd class="awa awe axv">￥{$page.data.sum}</dd></div>
                        <div class="flex justify-between border-b py-4 text-sm"><dt class="text-zinc-400">Tax</dt><dd class="">￥{$page.data.tax}</dd></div>
                    </dl>
                    <div class="flex justify-between py-4 text-lg"><dt class="">Total</dt><dd class="">￥{$page.data.total}</dd></div>
                    <input type="hidden" name="price" value={$page.data.sum}>
                    {#if $page.data.items.length == 0}
                        <p>There is no items in cart.</p>
                    {:else}
                    <Button class="w-full">Checkout</Button>
                    {/if}
                </form>
            </Card.Content>
            <Card.Footer>
                
            </Card.Footer>
          </Card.Root>
    </div>
</div>