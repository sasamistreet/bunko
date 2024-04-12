<script lang="ts">
    import StepItem from "./StepItem.svelte"
    import { Button } from "$lib/components/ui/button";
    import { Trash2 } from "lucide-svelte";
    import type { PageData } from './$types';
    export let data: PageData;
    let steps = data.steps || [];

    let dragIndex:number|null = null;

    const dragStart = (index:number) => {
      console.log('drag start', index);
      dragIndex = index;
    }

    const dragEnter = (index:number) => {

      if (index === dragIndex) return;
      let newSteps = JSON.parse(JSON.stringify(steps));
      const deleteElement = newSteps.splice(dragIndex, 1)[0]
      newSteps.splice(index, 0, deleteElement);
      steps = newSteps
      dragIndex = index;
    };

    const dragEnd = () => {
      dragIndex = null;
    };
</script>
<div class="flex justify-between">
  <h1 class="text-xl font-bold">Title</h1>
  <Button variant="ghost" size="icon"><Trash2 size={16}/></Button>
</div>
<div class="grid grid-cols-5 gap-4">
  {#each steps as step, index (step.step)}
  <div draggable="true" role="presentation"
    on:dragstart={()=>dragStart(index)}
    on:dragenter={() => dragEnter(index)}
    on:dragover|preventDefault
    on:dragend={dragEnd}
  >
    <StepItem step={step.step}/>
  </div>
  {/each}
  <div>
    <Button variant="outline" class="rounded-full mx-auto block">+</Button>
  </div>
</div>
