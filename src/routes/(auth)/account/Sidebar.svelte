<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button } from "$lib/components/ui/button";
	import * as Accordion from "$lib/components/ui/accordion";
    import { Home, Library, Bookmark, ShoppingCart, User, Settings, Users, StickyNote, Bell, LogOut, LayoutDashboard } from "lucide-svelte";

</script>

<div class="w-12 pt-12 fixed h-full bg-white overflow-hidden border-r hover:w-40  hover:shadow-lg hover:border-none transition-all">
	<div class="w-40 flex flex-col h-full pb-16">
		<ul class="text-sm border-b">
			<li><a href="/account" class="block hover:bg-slate-100 px-4 py-3"><Home class="inline mr-4" size={16} strokeWidth={2}/>Home</a></li>
		</ul>
		<ul class="leading-8 text-sm py-2 border-b">
			<li><a href="/account/nortifications"><Bell size={16} class="inline mx-4 my-2"/>Nortifications</a></li>
			<li><a href="/account/following"><Users class="inline mx-4 my-2" size={16} strokeWidth={2}/>Following</a></li>
		</ul>
		<ul class="leading-8 text-sm py-2 border-b">
			<li><a href="/account/library"><Library class="inline mx-4 my-2" size={16} strokeWidth={2}/>Library</a></li>
			<li><a href="/account/wishlist"><Bookmark size={16} class="inline mx-4 my-2"/>Wishlist</a></li>
			<li><a href="/account/cart"><ShoppingCart size={16} class="inline mx-4 my-2"/>Cart</a></li>
		</ul>
		<ul class="leading-8 text-sm py-2 border-b">
			<li><a href="/account/profile"><User size={16} class="inline mx-4 my-2"/>Profile</a></li>
			<li><a href="/account/settings"><Settings size={16} class="inline mx-4 my-2"/>Settings</a></li>
		</ul>
		<ul class="text-sm mt-auto">
			<li class=" px-4 py-3"><a href="/dashboard" class="block hover:bg-slate-100"><LayoutDashboard class="inline mr-4" size={16}/>Dashboard</a></li>
			<li class=" px-4 py-3"><a href="/logout" class="block hover:bg-slate-100"><LogOut class="inline mr-4" size={16}/>Logout</a></li>
		</ul>

	</div>
</div> 