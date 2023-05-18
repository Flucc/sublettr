<script lang="ts">
	import Bookmark from './Bookmark.svelte';
	import type { Listing } from '$lib/types';
  	import type { PageData } from './$types';


	export let listing: Listing;
	export let data: PageData;

	$: if (data.session) {
		console.log("POOP"+ data.session.user.id);
  	}
</script>

<div class="flex justify-center">
	<div
		class="max-w-screen-sm w-full text-token flex flex-col space-y-8 mx-auto"
	>
	{#if data.session}
	<Bookmark userId={data.session.user.id} listingId={listing.id} />
	{/if}	
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
