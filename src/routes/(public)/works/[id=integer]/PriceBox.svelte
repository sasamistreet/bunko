<script>
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Bookmark, ShoppingCart } from "lucide-svelte";
    import { wishlistSchema, cartSchema } from "./schema"
    

    let { workId, addToCart } = $props();
    let wishlist = $state([]);

    onMount(() => {
		loadWishlist();
	});

    async function loadWishlist() {
		wishlist = await fetch('/api/wishlist').then((res) => res.json());
	}

</script>
<div class="pricebox w-[320px] bg-muted p-2 mx-auto my-8 text-center">
    <p class="font-bold mb-4">Diagrams (Viewer)</p>
    <p><Badge variant="outline" class="mr-2">50% OFF</Badge></p>
    <p class="mb-4 text-red-500 text-xl"><span class="line-through text-slate-400 text-sm mr-2">¥2,000</span>¥1,000</p>
    <form method="POST" action="" use:enhance>
    <Button class="block w-full" onclick={addToCart}><ShoppingCart class="inline mr-2" size={18}/>Add to Cart</Button>
    
    {#if !wishlist.find((item) => item.id === workId)}
    <form method="POST" use:enhance action="?/addWishlist">
        <input type="hidden" name="workId" value={workId} />
        <Button type="submit" variant="ghost" class="block w-full"><Bookmark class="inline mr-2" size={18}></Bookmark>Add to Wishlist</Button>
    </form>
    {/if}
</div>