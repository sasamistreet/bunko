<script>
    import { page } from "$app/stores";
    let accountLinkCreatePending = $state(false);
    let error = $state(false);
    const connectedAccountId = $page.params.id
</script>
<div class="container">
    <div class="banner">
      <h2>Rocket Rides</h2>
    </div>
    <div class="content">
      <h2>Add information to start accepting money</h2>
      <p>Rocket Rides is the world's leading air travel platform: join our team of pilots to help people travel faster.</p>
      {#if error}
        <p class="error">Something went wrong!</p>
      {/if}
    </div>
    <div class="dev-callout">
      {#if connectedAccountId}
      <p>Your connected account ID is: <code class="bold">{connectedAccountId}</code></p>
      {/if}
      {#if accountLinkCreatePending}
        <p>Creating a new Account Link...</p>
      {/if}
    </div>
  </div>