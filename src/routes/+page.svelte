<script lang="ts">
	import type { Listing } from '$lib/types';
	import { listings } from '$lib/localData';

	let localListings: Listing[] = listings;
</script>

{#each localListings as listing}
	<a href="listing/1">
		<h2>{listing.title}</h2>
		<p>{listing.description}</p>
	</a>
{/each}
