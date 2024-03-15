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

</script>
<div class="grid grid-cols-6 gap-4">
	<div>a</div>
	<div class="col-span-4 hidden flex-col md:flex">
		<div class="flex-1 space-y-4 p-8 pt-6">
			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
				<div class="flex items-center space-x-2">
					<Button size="sm">
						<Download class="mr-2 h-4 w-4" />
						Download
					</Button>
				</div>
			</div>
			<Tabs.Root value="overview" class="space-y-4">
				<Tabs.List>
					<Tabs.Trigger value="overview">Outlines</Tabs.Trigger>
					<Tabs.Trigger value="analytics" disabled>Articles</Tabs.Trigger
					>
					<Tabs.Trigger value="reports" disabled>Gallery</Tabs.Trigger>
					<Tabs.Trigger value="notifications" disabled
						>Works</Tabs.Trigger
					>
				</Tabs.List>
				<Tabs.Content value="overview" class="space-y-4">
					
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</div>
	<div></div>
</div>