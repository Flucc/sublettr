import { pageStore } from '$lib/page';
import { supabase } from '$lib/supabase.js';
import { get } from 'svelte/store';

export async function load() {
  const { pageIndex, pageSize } = get(pageStore);

  const offset = pageIndex * pageSize;
  console.log(pageSize + 'bruh')
  console.log(pageIndex)
  const { data: listings, error, count } = await supabase
    .from('listings')
    .select('*', { count: 'exact' })
    .range(offset, offset + pageSize - 1);

  if (error) {
    return {
      status: 500,
      error,
    };
  }

  if (!count) {
    return {
      status: 404,
    };
  }

  const totalPages = Math.ceil(count / pageSize);

  return {
    props: {
      listings,
      totalPages,
    },
  };
}
