<script lang="ts">
	import Profile from "./Profile.svelte";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Home from "./Home.svelte";
	import Articles from "./Articles.svelte";
	import {
		Activity,
		CreditCard,
		DollarSign,
		Download,
		Users
	} from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Tabs from "$lib/components/ui/tabs";
	import Gallery from "./Gallery.svelte";
	import Works from "./Works.svelte";
</script>

<div class="grid grid-cols-6 pt-6">
<div></div>
<div class="col-span-1">
	<Profile></Profile>
</div>

<div class="col-span-3 hidden flex-col md:flex">
	
	<div class="flex-1 px-8">
		<ul class="tabmenu">
			<li class="current">Works</li>
			<li><a href="/">Gallery</a></li>
			<li><a href="/">Reviews</a></li>
			<li><a href="/">Contact</a></li>
		</ul>
		<div>
			<Skeleton class="w-[200px] h-[200px]" />
		</div>
	</div>
</div>
<div></div>
</div>

<style>
	
</style>