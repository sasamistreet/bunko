<script lang="ts">
    import * as ToggleGroup from "$lib/components/ui/toggle-group";
    import AspectRatio from "$lib/components/ui/aspect-ratio/aspect-ratio.svelte";
</script>
<div class="container bg-slate-200">
    <h1 class="text-center">Choose Work Type</h1>
    <ToggleGroup.Root type="single" class="max-w-[320px] mx-auto grid grid-cols-2">
        <ToggleGroup.Item value="diagrams" class="bg-white block">
            <AspectRatio ratio={1 / 1} class="bg-muted"></AspectRatio>
            <p>Diagrams</p>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="photos" class="bg-white">
            Photo tutorials
        </ToggleGroup.Item>
        <ToggleGroup.Item value="video" class="bg-white">
            Video
        </ToggleGroup.Item>
        <ToggleGroup.Item value="cp" class="bg-white">
            Crease Pattern
        </ToggleGroup.Item>
    </ToggleGroup.Root>
</div>