<script lang="ts">
    import StepItem from "./StepItem.svelte"
    import { Button } from "$lib/components/ui/button";
    import { Trash2 } from "lucide-svelte";
    import { flip } from 'svelte/animate';
    import type { PageData } from './$types';
    import { get, writable } from "svelte/store";
    import { quintOut } from "svelte/easing";
    import { tick } from 'svelte';
	import { number } from "zod";
    export let data: PageData;
    let steps = data.order_drafted.steps || [];

    let dragIndex = writable<number|null>(null);

    const dragStart = (index:number) => {
      $dragIndex = index;
      //setDragImage() 
      console.log(index)
    }

    const dragEnter = (index:number) => {
      if (index === $dragIndex) return;
      let newSteps = JSON.parse(JSON.stringify(steps));
      const deleteElement = newSteps.splice($dragIndex, 1)[0]
      newSteps.splice(index, 0, deleteElement);
      steps = newSteps
      //e.target.classList.add("opacity-30")
      $dragIndex = index;
    };
    
    const dragEnd = () => {
      setTimeout(reorder, 4000)
      $dragIndex = null;
    };

    const drop = () =>{
      //e.target.classList.remove("opacity-30")
    }
    const reorder = () => {
      let i = 1;
      for (const step of steps) {
        step.order = i;
        i++;
      }
      //steps = steps
      console.log(steps);
    }
</script>
<div class="flex justify-between">
  <h1 class="text-xl font-bold">Title</h1>
  <Button variant="ghost" size="icon"><Trash2 size={16}/></Button>
</div>
<div class="grid grid-cols-5 gap-4">
  {#each steps as step, index(step.order)}
    <div draggable="true" role="presentation" id="{step.id}"
      on:dragstart={() => dragStart(index)}
      on:dragenter={() => dragEnter(index)}
      on:dragover|preventDefault
      on:dragend={dragEnd}
      animate:flip={{ duration: 400, easing:quintOut }}
    >
    {#if $dragIndex == index}
      <div class="flex flex-col mb-2 items-center grow">
        <div class="w-full bg-muted">
          aaa
        </div>
      </div>
    {:else}
      <StepItem step={index} id={step.id} path={step.path}/>
    {/if}
  </div>
  {/each}
  <div class="flex content-center">
    <Button variant="outline" class="rounded-full mx-auto block">+</Button>
  </div>
</div>
