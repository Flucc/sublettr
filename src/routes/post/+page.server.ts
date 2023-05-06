import { supabase } from '$lib/supabaseClient.js';
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
		console.log(imageId);
		return;
		const results = await Promise.all(promises);

		const uploadedImages = [];

		for (const result of results) {
			if (result.error) {
				console.log('Error uploading image:', result.error);
			} else {
				uploadedImages.push(result.data.Key);
			}
		}

		console.log([{ title, description, price, address, images: uploadedImages, ownerId }]);
		const { data, error } = await supabase
			.from('listings')
			.insert([{ title, description, price, address, images: uploadedImages, ownerId }]);

		if (error) {
			console.log('Error inserting data:', error);
		} else {
			console.log('Data inserted successfully:', data);
		}
	}
};
