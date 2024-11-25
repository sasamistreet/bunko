<script lang="ts">
    import StepItem from "./StepItem.svelte"
    import { Button } from "$lib/components/ui/button";
    import { Trash2, BetweenVerticalStart, CheckSquare, Plus } from "lucide-svelte";
    //import { writable } from "svelte/store";
    import { quintOut } from "svelte/easing";
    import { flip } from 'svelte/animate';
    import type { PageData } from './$types';

    type stepData = {
      id:string,
      order:number,
      path:string
    }

    let { data } = $props<{ data: PageData }>();
    let mode:string = "normal";
    //let steps = data.order_drafted.steps || [];
    //console.log(data.order_drafted.steps);
    let steps = $state(data.order_drafted.steps);
    let dragIndex:number|null = $state(null);

    const dragStart = (index:number) => {
      dragIndex = index;
    }

    const dragOver = (id:string) => {
        const wrapper = document.getElementById(id);
        wrapper?.classList.add("bg-blue-300");
    }

    const dragLeave = (id:string) => {
        const wrapper = document.getElementById(id);
        wrapper?.classList.remove("bg-blue-300");
    }
    
    const dragEnd = (id:string) => {
      const wrapper = document.getElementById(id);
        wrapper?.classList.remove("bg-blue-300");
    };

    const drop = (index:number) =>{
      if (index === $dragIndex) return;
      const wrapper = document.getElementById(steps[index].order);
      wrapper?.classList.remove("bg-blue-300");

      let newSteps = JSON.parse(JSON.stringify(steps));
      const deleteElement = newSteps.splice($dragIndex, 1)[0]
      newSteps.splice(index, 0, deleteElement);
      steps = newSteps
      $dragIndex = null;
      
    }

</script>
<div class="flex justify-between">
  <div>
    <Button variant="ghost" size="icon"><BetweenVerticalStart size={16} /></Button>
    <Button variant="ghost" size="icon"><CheckSquare size={16}/></Button>
    <Button variant="ghost" size="icon"><Trash2 size={16}/></Button>
  </div>
</div>
<div class="grid grid-cols-5 gap-y-4">
  {#each steps as step, index(step.order)}
  <div class="flex" draggable="true" role="presentation" id="{step.id}"
    ondragstart={() => dragStart(index)}
    ondragover = {() => dragOver(step.order)}
    ondragleave={() => dragLeave(step.order)}
    ondragend={() => dragEnd(step.order)}
    ondrop={() => drop(index)}
    animate:flip={{ duration: 400, easing:quintOut }}
  >
  
      <div id="{step.order}" class="group grid-divider grow h-full rounded flex-none place-content-center">
        {#if mode==="insert"}
        <button class="w-full h-full rounded bg-blue-300">+</button>
        {/if}
      </div>
  
      <div>
        <StepItem step={index+1} id={step.id} path={step.path}/>
      </div>
  </div>
  {/each}
  <div class="flex">
    <div class=" flex place-items-center place-content-center w-full">
    <button class="w-12 h-12 bg-white rounded-full shadow"><Plus class="inline" strokeWidth={1}/></button>
  </div>
  </div>
</div>
