
<script lang="ts">
	import type { PageData } from './$types';

export let data: PageData;
$: ({ notes, supabase, user } = data);

	import { page } from "$app/stores";
	import {UserPlus} from "lucide-svelte";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import * as Tabs from "$lib/components/ui/tabs";
	const userId = $page.params.id;
</script>
<div class="flex mx-auto gap-8 my-8">
	<div class="w-[240px]">
		<div class="flex items-center">
			<Avatar.Root class="mr-2 h-16 w-16">
				<Avatar.Image src="" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<div class="">
				<p>AAA</p>
				<p class="text-gray-400">@{userId}</p>
			</div>
		</div>
		<div class="text-center">
			<Button size="sm" class="w-full my-2">
				<UserPlus class="mr-2 h-4 w-4" />
				Follow
			</Button>
		</div>
		<p>bbbbbbbbbbbbbb</p>
	</div>
	<div class="glow">
		<Tabs.Root value="works" class="space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="works">Works</Tabs.Trigger>
				<Tabs.Trigger value="gallery">Gallery</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="works" class="space-y-4">
				Works Content
			</Tabs.Content>
			<Tabs.Content value="gallery" class="space-y-4">
				Gallery Content
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>