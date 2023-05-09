import { supabase } from '$lib/supabase.js';
import { tick } from 'svelte';

export const actions = {
	postListing: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const description = String(formData.get('description'));
		const price = Number(formData.get('price'));
		const address = String(formData.get('address'));
		const ownerId = 'some_user_id'; // Replace with actual user ID
		const imageId = formData.getAll('files');

		console.log([{ title, description, price, address, images: imageId, ownerId }]);
		const { data, error } = await supabase
			.from('listings')
			.insert([{ title, description, price, address, images: imageId, ownerId }]);

		if (error) {
			console.log('Error inserting data:', error);
		} else {
			console.log('Data inserted successfully:', data);
		}
	}
};
