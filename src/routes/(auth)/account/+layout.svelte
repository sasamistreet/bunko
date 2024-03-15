<script lang="ts">
	import Header from "../Header.svelte";
    import Sidebar from "./Sidebar.svelte";
	import {
		Activity,
		CreditCard,
		DollarSign,
		Download,
		Users
	} from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Menubar from "$lib/components/ui/menubar";

	let bookmarks = false;
	let fullUrls = true;
	const profileRadioValue = "benoit";

</script>
<Header></Header>
<Sidebar />
<main class="">
    
    <div class="pl-12">
		<div class="flex-1 space-y-4 p-8 pt-6">
			<slot />
		</div>
	</div>
</main>