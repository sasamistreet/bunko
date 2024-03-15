<script lang="ts">
    import { Skeleton } from "$lib/components/ui/skeleton";
    import * as HoverCard from "$lib/components/ui/hover-card";
    import { Badge } from "$lib/components/ui/badge";
</script>

<div class="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>
        <Skeleton class="w-[250px] h-[250px]"/>
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
                  <span class="text-sm">111 Steps</span>
                  <Badge class="text-xs font-normal">complex</Badge>
                  <div class="flex items-center pt-2">
                    <span class="text-xs text-muted-foreground">
                      Published on 2023.12.31
                    </span>
                  </div>
                </div>
              </div>
            </HoverCard.Content>
          </HoverCard.Root>
        <p class="text-sm">¥ 1,000</p>
    </div>
</div>