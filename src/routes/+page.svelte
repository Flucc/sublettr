<script lang="ts">
	import { onMount } from 'svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
	import IndividualListing from '$lib/components/listings/IndividualListing.svelte';
	import { pageStore, setPageIndex, setPageSize } from '$lib/page';
	import type { Listing } from '$lib/types';
	import { get } from 'svelte/store';
	
	export let listings: Listing[] = [];
	export let data;
	let source: Listing[] = [];
	onMount(async () => {
	  const response = await fetch(`/api/listings?pageIndex=0&pageSize=10`);
	  const listings = await response.json();
	  console.log('FAT' + listings)
	});
	console.log("BRUH source", source);
	console.log("BRUH listings", listings);
	console.log(data);
	let page = {
	  offset: 0,
	  limit: 10,
	  size: source.length,
	  amounts: [1, 2, 5, 10]
	};

	$: paginatedSource = source.slice(
	  page.offset * page.limit, // start
	  page.offset * page.limit + page.limit // end
	);
	
	async function onPageChange(e: CustomEvent): void {
	  const response = await fetch(`/api/listings?pageIndex=${e.detail}&pageSize=${page.limit}`);
	  const { listings } = await response.json();
	  source = listings;
	}
	
	async function onAmountChange(e: CustomEvent): void {
	  setPageSize(e.detail);
	  const response = await fetch(`/api/listings?pageIndex=${page.offset}&pageSize=${e.detail}`);
	  const { listings } = await response.json();
	  source = listings;
	}
  </script>
  <ul>
	{#each paginatedSource as listing}
	  <li><IndividualListing listing={listing} /></li>
	{/each}
  </ul>
	
  <section
	class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8"
  >
	<Paginator settings={page} on:page={onPageChange} on:amount={onAmountChange} />
  </section>
  