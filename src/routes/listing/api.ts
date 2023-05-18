import type { Listing } from '$lib/types';
import { supabase } from '$lib/supabase.js';
// Define a function to get listing information from the 'listings' table in your Supabase database
export async function getListing(slug: string): Promise<Listing | null> {
	const { data, error } = await supabase
		.from('listings')
		.select('*')
		.eq('id', slug)
		.single();

	if (error) {
		console.error(error);
		return null;
	}
	return data ?? null;
}
