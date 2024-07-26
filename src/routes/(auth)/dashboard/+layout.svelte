<script lang="ts">
    import Headbar from "./Headbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    const { children } = $props()
</script>
<Sidebar />
<Headbar/>
<main class="pl-12 min-h-fit dark:bg-stone-600 h-screen">
    <div class="container py-4">
        {@render children()}
    </div>
</main>