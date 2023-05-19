import { supabase } from '$lib/supabase.js';

export async function GET({ url }: any) {
	const pageIndex = Number(url.searchParams.get('pageIndex'));
	const pageSize = Number(url.searchParams.get('pageSize'));
	const userId = url.searchParams.get('userId');

	if (!userId) {
		return {
			status: 400,
			body: {
				error: 'User id is required',
			},
		};
	}

	const { data: bookmarks, error: bookmarkError } = await supabase
		.from('bookmarks')
		.select('listing_id')
		.eq('user_id', userId);

	if (bookmarkError) {
		return {
			status: 500,
			body: {
				error: bookmarkError,
			},
		};
	}

	const bookmarkIds = bookmarks.map(bookmark => bookmark.listing_id);
	const offset = pageIndex * pageSize;

	const { data: listings, error } = await supabase
		.from('listings')
		.select('*', { count: 'exact' })
		.in('id', bookmarkIds)
		.range(offset, offset + pageSize - 1);

	if (error) {
		return {
			status: 500,
			body: {
				error,
			},
		};
	}

	const { data: userBookmarks, error: countError } = await supabase
		.from('bookmarks')
		.select('listing_id')
		.eq('user_id', userId);

	if (countError) {
		return {
			status: 500,
			body: {
				error: countError,
			},
		};
	}

	const total = userBookmarks.length;
	return new Response(JSON.stringify({ listings, total }), { status: 200 });
}
