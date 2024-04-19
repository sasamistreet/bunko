
<script lang="ts">
    import { GripVertical, BetweenVerticalStart, Plus} from "lucide-svelte";
    import { Skeleton } from "$lib/components/ui/skeleton";
    export let step: number;
    export let id: string;
    export let path: string
</script>

<div class="mb-2 items-center w-40">
  <div class="flex flex-col min-w-8 bg-white rounded shadow">
    <div class="flex items-center justify-between p-2 cursor-grab">
      <div>{step}</div>
      <div><GripVertical size={16}></GripVertical></div>
    </div>
    <div class="bg-muted">
      <a href="./editor/detail?step={id}" class="display-block">
        <div class="h-[120px] bg-muted truncate">
          {path}
        </div>
      </a>
    </div>
  </div>
</div>