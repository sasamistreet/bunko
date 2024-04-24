<script lang="ts">
    import Headbar from "./Headbar.svelte";
    import Sidebar from "./Sidebar.svelte";
</script>
<Sidebar />
<Headbar/>
<main class="pl-12 min-h-fit bg-stone-100 dark:bg-stone-600 h-screen">
    <div class="text-sm py-2">Dashboard / Works</div>
    <div class="container">
        <slot />
    </div>
</main>