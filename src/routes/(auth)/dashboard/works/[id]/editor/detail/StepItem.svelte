
    <script>
        import { Checkbox } from "$lib/components/ui/checkbox";
        import { GripVertical, ChevronDown, ChevronUp} from "lucide-svelte";
        import { Input } from "$lib/components/ui/input";
    </script>
    
    <div class="flex mb-2 items-center" draggable="true">
      <div class="mr-2">
        <Checkbox class="border-slate-200"></Checkbox>
      </div>
      <div class="flex bg-white rounded shadow grow">
        <div class="w-12 flex flex-col items-center">
          <ChevronUp size={16}></ChevronUp>
          <Input class="w-8 p-0 text-xs text-center"/>
          <ChevronDown size={16}></ChevronDown>
        </div>
        <div class="bg-muted grow min-w-8">

        </div>
        <div class="w-8 flex items-center justify-center">
          <GripVertical size={16}></GripVertical>
        </div>
      </div>
    </div>