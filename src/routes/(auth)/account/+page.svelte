<script lang="ts">
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
