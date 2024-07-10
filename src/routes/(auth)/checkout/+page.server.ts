import { redirect } from "@sveltejs/kit";
//import { json } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import { SECRET_STRIPE_KEY } from '$env/static/private'
import Stripe from 'stripe'


/*
interface paymentItem  {
    id:number,
    price:number,
    state:string,
    created_at:Date,
    user_id:string
}

let items:CartItem[] = [];
*/

export const load:PageServerLoad = async({locals:{supabase, user},url}) => {

    const query = url.searchParams;
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
    //cartのアイテムを取得
    const { data:items } = await supabase.from("cart").select(`*, Work(title,price)`).eq("user_id", user?.id);
    const taxRate:number = 0.01;
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

    return { subtotal, tax, total, payment };
}

export const actions = {
    default:async() => {
        //try-catchだとうまく動かない 勉強
        const stripe = new Stripe(SECRET_STRIPE_KEY)

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                price: 'price_1KTfddKf3NgKqC99gmaxn8Tt',
                quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/checkout/?success=true',
            cancel_url: `http://localhost:5173/checkout/?canceled=true`,
        });
        if (session.url != null){
            console.log(session.url);
            redirect(303, session.url);
        }
    }
}