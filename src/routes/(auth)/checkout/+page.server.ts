import type { PageServerLoad } from "./$types";

type WorkInfo = {
    title:string,
    price:number
}
type CartItem = {
    id:number,
    work_id:number,
    Work:WorkInfo
}

let items:CartItem[] = [];

export const load:PageServerLoad = async({locals:{supabase, user}}) => {
    //cartのアイテムを取得
    const { data:items } = await supabase.from("cart").select().eq("user_id", user?.id);
    //paymentアイテムを取得
    const { data:payment } = await supabase.from("payment").select().eq("user_id", user?.id);
    //
    return { items, payment };
}

export const actions = {
    default:async({locals:{supabase, user}, request}) => {
        //for
        for await (const item of items) {

        }
        //ライブラリにアイテムを追加
        await supabase.from('library').insert({user_id:user?.id, });
        //カートから削除
        const data = await request.formData();
        const { error } = await supabase.from("cart").delete().eq("id", data.get('id'))
        //end
        //ステータスをPaidに
    }
}