<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs";
    import { ThumbsUp, Heart } from "lucide-svelte";
</script>
<div>
    breadcrumb
</div>
<div class="flex items-center justify-between mb-4">
    <h2 class="text-3xl font-bold tracking-tight">Posts</h2>
</div>
<div>
<Tabs.Root value="photo" class="w-full">
    <Tabs.List>
      <Tabs.Trigger value="photo">Photo</Tabs.Trigger>
      <Tabs.Trigger value="review">Review</Tabs.Trigger>
      <Tabs.Trigger value="comment">Comment</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="photo">Change your password here.</Tabs.Content>
    <Tabs.Content value="review">
        <div class="rounded-md bg-muted px-4 py-3 font-mono text-sm">
            <div class="flex justify-between">
                <div>
                    <ThumbsUp fill="rgb(52 211 153)" strokeWidth={0} class="inline"/> User <span class="text-xs">Completed</span>
                </div>
                <div class="text-xs">
                    <div>Posted on 2024.1.1</div>
                    <div></div>
                </div>
            </div>
            <p>review.</p>
            <div class="text-right">Edit Delete</div>
        </div>
    </Tabs.Content>
    <Tabs.Content value="comment">Change your password here.</Tabs.Content>
</Tabs.Root>
</div>