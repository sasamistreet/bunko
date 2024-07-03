<script lang="ts">
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Bookmark, BookmarkCheck, Check, ShoppingCart, Loader2} from "lucide-svelte";
    

    type Props = {
        workId: Number;
    };
    let { workId }:Props = $props();

    let addingCart = $state(false);
    let addingWishlist = $state(false);
    let isCart = $state(false);
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
        loadCart();
		loadWishlist();
	});
    async function loadWishlist() {
		const wishlist = await fetch(`/api/wishlist?work=${workId}`).then((res) => res.json());
        if ( Object.keys(wishlist.data).length !== 0){
            isWishlist = true;
            
        } else {
            isWishlist = false;
        }
	}
    async function loadCart() {
		const cart = await fetch(`/api/cart/${workId}`).then((res) => res.json());
        if ( Object.keys(cart.data).length == 0){
            isCart = false;
            console.log(cart.data);
        } else {
            isCart = true;
        }
	}

</script>
<div class="pricebox w-[320px] bg-muted p-2 mx-auto my-8 text-center">
    <p class="font-bold mb-4">Diagrams (Viewer)</p>
    <p><Badge variant="outline" class="mr-2">50% OFF</Badge></p>
    <p class="mb-4 text-red-500 text-xl"><span class="line-through text-slate-400 text-sm mr-2">¥2,000</span>¥1,000</p>
    {#if !isCart}
        <form method="POST" action="?/cart" use:enhance={() => {
            addingCart = true;
            return async ({ result }) => {
                if (result.type == "success"){
                    isCart = true;
                }
                addingCart = false;
            }
        }}>
        <input type="hidden" name="workId" value={workId} />
        {#if !addingCart}
            <Button type="submit" class="block w-full"><ShoppingCart class="inline mr-2" size={18}/>Add to Cart</Button>
        {:else}
            <Button disabled class="w-full"><Loader2 class="inline mr-2 animate-spin"/>Adding...</Button>
        {/if}
        </form>
    {:else}
    <Button href="/account/library/cart" variant="outline" class="block w-full">
        <Check class="inline mr-2" size={18}></Check>In Cart
    </Button>
    {/if}
    
    {#if !isWishlist}
    <form method="POST" action="?/wishlist" use:enhance={() => {
        addingWishlist = true;
        return async ({ result, update }) => {
            //await update();
            if (result.type == "success"){
                isWishlist = true;
            }
            addingWishlist = false;
        }
    }}>
        <input type="hidden" name="workId" value={workId} />
        <Button type="submit" variant="ghost" class="block w-full">
            {#if !addingWishlist}
            <Bookmark class="inline mr-2" size={18}></Bookmark>Add to Wishlist
            {:else}
            <Loader2 class="inline mr-2 animate-spin"/>Adding...
            {/if}
        </Button>
    </form>
    {:else}
    <Button href="/account/library/wishlist" variant="link" class="block w-full">
        <BookmarkCheck class="inline mr-2" size={18}></BookmarkCheck>In Wishlist
    </Button>
    {/if}
</div>