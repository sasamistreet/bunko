import { redirect } from "@sveltejs/kit";

/*export async function GET({ cookies }) {
    const sessionId = cookies.get('svelte_ec_session');
    if (sessionId) {
        await deleteSession(sessionId);
        cookies.delete('svelte_ec_session', {path: '/'});
    }
    throw redirect(302, '/');
}*/
/*const Logout = async(e) => {
    e.preventDefault();
    try{
      const { error:logoutError } = await supabase.auth.signOut()
      if (logoutError) {
        throw logoutError;
      }
      await router.push("/");
    }catch{
      alert('エラーが発生しました');
    }
}*/
