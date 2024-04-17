
<script lang="ts">
    import { GripVertical, ChevronLeft, ChevronRight} from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Skeleton } from "$lib/components/ui/skeleton";
    export let step: number;
    export let id: string;
    export let path: string
</script>

<div class="flex flex-col mb-2 items-center grow">
  <div class="flex flex-col min-w-8 w-full bg-white rounded shadow">
    <div class="flex items-center justify-between p-2 cursor-grab">
      <div>{step}</div>
      <div class="flex">
        <ChevronLeft size={16}></ChevronLeft>
        <ChevronRight size={16}></ChevronRight>
      </div>
    </div>
    <div class="bg-muted w-full">
      <a href="./editor/detail?step={id}">
        <div class="w-full h-[120px] bg-muted">
          {path}
        </div>
      </a>
    </div>
  </div>
</div>