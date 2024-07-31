<script lang="ts">
    import { page } from '$app/stores';
    const { children } = $props();
</script>

  <div class="flex max-h-screen">
    <div class="min-w-[120px] pr-4 border-r">
    <nav class="fixed">
      <h1 class="text-xl font-bold">Title</h1>
      <ul class="">
        <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/editor">Edit</a></li>
        <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/summary">Summary</a></li>
        <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/settings">Settings</a></li>
        <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/sales">Sales</a></li>
      </ul>
    </nav>
    </div>
    <div class="grow">
        {@render children()}
    </div>
  </div>
