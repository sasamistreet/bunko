<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import * as Card from "$lib/components/ui/card"
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { AspectRatio } from "$lib/components/ui/aspect-ratio";

</script>
<div class="container mx-auto py-8 px-8">
<h2 class="text-3xl font-bold tracking-tight mb-4">aaa</h2>
<div class="grid grid-cols-4">
	<Card.Root>
		<AspectRatio ratio={16 / 9} class="bg-muted">
			
		</AspectRatio>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Card.Content>
			<Card.Title>Card Title</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Content>
	</Card.Root>
</div>
</div>