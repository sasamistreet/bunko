<script lang="ts">
    import { page } from "$app/stores";
    import { enhance, applyAction } from '$app/forms';
    import Button from "$lib/components/ui/button/button.svelte";

    let accountCreatePending = $state(false);
    let accountLinkCreatePending = $state(false);
    let connectedAccountId:string = $state("");
    let setError = $state(false);
</script>
<div>
    {#if $page.data.connected == true}
    <Button>Dashbaord</Button>
    {/if}
    {#if !accountCreatePending && !connectedAccountId}
    <form action="?/account" method="POST" use:enhance={()=>{
        accountCreatePending = true;
        setError = false;
        return async ({ result }) => {
            accountCreatePending = false;
            if (result.type === 'success'){
                console.log(result.data);
                if (typeof result.data?.account === "string"){
                    connectedAccountId = result.data?.account;
                }
            } else {
				await applyAction(result);
                console.log(result);
			}
        }
    }}>
        <Button type="submit">Create</Button>
    </form>
    {:else if connectedAccountId && !accountLinkCreatePending}
    <form action="?/account_link" method="POST" use:enhance={()=>{
        accountLinkCreatePending = true;
        return async({result}) => {
            if (result.type === 'success' && typeof result.data?.url === "string"){
                accountLinkCreatePending = false;
                window.location.href = result.data?.url;
            } else if (result.type === 'error'){
                console.log(result.error)
            }
        }
    }}>
        <input type="hidden" name="account" id="account" value={connectedAccountId}>
        <Button type="submit">Add Information</Button>
    </form>
    {:else if connectedAccountId || accountCreatePending || accountLinkCreatePending}
    <div class="dev-callout">
        {#if connectedAccountId}
         <p>Your connected account ID is: <code class="bold">{connectedAccountId}</code></p>
         {/if}
        {#if accountCreatePending}
        <p>Creating a connected account...</p>
        {/if}
        {#if accountLinkCreatePending}
        <p>Creating a new Account Link...</p>
        {/if}
      </div>
    {:else}
    <div></div>
    {/if}
</div>