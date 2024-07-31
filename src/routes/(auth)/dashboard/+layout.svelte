<script lang="ts">
    import Headbar from "./Headbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    const { children } = $props()
</script>
<Sidebar />
<Headbar/>
<main class="pl-12 dark:bg-stone-600 h-screen box-content">
    {@render children()}
</main>