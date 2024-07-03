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

let taxRate:number = 0.01;

export const load:PageServerLoad = async({locals:{supabase, user}}) => {
    //cartのアイテムを取得
    const { data:items } = await supabase.from("cart").select(`*, Work(title,price)`).eq("user_id", user?.id);
    let subtotal:number;
    if (items){
        subtotal = items ? items.reduce((acc, item) => acc + item.Work.price, 0) : 0;
    } else {
        subtotal = 0;
    }
    const tax:number = subtotal * taxRate
    const total:number = tax + subtotal;
    //paymentアイテムを取得
    const { data:payment } = await supabase.from("payment").select().eq("user_id", user?.id);
    //
    return { subtotal, tax, total, payment };
}

export const actions = {
    default:async({locals:{supabase, user}, request}) => {
        const formData = await request.formData();
        
        //Paymentテーブルにアイテムを追加（金額のみ？）　ステータスはProgress
        await supabase.from('payment').insert({user_id:user?.id, price:formData.get('price'), state:"processing"});
        
        //アイテムごとに
        for await (const item of items) {
            //ライブラリにうつして
            await supabase.from('library').insert({user_id:user?.id, work_id:item.work_id});
            //カートから削除
            await supabase.from('cart').delete().eq("id", item.id)
        }

        //end
        await supabase.from('payment').upsert({user_id:user?.id, price:formData.get('price'), state:"paid"});
        //ステータスをPaidに
    }
}