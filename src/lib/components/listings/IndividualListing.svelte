<script lang="ts">
	import { onMount } from 'svelte';
	//	import { session } from '$lib/auth';
	import { supabase } from '$lib/supabase.js';
	import type { Listing } from '$lib/types';

	export let listing: Listing;

	let user;

	onMount(async () => {
		//user = session.user;
	});

	async function addToBookmarks() {
		if (!user) {
			console.error('User is not logged in');
			return;
		}

		const { data, error } = await supabase.from('bookmarks').insert([
			{
				//user_id: user.id,
				//listing_id: listing.id,
			},
		]);

		if (error) {
			console.error('Error adding bookmark:', error);
		} else {
			console.log('Bookmark added:', data);
		}
	}
</script>

<div class="flex justify-center">
	<div
		class="max-w-screen-sm w-full text-token flex flex-col space-y-8 mx-auto"
	>
		<a
			class="card card-hover overflow-hidden mx-auto mb-8"
			href="/listing/{listing.id}"
		>
			<header>
				<img
					src="https://source.unsplash.com/random/1280x540?skeleton"
					class="bg-black/50 w-full aspect-[21/9]"
					alt="Post"
				/>
				<button class="btn btn-primary" on:click={addToBookmarks}>
					Add to Bookmarks
				</button>
			</header>
			<div class="p-4 space-y-4">
				<div class="flex justify-between items-center">
					<h6>{listing.still_available}</h6>
					<h6 class="font-bold">Price: ${listing.price}</h6>
				</div>
				<h3 data-toc-ignore>{listing.title}</h3>
				<article>
					<p>
						{listing.description}
					</p>
				</article>
			</div>
			<hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold">{listing.address}</h6>
					<small>Posted {new Date().toLocaleDateString()}</small>
				</div>
			</footer>
		</a>
	</div>
</div>
