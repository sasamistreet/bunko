<script lang="ts">
    import { page } from '$app/stores';
    import Button from "$lib/components/ui/button/button.svelte";
    const { children } = $props();
</script>

  <div class="">
    <div class="fixed flex w-full bg-white border-b justify-between p-2 z-40">
      <h1 class="">Works / Title (drafted)</h1>
      <nav class="">
        <ul class="flex space-x-2 pr-12">
          <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/editor">Edit</a></li>
          <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/summary">Summary</a></li>
          <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/settings">Settings</a></li>
          <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/sales">Sales</a></li>
          <Button variant="outline">Drafted</Button>
        </ul>
      </nav>
    </div>
    <div class="pt-20 px-4 bg-muted">
        {@render children()}
    </div>
  </div>
