<script lang="ts">
    import { enhance } from "$app/forms";
    import { onMount } from "svelte"
    import { Button } from "$lib/components/ui/button"
    import { Trash2, Loader2 } from "lucide-svelte";
    import { deleting } from "./stores.svelte";

    let { work }: Props = $props();
    type WorkInfo = {
        title:String,
        author:String,
        price:Number
    }
    type WishItem = {
        id:Number,
        work_id:Number,
        Work:WorkInfo
    }
    type Props = {
       work: WishItem;
    };

    let addingCart = $state(false);
    let isCart = $state(false);

    onMount(() => {
        checkCart();
    });

    async function checkCart() {
		const cart = await fetch(`/api/cart/${work.work_id}`).then((res) => res.json());
        if ( Object.keys(cart.data).length !== 0){
            isCart = true;
        } else {
            isCart = false;
        }
	}
</script>
<div class="flex border-t items-center gap-2">
    <div>
        <form method="POST" action="?/delete" use:enhance={()=>{
            deleting.push(work.id)
            return async ({ update }) => {
                await update();
                deleting.filter((id) => id !== work.id);
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
    <div>{work.Work.price}</div>
    <div>
        {#if isCart}
            <Button href="/account/library/cart" variant="outline" class="block w-full">
                In Cart
            </Button>
        {:else}
            <form method="POST" action="?/cart" use:enhance={() => {
                addingCart = true;
                return async ({ result }) => {
                    if (result.type == "success"){
                        isCart = true;
                    }
                    addingCart = false;
                }
            }}>
                <input type="hidden" name="workId" value={work.work_id} />
                {#if !addingCart}
                    <Button type="submit" class="block w-full">Add to Cart</Button>
                {:else}
                    <Button disabled class="w-full"><Loader2 class="inline mr-2 animate-spin"/>Adding...</Button>
                {/if}
            </form>
        {/if}
    </div>
</div>
