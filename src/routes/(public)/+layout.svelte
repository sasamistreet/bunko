<script lang="ts">
    import Header from "../Header.svelte";
    import UserDropdown from "../UserDropdown.svelte";
    import { Button } from "$lib/components/ui/button";
    import { LogIn } from "lucide-svelte";
    export let data
	let { user } = data
	$: ({ user } = data)
</script>
<Header>
    {#if user}
        <UserDropdown/>
    {:else}
        <Button variant="ghost" size="icon" href="/login"><LogIn strokeWidth={1}/></Button>
    {/if}
</Header>
<main>
    <slot></slot>
</main>