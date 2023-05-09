import { supabase } from '$lib/supabase.js';

export async function GET(request) {
  const { params, url } = request;
  const pageIndex = Number(url.searchParams.get('pageIndex'));
  const pageSize = Number(url.searchParams.get('pageSize'));

  const offset = pageIndex * pageSize;
  const { data: listings, error, count } = await supabase
    .from('listings')
    .select('*', { count: 'exact' })
    .range(offset, offset + pageSize - 1);

    if (error) {
      console.log('L');
      return {
        status: 500,
        body: {
          error,
        },
      };
    }
  
    if (!count) {
      console.log('P');
      return {
        status: 404,
        body: {
          message: 'Not found',
        },
      };
    }
  
    const totalPages = Math.ceil(count / pageSize);
    console.log(count +'\n' + pageSize);
    console.log(listings);
    console.log(offset);
    return new Response(JSON.stringify(listings), {status: 200});
  }
