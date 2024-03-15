<script lang="ts">
    import {
        Home,
        LayoutDashboard,
        Briefcase,
        JapaneseYen,
        Settings2,
        Bell,
        LogOut
	} from "lucide-svelte";
    import Headbar from "./Headbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import { Separator } from "$lib/components/ui/separator";
</script>
<Sidebar />
<Headbar/>
<main class="pl-12 min-h-fit bg-muted h-screen">
    <div class="container">
        <div class="text-sm py-2">Dashboard / Works</div>
        <slot />
    </div>
</main>