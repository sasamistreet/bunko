<script lang="ts">
  import SettingForm from "./SettingForm.svelte";
  import type { PageData } from "./$types.js";
  export let data: PageData;
</script>
<div>
<div>
    breadcrumb
</div>
<div class="flex items-center justify-between mb-4">
    <h2 class="text-3xl font-bold tracking-tight">Email Setings</h2>
</div>
  <SettingForm  data={data.form} />
</div>
<div>
  <h2>Stripe Settings</h2>
</div>