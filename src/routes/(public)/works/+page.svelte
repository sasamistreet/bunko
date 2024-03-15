<script lang="ts">
  import SearchFilter from "./SearchFilter.svelte"
    import { Badge } from "$lib/components/ui/badge";    
    import * as Select from "$lib/components/ui/select";
    import * as ToggleGroup from "$lib/components/ui/toggle-group";
    import * as HoverCard from "$lib/components/ui/hover-card";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio"

    const sorts = [
        { value: "apple", label: "Newest" },
        { value: "banana", label: "Oldest" },
        { value: "blueberry", label: "Steps" },
        { value: "grapes", label: "Rating" },
    ];
    import { ArrowDownWideNarrow, ArrowUpNarrowWide, ThumbsUp } from "lucide-svelte";

</script>
<div class="grid grid-cols-4 gap-4 pt-8 container mx-auto">
    <div class="px-4">
        <SearchFilter />
    </div>
    <div class="col-span-3">
      <h2 class="text-2xl font-bold tracking-tight mb-4">Result of "..."</h2>
      <div class="taglist mb-4">
        <Badge variant="secondary">Tag</Badge> <Badge variant="secondary">Tag</Badge> <Badge variant="secondary">Tag</Badge>
      </div>
      <ul class="w-full grid grid-cols-4 mb-8 text-center">
        <li class="">Diagrams<span class="block mx-auto mt-1 w-8 border-current border rounded"></span></li>
        <li class="text-slate-400">Photo tutorials</li>
        <li class="text-slate-400">Video</li>
        <li class="text-slate-400">Crease Pattern</li>
      </ul>
        <div class="flex mb-4">
            <Select.Root portal={null}>
                <Select.Trigger class="w-[180px]">
                  <Select.Value placeholder="Sort" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each sorts as sort}
                      <Select.Item value={sort.value} label={sort.label}>{sort.label}</Select.Item>
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="favoriteFruit" />
              </Select.Root>
              <ToggleGroup.Root type="single" size="sm">
                <ToggleGroup.Item value="bold" aria-label="降順">
                  <ArrowDownWideNarrow class="h-4 w-4" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="italic" aria-label="昇順">
                  <ArrowUpNarrowWide class="h-4 w-4" />
                </ToggleGroup.Item>
              </ToggleGroup.Root>
        </div>
        <div class="col-span-3 grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            <div>
              <a href="works/1">
                <AspectRatio ratio={1 / 1} class="bg-muted mb-1">
                </AspectRatio>
              </a>
                <HoverCard.Root>
                    <HoverCard.Trigger
                      href="./"
                      rel="noreferrer noopener"
                      class="hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
                    >
                    
                      Title
                    </HoverCard.Trigger>
                    <HoverCard.Content class="">
                      <div class="flex justify-between space-x-4">
                        <div class="space-y-1">
                          <div class="text-xs"><ThumbsUp size={16} strokeWidth={1} class="inline"/> 60%</div>
                          <span class="text-sm">111 Steps</span>
                          <Badge class="text-xs font-normal" variant="secondary">complex</Badge>
                          <div class="flex items-center pt-2">
                            <span class="text-xs text-muted-foreground">
                              Published on 2023.12.31
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCard.Content>
                  </HoverCard.Root>
                  <div class="text-xs flex justify-between">
                    by author
                    <p class="text-sm">¥ 1,000</p>
                  </div>
            </div>
        </div>
    </div>
</div>