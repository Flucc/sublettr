import { createClient } from '@supabase/supabase-js';
import type { Listing } from '$lib/types';
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';
// Initialize the Supabase client with your Supabase URL and API key
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

// Define a function to get listing information from the 'listings' table in your Supabase database
export async function getListing(slug: string): Promise<Listing | null> {
	const { data, error } = await supabase
		.from('listings')
		.select('*')
		.eq('slug', slug)
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data ?? null;
}
