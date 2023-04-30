import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { RequestEvent, Actions } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';
import { Buffer } from 'buffer';
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
    const dataUrls = formData.getAll('files');

// Convert Data URLs to Blobs


const blobs = await Promise.all(dataUrls.map(async (dataUrl) => {
  
  const base64Data = dataUrl.split(',')[1];
  const buffer = Buffer.from(base64Data, 'base64');
  console.log(buffer.length)
  return new Blob([buffer]);
}));


const imageUuidList = [];
const promises = [];

for (const blob of blobs) {
  console.log(blob.size);
  const imageId = uuid();
  imageUuidList.push(imageId);
  // Create a File object from the Blob with a proper file name and MIME type
  const file = new File([blob], `${imageId}.jpg`, { type: 'image/jpeg' });
  promises.push(await supabase.storage.from('listing_images').upload(file.name, file));
}

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
