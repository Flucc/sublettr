import type { Listing } from '$lib/types';
import { getListing } from '../api';

export const prerender = true;

export async function load({ params }: any) {
	let post;
	try {
		// here we are gonna fetch the single article by id
		post = await getListing(params.slug);
	} catch (e) {
		console.log(e);
	}

	return post as Listing;
}
