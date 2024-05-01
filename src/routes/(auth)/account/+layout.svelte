<script lang="ts">
	import Header from "../Header.svelte";
    import Sidebar from "./Sidebar.svelte";

</script>
<Sidebar />
<Header></Header>
<main class="pt-12">
    <div class="pl-12">
		<div class="flex-1 space-y-4 p-8 pt-2">
			<slot />
		</div>
	</div>
</main>
