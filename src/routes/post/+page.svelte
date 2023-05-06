<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount, tick } from 'svelte';
	import {
		AppShell,
		FileButton,
		Autocomplete,
		type AutocompleteOption
	} from '@skeletonlabs/skeleton';
	import { X } from 'lucide-svelte';
	import { v4 as uuid } from 'uuid';
	import { decode } from 'base64-arraybuffer';
	//import supabase from '$lib/supabaseClient';
	import { user } from '$lib/store';
	import type { ActionData } from './$types';
	export let form: ActionData;

	import { createClient } from '@supabase/supabase-js';

	export const supabase = createClient(
		'https://kzqeeqcvryjxueiqowzx.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cWVlcWN2cnlqeHVlaXFvd3p4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjMxNjgyMSwiZXhwIjoxOTk3ODkyODIxfQ.ZuICzWQq18RKHsarr_9xOe3NXROhIHFvYhbJSZNts3U'
	);

	let title = '';
	let description = '';
	let price = '';
	let address = '';

	let addressSuggestions = [];

	async function handleAddressInput(event) {
		const query = event.target.value;
		if (query.length < 10) {
			addressSuggestions = [];
			return;
		}

		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=us&q=${encodeURIComponent(
				query
			)}`
		);
		const results = await response.json();

		addressSuggestions = results;
	}

	function setAddress(suggestion) {
		address = suggestion.display_name;
		addressSuggestions = [];
	}

	let selectedImages: string[] = [];
	let selectedBlobs: string[] = [];
	let imageUuidList: string[] = [];
	let files: FileList;

	async function onChangeHandler(e: Event) {
		if (selectedImages.length + files.length > 6) {
			alert('You can only upload a maximum of 6 images.');
			return;
		}
		const file = files.item(0);
		if (file != null) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (event) => {
				if (!event.target) return;
				const image = event.target.result as string;
				selectedImages.push(image);
				const data = image.split(',');

				imageUuidList.push(uuid());
				selectedBlobs.push(data[1]);
				selectedBlobs = selectedBlobs.slice();
				selectedImages = selectedImages.slice();
				imageUuidList = imageUuidList.slice();
			};
		}
	}

	function removeImage(index: number): void {
		selectedImages.splice(index, 1);
		selectedBlobs.splice(index, 1);
		imageUuidList.splice(index, 1);
		selectedImages = [...selectedImages];
	}

	async function handleSubmit(e: Event) {
		const promises = [];
		for (let i = 0; i < 6; i++) {
			// Upload the File object to Supabase Storage
			promises.push(
				supabase.storage
					.from('listing_images')
					.upload(imageUuidList[i], decode(selectedBlobs[i]), {
						contentType: 'image/*'
					})
			);
		}
		await Promise.all(promises);
	}
</script>

<AppShell>
	<svelte:fragment slot="default">
		<h1 class="font-bold w-full">Post a Listing</h1>
		<form
			method="POST"
			action="?/postListing"
			enctype="multipart/form-data"
		>
			<div class="image-grid">
				{#each selectedImages as selectedImage, index}
					<div class="image-container">
						<img
							class="object-contain w-full h-full"
							src={selectedImage}
							alt="Selected image {index}"
						/>
						<button on:click={() => removeImage(index)}><X /></button>
					</div>
				{/each}
				<input type="hidden" name="files" value={imageUuidList} />
			</div>
			<section class="!w-full text-center">
				<FileButton
					name="bruh"
					type="file"
					button="btn-xl variant-soft-primary"
					accept="image/*"
					bind:files
					on:change={onChangeHandler}
					>Add Photos
				</FileButton>
			</section>

			<label class="label">
				<span>Title</span>
				<input
					class="input"
					type="text"
					placeholder="Listing title"
					bind:value={title}
					name="title"
					required
				/>
			</label>

			<label>
				<span>Address</span>
				<input
					class="input"
					type="text"
					placeholder="Enter address"
					bind:value={address}
					name="address"
					on:input={handleAddressInput}
				/>
			</label>

			<ul class="list">
				{#if addressSuggestions.length > 0}
					{#each addressSuggestions as suggestion}
						<li>
							<button class="flex-auto" on:click={() => setAddress(suggestion)}>
								{suggestion.display_name}
							</button>
						</li>
					{/each}
				{/if}
			</ul>

			<label class="label">
				<span>Description</span>
				<textarea
					class="input"
					placeholder="Listing description"
					bind:value={description}
					name="description"
					required
				/>
			</label>

			<label class="label">
				<span>Price</span>
				<input
					class="input"
					type="number"
					step="1"
					placeholder="0"
					bind:value={price}
					name="price"
					required
				/>
			</label>

			<button class="btn variant-filled-primary" type="submit" on:submit|preventDefault={handleSubmit}>Post Listing</button>
		</form>
	</svelte:fragment>
</AppShell>

<style>
	form {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		text-align: center;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	button {
		display: block;
		margin: 1rem auto;
	}

	label {
		display: block;
		margin: 1rem auto;
	}
	.list {
		/* List Style */
		@apply list-none;
		/* Spacing */
		@apply space-y-1;
	}

	/* === List Items (Children) === */

	.list li {
		/* @apply bg-red-500; */
		@apply flex items-center space-x-4;
		/* Padding */
		@apply p-2;
		/* Theme: Rounded */
		@apply rounded-token;
		/* Wrapping */
		@apply whitespace-normal break-words;
	}

	.image-grid {
		@apply flex flex-wrap justify-center max-w-[600px] mx-auto my-0;
		/* Adjust this value based on your desired maximum width */
	}
	.image-container {
		@apply relative w-[calc(33.33%_-_10px)] box-border m-[5px] rounded-2xl	overflow-hidden;
	}
	.image-container img {
		@apply w-full h-auto rounded-2xl;
	}
	.image-container button {
		@apply absolute text-error-500 text-sm p-1 cursor-pointer px-[5px] py-0.5 border-[none] right-0 top-0 rounded-full;
	}
</style>
