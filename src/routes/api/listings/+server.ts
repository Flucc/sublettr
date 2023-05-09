import { supabase } from '$lib/supabase.js';

export async function GET(request) {
	const { params, url } = request;
	const pageIndex = Number(url.searchParams.get('pageIndex'));
	const pageSize = Number(url.searchParams.get('pageSize'));

	const offset = pageIndex * pageSize;
	const {
		data: listings,
		error
	} = await supabase
		.from('listings')
		.select('*', { count: 'exact' })
		.range(offset, offset + pageSize - 1);

		if (error) {
			console.log('L');
			return {
			  status: 500,
			  body: {
				error
			  }
			};
		  }

	  // Fetch total count separately without range
	  const { data: totalListings, error: countError } = await supabase
	  .from('listings')
	  .select('id', { count: 'exact' }); // count 'exact' on 'id' field
  
	if (countError) {
	  console.log('Count Error:', countError);
	  return {
		status: 500,
		body: {
		  error: countError
		}
	  };
	}
  
	const total = totalListings.length;
	return new Response(JSON.stringify({ listings, total }), { status: 200 });
}
