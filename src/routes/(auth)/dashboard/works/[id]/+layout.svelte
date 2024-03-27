<script>
    import { Button } from "$lib/components/ui/button";
    import {page} from '$app/stores'
</script>

<div class="">
  <div class="flex">
    <div class="min-w-[240px] pr-4">
      <ul class="">
        <li class=""><a href="editor">Edit</a></li>
        <li><a href="summary">Summary</a></li>
        <li><a href="settings">Settings</a></li>
      </ul>
    </div>
    <div class="grow bg-muted">
        <slot />
    </div>
  </div>
</div>