<script lang="ts">
  import SettingForm from "./SettingForm.svelte";
  import type { PageData } from "./$types.js";
  import Button from "$lib/components/ui/button/button.svelte";
  
  export let data: PageData;
  
</script>
<div class="max-w-[640px] mx-auto">
  <div>
      breadcrumb
  </div>
  <div class="flex items-center justify-between mb-4 py-4">
      <h2 class="text-3xl font-bold tracking-tight">Settings</h2>
  </div>
  <h2 class="mb-4">Email Settings</h2> 
  <div class="shadow p-4 mb-8 bg-white">
    <SettingForm data={data.form} />
  </div>
  <h2 class="mb-4">Stripe Settings</h2> 
  <div class="shadow p-4 mb-8 bg-white">
    <Button variant="outline">Connect</Button>
  </div>
  <h2 class="mb-4">Privacy Settings</h2> 
  <div class="shadow p-4 mb-8 bg-white">

  </div>
</div>