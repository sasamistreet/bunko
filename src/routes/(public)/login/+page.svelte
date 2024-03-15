<script>
    import { Auth } from '@supabase/auth-ui-svelte'
    import { ThemeSupa } from '@supabase/auth-ui-shared'
	import { goto } from "$app/navigation";

    //import { redirect } from '@sveltejs/kit';
    export let data
    let { supabase } = data
    $: ({ supabase } = data)
    
    $: if (data.session) {
        //window.location.reload()
        //goto('/dashboard')
        console.log("in");
    } else {
        console.log("out")
    }
    //↑ログインしたらリロード 他のやり方は？
</script>
<div class="min-h-screen">
    <div class="max-w-screen-sm mx-auto mt-24">
        <Auth
            supabaseClient={supabase}
            view="sign_in"
            redirectTo={`${data.url}/auth/callback`}
            showLinks={true}
            providers={['google']}
            appearance={{ theme: ThemeSupa, style: { input: 'color: #222' } }}
        />
    </div>
</div>