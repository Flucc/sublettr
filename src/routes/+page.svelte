<script lang="ts">
	import { onMount } from 'svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
	import IndividualListing from '$lib/components/listings/IndividualListing.svelte';
	import type { Listing } from '$lib/types';
	import { type ToastSettings, toastStore } from '@skeletonlabs/skeleton';

	export let listings: Listing[] = [];

	let sizeTotal = 0;
	let page = {
		offset: 0,
		limit: 10,
		amounts: [1, 2, 5, 10],
		size: sizeTotal,
	};

	onMount(async () => {
		const response = await fetch(`/api/listings?pageIndex=0&pageSize=10`);
		const data = await response.json();
		listings = data.listings;
		sizeTotal = data.total;
		console.log('DATA:' + data.total);
		page = {
			...page,
			size: sizeTotal,
		};

		console.log('SIZE: ' + sizeTotal);
	});

	async function onPageChange(e: CustomEvent): void {
		page.offset = e.detail;
		const response = await fetch(
			`/api/listings?pageIndex=${page.offset}&pageSize=${page.limit}`
		);
		const data = await response.json();
		listings = data.listings;
		if (data.listings.length === 0) {
			const t: ToastSettings = {
				message: 'No more listings!',
				classes: 'border-4 gradient-heading',
			};
			toastStore.trigger(t);
		} else {
			listings = data.listings;
			page.size = data.total;
		}
	}

	async function onAmountChange(e: CustomEvent): void {
		page.limit = e.detail;
		const response = await fetch(
			`/api/listings?pageIndex=${page.offset}&pageSize=${page.limit}`
		);
		const data = await response.json();
		listings = data.listings;
		page.size = data.total;
	}
</script>

<ul>
	{#each listings as listing}
		<li><IndividualListing {listing} /></li>
	{/each}
</ul>

<section
	class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8"
>
	<Paginator
		settings={page}
		on:page={onPageChange}
		on:amount={onAmountChange}
	/>
</section>
