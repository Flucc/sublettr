<script lang="ts">
	import { pageStore, setPageSize, setPageIndex } from '$lib/page';
	import type { Listing } from '$lib/types';
	import { listings } from '$lib/localData';
	import { Paginator } from '@skeletonlabs/skeleton';

	import IndividualListing from '$lib/components/listings/IndividualListing.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		const unsubscribe = pageStore.subscribe(({ pageIndex, pageSize }) => {
			const start = pageIndex * pageSize;
			const end = start + pageSize;
			paginatedSource = listings.slice(start, end);
		});
		return unsubscribe;
	});
	let source: Listing[] = listings;
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

	function onPageChange(e: CustomEvent): void {
		console.log('event:page', e.detail);
		setPageIndex(e.detail);
	}

	function onAmountChange(e: CustomEvent): void {
		setPageSize(e.detail);
		console.log('event:amount', e.detail);
	}
</script>
<h1>{page.offset}</h1>
<ul>
	{#each paginatedSource as listing}
		<li><IndividualListing {listing} /></li>
	{/each}
</ul>

<section
	class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8"
>
	<Paginator settings={page} on:page={onPageChange} on:amount={onAmountChange} />
</section>
