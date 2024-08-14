<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio"
    import * as Select from "$lib/components/ui/select";
    const sorts = [
        { value: "date", label: "Date" },
        { value: "name", label: "Name" },
    ];
</script>
<div class="container">
    <div class="flex justify-between my-4 p-4">
        <h1 class="text-2xl font-bold">Library</h1>
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
    </div>

    <div class="grid grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">
        <div>
            <a href="/works/1">
                <AspectRatio ratio={1 / 1} class="bg-muted"></AspectRatio>
            </a>
            <p class="mt-2">title</p>
            <p class="text-xs">by author</p>
        </div>
    </div>
</div>