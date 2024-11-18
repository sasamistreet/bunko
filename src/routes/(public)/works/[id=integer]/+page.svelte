<script>
    import { onMount, setContext } from 'svelte';
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { badgeVariants } from "$lib/components/ui/badge";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Heart, ThumbsUp} from "lucide-svelte";
    import PriceBox from "./PriceBox.svelte"
    import Viewer from "./Viewer.svelte"
	import { page } from "$app/stores";
	
    const data = $page.data
    const session = data.session
    const work = data.work
    const workId = Number($page.params.id)

    const isFree = false;
    const isLibrary = data.isLibrary;

    onMount(() => {
        //checkLibrary();
	});

    //setContext('info', { work, total });

    /*async function checkLibrary() {
		const library = await fetch(`/api/library/${workId}`).then((res) => res.json());
        console.log(library);
        if ( Object.keys(library.data).length == 0){
            isLibrary = false;
        } else {
            isLibrary = true;
        }
	}*/

</script>

<div class="bg-slate-700 items-center">
    {#if session && isLibrary || isFree}
        <Viewer total={100}/> 
    {:else}
        <PriceBox workId={workId} />
    {/if}
</div>
<div class="md:w-[640px] mx-auto my-4 flex justify-between">
    <div>
        <h1 class="text-xl">{work.title}</h1>
        <p class="text-xs">by <a href="/@user">{work.profile.display_name}</a></p>
    </div>
</div>
<div class="md:w-[640px] mx-auto flex gap-8 mb-8">
    <div class="w-2/3">
        <AspectRatio ratio={1 / 1} class="bg-muted mb-4">
        </AspectRatio>
        <ul class="grid grid-cols-4 gap-2 mb-4">
            <li><AspectRatio ratio={1 / 1} class="bg-muted">
            </AspectRatio></li>
            <li><AspectRatio ratio={1 / 1} class="bg-muted">
            </AspectRatio></li>
        </ul>
        
    </div>
    <div class="w-1/3">
        <dl class="work-info">
            <dt>Difficulty</dt>
            <dd>Complex</dd>
            <dt>Steps</dt>
            <dd>123</dd>
            <dt>Paper</dt>
            <dd>Square / One Sheet</dd>
            <dt>Tools</dt>
            <dd>Nothing</dd>
        </dl>
        <div class="my-4">
            <a href="/" class={badgeVariants({ variant: "secondary" })}>Tag</a>
            <a href="/" class={badgeVariants({ variant: "secondary" })}>Tag</a>
            <a href="/" class={badgeVariants({ variant: "secondary" })}>Tag</a>
        </div>
        <p>this is description.</p>
    </div>
</div>
<div class="md:w-[640px] mx-auto mb-4">
    <Tabs.Root value="reviews" class="">
        <Tabs.List class="grid w-full grid-cols-3">
          <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
          <Tabs.Trigger value="gallery">Gallery</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="reviews">
            <div class="rounded-md bg-muted px-4 py-3 font-mono text-sm">
                <div class="flex justify-between">
                    <div>
                        <ThumbsUp fill="rgb(52 211 153)" strokeWidth={0} class="inline"/> User <span class="text-xs">Completed</span>
                    </div>
                    <div class="text-xs">
                        <div>Posted on 2024.1.1</div>
                        <div></div>
                    </div>
                </div>
                <p>review.</p>
                <div class="text-right"><Heart size={16} class="inline"/></div>
            </div>
        </Tabs.Content>
        <Tabs.Content value="gallery">
            <ul class="grid grid-cols-4 gap-2 mb-4">
                <li><AspectRatio ratio={1 / 1} class="bg-muted">
                </AspectRatio></li>
                <li><AspectRatio ratio={1 / 1} class="bg-muted">
                </AspectRatio></li>
            </ul>
        </Tabs.Content>
    </Tabs.Root>
    
</div>
<style>
    .work-info dt {
        font-size: 0.8rem;
        color:#888;
    }
    .work-info dd {
        margin-bottom: 0.5rem;
    }
</style>