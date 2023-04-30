<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount, tick } from 'svelte';
	import {
		AppShell,
		FileButton,
		Autocomplete,
		type AutocompleteOption
	} from '@skeletonlabs/skeleton';
	import {X} from 'lucide-svelte';
	
	import { user } from '$lib/store';
	import type { ActionData } from "./$types";
	export let form: ActionData

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


	let selectedImageBlobs: Blob[] = [];
    let selectedImages: File[] = [];
    let files: FileList;
    let dataUrls: string[] = [];

    async function convertFileToBlob(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);
          resolve(blob);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
        reader.readAsArrayBuffer(file);
      });
    }

	async function onChangeHandler(e: Event): void {
    if (selectedImages.length + files.length > 6) {
        alert("You can only upload a maximum of 6 images.");
        return;
    }
    const file = files.item(0);
    if (file != null) {
        selectedImages.push(file);
        const blob = await convertFileToBlob(file);
        selectedImageBlobs.push(blob);

        // Convert the blob to a Base64 Data URL
        const dataUrl = await blobToDataUrl(blob);
        dataUrls.push(dataUrl);
    }
    console.log(selectedImages);
    selectedImages = selectedImages.slice();
}

async function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsDataURL(blob);
    });
}

	function removeImage(index: number): void {
        selectedImages.splice(index, 1);
        selectedImages = [...selectedImages];
    }
</script>

<AppShell>
	<svelte:fragment slot="default">
		<h1 class="font-bold w-full">Post a Listing</h1>
		<form method="POST" action="?/postListing" enctype="multipart/form-data" use:enhance>

			<div class="image-grid">
				{#each selectedImages as image, index}
					<div class="image-container">
						<input type="hidden" name="files" value={dataUrls[index]}>
						<img class="object-contain w-full h-full" src="{URL.createObjectURL(image)}" alt="Selected image {index}" />
						<button on:click={() => removeImage(index)}><X/></button>
					</div>
				{/each}
			</div>
			<section class="!w-full text-center">
				<FileButton
					name="bruh"
					type="file"
					button="btn-xl variant-soft-primary"
					accept="image/*"
					bind:files
					on:change={onChangeHandler}>Add Photos
				</FileButton>
			</section>
			
			<label class="label">
				<span>Title</span>
				<input class="input" type="text" placeholder="Listing title" bind:value={title} name='title'  required />
			</label>

			<label>
				<span>Address</span>
				<input
					class="input"
					type="text"
					placeholder="Enter address"
					bind:value={address}
					name='address'
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
					name='description'
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
					name='price'
					required
				/>
			</label>

			<button class="btn variant-filled-primary">Post Listing</button>
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

