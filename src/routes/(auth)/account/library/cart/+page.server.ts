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

let items:CartItem[]
let sum:number;

export const load:PageServerLoad = async({ locals:{ user, supabase} }) => {
    try{
        const { data } = await supabase.from("Cart").select(`*, Work(title,price)`).eq("user_id", user?.id);
        if (data){
            items = data;
            sum = items ? items.reduce((acc, item) => acc + item.Work.price, 0) : 0;
        } else {
            items = [];
            sum = 0;
        }
        return { items, sum };
    } catch(error) {
        return {
            items: [],
            sum: 0
        };
    }
};

export const actions = {
    checkout:async({ locals:{ supabase }, request }) => {
        const data = await request.formData();
        //Paymentテーブルにアイテムを追加（金額のみ？）　ステータスはProgress
        //Checkoutページに移行、決済方法を指定
        //決済処理
        //成功がリターンしたら
        //PaymentテーブルのアイテムのステータスをPaidに変更
        //カートのアイテムをライブラリに移し
        //ウィッシュリストとカートのテーブルからアイテムを削除
        //Paidページへジャンプ　ライブラリor作品ページへのリンク
    },
    delete:async({ locals:{ supabase }, request }) => {
        const data = await request.formData();
        await supabase.from("Cart").delete().eq("id", data.get('id'))
        //削除に成功したら配列からアイテムを削除
        //sumを再計算
        //リロード？
    }
}