<script lang="ts">
	import Header from "../Header.svelte";
    import Sidebar from "./Sidebar.svelte";
	import { Button } from "$lib/components/ui/button";
    import { LogOut } from "lucide-svelte";

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
	
</script>
<Sidebar />
<Header>
	<Button on:click={logout}><LogOut class="mr-2 h-4 w-4" />Log out</Button>
</Header>
<main class="pt-12">
    <div class="pl-12">
		<div class="flex-1 space-y-4 p-8 pt-2">
			<slot />
		</div>
	</div>
</main>
