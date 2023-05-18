<script lang="ts">
  import { supabase } from '$lib/supabase'; // Import your initialized Supabase client
  import { onMount } from 'svelte';
  
  // Props
  export let userId: string;  // User's ID
  export let listingId: string; // Listing's ID
  
  let isBookmarked = false;
  
  // Function to handle bookmarking
  async function handleBookmark() {
    if (isBookmarked) {
      // Remove bookmark
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .match({ user_id: userId, listing_id: listingId });
        
      if (error) {
        console.error('Error removing bookmark:', error);
        return;
      }
    } else {
      // Add bookmark
      const { error } = await supabase
        .from('bookmarks')
        .insert([{ user_id: userId, listing_id: listingId }]);
        
      if (error) {
        console.error('Error adding bookmark:', error);
        return;
      }
    }
    
    // Toggle bookmark state
    isBookmarked = !isBookmarked;
  }
  
  // On component mount, check if the listing is already bookmarked
  onMount(async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('listing_id')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching bookmarks:', error);
      return;
    }
    
    isBookmarked = data.some(bookmark => bookmark.listing_id === listingId);
  });
</script>

<button on:click={handleBookmark}>
  {#if isBookmarked}
    Remove from Bookmarks
  {:else}
    Add to Bookmarks
  {/if}
</button>
