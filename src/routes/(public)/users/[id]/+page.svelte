<script lang="ts">
	import { page } from "$app/stores";
	import {
		Plus
	} from "lucide-svelte";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Tabs from "$lib/components/ui/tabs";
	import { AspectRatio } from "$lib/components/ui/aspect-ratio";
	const userId = $page.params.id;
</script>
<div class="w-[640px] flex mx-auto gap-4 my-8">
	<div class="w-1/3">
		<Avatar.Root class="mx-auto">
			<Avatar.Image src="" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="text-center">
			<p>AAA</p>
			<p class="">@{userId}</p>
		</div>
		<div class="text-center">
			<Button size="sm" variant="link" class="">
				<Plus class="mr-2 h-4 w-4" />
				Follow
			</Button>
		</div>
		<p>bbbbbbbbbbbbbb</p>
	</div>
	<div class="w-2/3">
		<Tabs.Root value="works" class="space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="works">Works</Tabs.Trigger>
				<Tabs.Trigger value="gallery">Gallery</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="works" class="space-y-4">
				
			</Tabs.Content>
			<Tabs.Content value="gallery" class="space-y-4">
				
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>