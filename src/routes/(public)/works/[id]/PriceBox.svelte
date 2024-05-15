<script>
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Bookmark, ShoppingCart } from "lucide-svelte";

    let { addToCart, addToWishlist } = $props();

</script>
<div class="pricebox w-[320px] bg-muted p-2 mx-auto my-8 text-center">
    <p class="font-bold mb-4">Diagrams (Viewer)</p>
    <p><Badge variant="outline" class="mr-2">50% OFF</Badge></p>
    <p class="mb-4 text-red-500 text-xl"><span class="line-through text-slate-400 text-sm mr-2">¥2,000</span>¥1,000</p>

    <Button class="block w-full" onclick={addToCart}><ShoppingCart class="inline mr-2" size={18}/>Add to Cart</Button>
    <Button variant="ghost" class="block w-full" onclick={addToWishlist}><Bookmark class="inline mr-2" size={18}></Bookmark>Add to Wishlist</Button>

</div>