<script lang="ts">
    import StepItem from "./StepItem.svelte"
    import { Button } from "$lib/components/ui/button";
    import { Trash2 } from "lucide-svelte";
    import { toast } from "svelte-sonner";
</script>
<div class="flex justify-between">
  <h1 class="text-xl font-bold">Title</h1>
  <Button variant="ghost" size="icon"><Trash2 size={16}/></Button>
</div>
<div class="grid grid-cols-5">
    <StepItem step={1}/>
    <Button variant="outline" class="rounded-full mx-auto block"  on:click={() => toast("Hello world")}>+</Button>
</div>
