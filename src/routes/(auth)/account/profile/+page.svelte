<script lang="ts">
    import type { PageData } from "./$types";
    import ProfileForm from "./ProfileForm.svelte";
    export let data: PageData;
</script>
<div class="mb-8 max-w-[640px] mx-auto">
    <div>
        breadcrumb
    </div>
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-3xl font-bold tracking-tight">Edit Profile</h2>
    </div>
    <ProfileForm data={data.form} />
</div>