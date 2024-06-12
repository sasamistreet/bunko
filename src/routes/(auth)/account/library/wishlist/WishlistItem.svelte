<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade } from 'svelte/transition';
    import { Button } from "$lib/components/ui/button"
    import { Trash2 } from "lucide-svelte";

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
       deleting: Number[];
    };
</script>
<div class="flex border-t items-center gap-2">
    <div>
        <form method="POST" action="?/delete" use:enhance={()=>{
            deleting = [...deleting, work.work_id];
            return async ({ update }) => {
                console.log(deleting);
                await update();
                deleting = deleting.filter((id) => id !== work.work_id);
                console.log(deleting);
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
    <div>
        <Button size="sm">Cart</Button>
    </div>
</div>
