<script lang="ts">
    import StepItem from "./StepItem.svelte"
    import StepDetail from "./StepDetail.svelte"
    import { Button } from "$lib/components/ui/button";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Trash2, MoreVertical } from "lucide-svelte";

    import type { PageData } from "./$types";
    export let data: PageData;

</script>
<div class="">
  <div class="flex justify-between">
    <h1 class="text-xl font-bold">Title</h1>
    <Button variant="ghost" size="icon"><MoreVertical size={16}/></Button>
  </div>
<ul class="tabmenu pt-4 grid grid-cols-3 text-center">
    <li class="current">Edit</li>
    <li><a href="1/summary">Summary</a></li>
    <li><a href="1/settings">Settings</a></li>
</ul>
<div class="flex">
  <div class="min-w-[240px] pr-4">
    <div class="flex justify-between mb-4">
      <Checkbox class="border-slate-400"></Checkbox>
      <Trash2 size={16} class="text-slate-400"></Trash2>
    </div>
  <StepItem />
        <Button variant="outline" class="rounded-full mx-auto block">+</Button>
    </div>
    <div class="p-4 grow bg-muted">
        <StepDetail data={data.form}/>
    </div>
</div>
</div>