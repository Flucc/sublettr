import type { Listing } from './types';

export const listings: Listing[] = [
	{
		id: '1',
		title: 'Listing 1',
		description: 'Description 1',
		price: 100,
		address: 'Address 1',
		images: [],
		slug: 'listing-1',
		ownerId: 'user1'
	},
	{
		id: '2',
		title: 'Listing 2',
		description: 'Description 2',
		price: 200,
		address: 'Address 2',
		images: [],
		slug: 'listing-2',
		ownerId: 'user2'
	}
];
