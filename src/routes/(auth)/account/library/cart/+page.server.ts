import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit'

type WorkInfo = {
    title:string,
    price:number
}
type CartItem = {
    id:number,
    work_id:number,
    Work:WorkInfo
}

let sum:number;
let taxRate:number = 0.01;

export const load:PageServerLoad = async({ locals:{ user, supabase} }) => {
    try{
        const { data:items } = await supabase.from("cart").select(`*, Work(title,price)`).eq("user_id", user?.id);
        if (items){
            sum = items ? items.reduce((acc, item) => acc + item.Work.price, 0) : 0;
        } else {
            sum = 0;
        }
        const tax:number = sum * taxRate
        const total:number = tax + sum;
        return { items, sum, tax, total };
    } catch(error) {
        return {
            items: [],
            sum: 0
        };
    }
};

export const actions = {
    checkout:async({ url, locals:{ supabase, user }, request }) => {
        const formData = await request.formData();
        //Paymentテーブルにアイテムを追加（金額のみ？）　ステータスはProgress
        //前回の中止データが存在したら？最新のデータのみ参照
        const { error } = await supabase.from('payment').insert({user_id:user?.id, price:formData.get('price'), state:"processing"});
        if (error) {
            console.log(error);
        }
        redirect(302, `${url.origin}/checkout`);
        //Checkoutページに移行、決済方法を指定
        //
        //決済処理
        //成功がリターンしたら
        //PaymentテーブルのアイテムのステータスをPaidに変更
        //カートのアイテムをライブラリに移し
        //ウィッシュリストとカートのテーブルからアイテムを削除
        //Paidページへジャンプ　ライブラリor作品ページへのリンク
    },
    delete:async({ locals:{ supabase }, request }) => {
        const data = await request.formData();
        const { error } = await supabase.from("cart").delete().eq("id", data.get('id'))
        if(error){
            console.log(error)
        }
    }
}