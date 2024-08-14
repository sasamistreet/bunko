<script lang="ts">

</script>
{#snippet nortificationItem(title:any)}
    <div class="border-b py-4 my-4">
        <p>{title}</p>
    </div>
{/snippet}
<div class="max-w-[640px] mx-auto">
    <div>
        breadcrumb
    </div>
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-3xl font-bold tracking-tight">Nortifications</h2>
    </div>
    {@render nortificationItem("aaa")}

</div>
