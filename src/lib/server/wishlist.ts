import { supabase } from "$lib/server/supabaseClient";

export async function addToWishlist(userId:String, workId:String) {
	await supabase.from('Wishlist').upsert({user_id:userId, work_id:workId}).select()
}

export async function loadWishlistItems(userId:String) {
	const items = await supabase.from('Wishlist').select().eq('user_id', userId)
	//const productIds = await items.map((item) => item.work_id).toArray();
	const products = await supabase.from('Work').select().eq('id', { $in: items } );
	return await products;
}

export async function removeFromWishlist(userId:String, workId:String) {
	await supabase.from("Wishlist").delete().match({'user_id':userId, 'work_id':workId})
}