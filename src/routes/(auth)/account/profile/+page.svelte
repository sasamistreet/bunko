<script lang="ts">
    import type { PageData } from "./$types";
    import ProfileForm from "./ProfileForm.svelte";
    export let data: PageData;
</script>
<div class="">
    <h2>Form</h2>
    <ProfileForm form={data.form} />
</div>