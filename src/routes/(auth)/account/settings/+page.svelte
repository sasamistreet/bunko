<script lang="ts">
  import SettingForm from "./SettingForm.svelte";
  import type { PageData } from "./$types.js";
  import Button from "$lib/components/ui/button/button.svelte";
  
  export let data: PageData;
  
</script>

  <div>
      breadcrumb
  </div>
  <div class="flex items-center justify-between mb-4 p-4">
      <h2 class="text-3xl font-bold tracking-tight">Settings</h2>
  </div>
<h3>Email Settings</h3> 
<div class="shadow p-4 my-8">
  <SettingForm  data={data.form} />
</div>
<h3>Card Settings</h3> 
<div class="shadow p-4 my-8">
  <Button variant="outline">Connect</Button>
</div>
<h3>Stripe Settings</h3> 
<div>

</div>