<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import {
        Home,
        Briefcase,
        Banknote,
        Settings2,
        Bell,
        CircleUserRound,
        Sun,
        Moon
	} from "lucide-svelte";
    import { toggleMode } from "mode-watcher";
</script>
<div class="w-12 fixed h-screen bg-white dark:bg-stone-800 overflow-hidden border-r z-50 hover:w-40  hover:shadow-lg hover:border-none transition-all">
	<div class="w-40 flex flex-col h-full">
        <div class="border-b px-2 py-3">
            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
        </div>
        <ul class="text-sm border-b">
            <li class="px-4 py-3"><a href="/dashboard" class="text-slate-600 hover:text-current"><Home class="inline mr-4" size={16}/>Dashboard</a></li>
        </ul>
        <ul class="text-sm">
            <li class="px-4 py-3"><a href="/dashboard/works" class="text-slate-600 dark:text-stone-400 hover:text-current"><Briefcase class="inline mr-4" size={16}/>Works</a></li>
            <li class="px-4 py-3"><a href="/dashboard/billing" class="text-slate-600 dark:text-stone-400 hover:text-current"><Banknote class="inline mr-4" size={16}/>Billing</a></li>
            <li class="px-4 py-3"><a href="/dashboard/settings" class="text-slate-600 dark:text-stone-400 hover:text-current"><Settings2 class="inline mr-4" size={16}/>Settings</a></li>
            <li class="px-4 py-3"><a href="/dashboard/nortifications" class="text-slate-600 dark:text-stone-400 hover:text-current"><Bell class="inline mr-4" size={16}/>Nortifications</a></li>
        </ul>
        <ul class="text-sm mt-auto mb-4">
            <li class="pl-1">
                <Button on:click={toggleMode} variant="ghost" size="icon">
                    <Sun
                      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />
                    
                </Button>
                <span>Toggle theme</span>
            </li>
            <li class="pl-3 py-3"><a href="/account" class="text-slate-600 hover:text-current"><CircleUserRound class="inline mr-4" size={24} />Account Page</a></li>
        </ul>
    </div>
</div>