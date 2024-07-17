<script>
    import { enhance, applyAction } from '$app/forms';
    import Button from "$lib/components/ui/button/button.svelte";

    let setAccountCreatePending = $state(false);
    let setError = $state(false);
    let setConnectedAccountId = $state("");

</script>
<div>
    <form action="" use:enhance={()=>{
        setAccountCreatePending = true;
        setError = false;
        return async ({ result, update }) => {
            await update();
            setAccountCreatePending = false;
            if (result.type === 'redirect'){
                goto(result.location);
            } else {
				await applyAction(result);
			}
        }
    }}>
        <Button>Create</Button>
    </form>
</div>