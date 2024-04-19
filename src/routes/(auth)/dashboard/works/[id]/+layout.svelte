<script lang="ts">
    import { page } from '$app/stores';
</script>
<div class="">
  <div class="flex">
    <nav class="min-w-[240px] pr-4">
      <h1 class="text-xl font-bold">Title</h1>
      <ul class="">
        <li class=""><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/editor">Edit</a></li>
        <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/summary">Summary</a></li>
        <li><a href="{$page.url.origin}/dashboard/works/{$page.params.id}/settings">Settings</a></li>
      </ul>
    </nav>
    <div class="grow bg-muted">
        <slot />
    </div>
  </div>
</div>