
<script lang="ts">
    import { GripVertical, ChevronLeft, ChevronRight} from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Skeleton } from "$lib/components/ui/skeleton";
    export let step: Number;
</script>

<div class="flex flex-col mb-2 items-center grow">
  <div class="flex flex-col w-full bg-white rounded shadow">
    <div class="flex items-center justify-between p-2">
      <div>{step}</div>
      <div class="flex">
        <ChevronLeft size={16}></ChevronLeft>
        <ChevronRight size={16}></ChevronRight>
      </div>
    </div>
    <div class="bg-muted w-full">
      <a href="./editor/detail?step={step}">
        <Skeleton class="w-full h-[120px]"/>
      </a>
    </div>
  </div>
</div>