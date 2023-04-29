import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { RequestEvent, Actions } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';
import { get } from 'svelte/store';
import sharp from 'sharp';
const supabase = createClient(PUBLIC_SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cWVlcWN2cnlqeHVlaXFvd3p4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjMxNjgyMSwiZXhwIjoxOTk3ODkyODIxfQ.ZuICzWQq18RKHsarr_9xOe3NXROhIHFvYhbJSZNts3U");

export const actions = {
  postListing: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = String(formData.get('description'));
    const price = Number(formData.get('price'));
    const address = String(formData.get('address'));
    const ownerId = 'some_user_id'; // Replace with actual user ID
    const images = Array.from(formData.getAll('files')) as File[];
    
    const promises = images.map((file) =>
      supabase.storage
        .from('listing_images')
        .upload(`${uuid()}.jpg`, URL.createObjectURL(file))
    );
    const results = await Promise.all(promises);

    for (const result of results) {
      if (result.error) {
        console.log('Error uploading image:', result.error);
      } else {
        images.push(result.data.Key);
      }
    }

    console.log([{ title, description, price, address, images, ownerId }]);
    const { data, error } = await supabase
      .from('listings')
      .insert([{ title, description, price, address, images, ownerId }]);

    if (error) {
      console.log('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
    }
  }
};
