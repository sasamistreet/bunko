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

function calculateSum(items:CartItem[]|null){
    let sum:number = 0;
    if (items){
        for (const item of items ){
            sum = sum + item.Work.price;
        }
    }
    return sum;
}

export const load:PageServerLoad = async({ locals:{ user, supabase} }) => {
    try{
        const { data } = await supabase.from("Cart").select(`*, Work(title,price)`).eq("user_id", user?.id);
        let items:CartItem[]
        let sum:number;
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