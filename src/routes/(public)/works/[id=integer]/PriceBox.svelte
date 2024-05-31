<script lang="ts">
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Bookmark, ShoppingCart, Loader2} from "lucide-svelte";
    

    type Props = {
        workId: Number;
    };
    let { workId }:Props = $props();


    let addingWishlist = $state(false);
    let isCart = $state([]);
    let isWishlist = $state(false);

    type WorkInfo = {
        title:String,
        author:String
    }
    type WishItem = {
        id:Number,
        work_id:Number,
        Work:WorkInfo
    }
    onMount(() => {
		loadWishlist();
	});
    async function loadWishlist() {
		const wishlist = await fetch(`/api/wishlist?work=${workId}`).then((res) => res.json());
        console.log(wishlist)
        const isInWishlist =  wishlist.find((item:WishItem) => item.work_id === workId);
        if ( wishlist.count === 0){
            isWishlist = true;
        } else {
            isWishlist = false;
        }
	}

</script>
<div class="pricebox w-[320px] bg-muted p-2 mx-auto my-8 text-center">
    <p class="font-bold mb-4">Diagrams (Viewer)</p>
    <p><Badge variant="outline" class="mr-2">50% OFF</Badge></p>
    <p class="mb-4 text-red-500 text-xl"><span class="line-through text-slate-400 text-sm mr-2">¥2,000</span>¥1,000</p>
    <Button class="block w-full"><ShoppingCart class="inline mr-2" size={18}/>Add to Cart</Button>
    
    {#if !isWishlist}
    <form method="POST" action="?/wishlist" use:enhance={() => {
        addingWishlist = true;
        return async ({update}) => {
            await update();
            addingWishlist = false;
        }
    }}>
        <input type="hidden" name="workId" value={workId} />
        <Button type="submit" variant="ghost" class="block w-full">
            {#if !addingWishlist}
            <Bookmark class="inline mr-2" size={18}></Bookmark>Add to Wishlist
            {:else}
            <Loader2 class="animate-spin"/>Adding...
            {/if}
        </Button>
    </form>
    {:else}
    <Button href="/account/library/wishlist" variant="link" class="block w-full">
        <Bookmark class="inline mr-2" size={18} fill="#000"></Bookmark>In Wishlist
    </Button>
    {/if}
</div>