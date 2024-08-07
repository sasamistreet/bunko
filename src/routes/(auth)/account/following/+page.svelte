<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs"
    import * as Avatar from "$lib/components/ui/avatar";
    import Button from "$lib/components/ui/button/button.svelte";

</script>
{#snippet timelineItem(item:any)}
    <div class="flex items-center w-full my-2 py-2 border-b">
        <div class="bg-muted w-24 h-24"></div>
        <div class="m-2">{item}</div>
    </div>
{/snippet}
{#snippet followlistItem(item:any)}
    <div class="flex items-center w-full my-2 p-4 border-b">
        <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
        <div class="ml-2 grow">{item}</div>
        <Button class="">unfollow</Button>
    </div>
{/snippet}
<div>
    <Tabs.Root value="timeline" class="w-[640px] mx-auto">
        <Tabs.List class="grid w-full grid-cols-2">
          <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
          <Tabs.Trigger value="followlist">Followlist</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="timeline">
            {@render timelineItem("aaa")}
        </Tabs.Content>
        <Tabs.Content value="followlist">
            {@render followlistItem("bbb")}
        </Tabs.Content>
    </Tabs.Root>
</div>