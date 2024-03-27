<script lang="ts">
    import StepDetail from "./StepDetail.svelte"
    import { Trash2, MoreVertical } from "lucide-svelte";

    import type { PageData } from "./$types";
    export let data: PageData;

</script>
<StepDetail data={data.form}/>
