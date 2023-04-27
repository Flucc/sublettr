<script lang="ts">
	import '@skeletonlabs/skeleton/styles/all.css';
	import { onMount, tick } from 'svelte';
	import {
		AppShell,
		FileButton,
		Autocomplete,
		type AutocompleteOption
	} from '@skeletonlabs/skeleton';
	import {X} from 'lucide-svelte';
	
	import { user } from '$lib/store';

	let files: FileList;
	let title = '';
	let description = '';
	let price = '';
	let address = '';
	let inputAddr = '';
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
		inputAddr = suggestion.display_name;
		addressSuggestions = [];
	}

	async function postListing(event) {
		event.preventDefault();
		// Implement your post-listing logic here, e.g., call your listing API
		// You may need to pass the user's ID as well

		// Reset the input fields after successful submission
		title = '';
		description = '';
		price = '';
		address = '';
	}

    let selectedImages: string[] = [];

    function onChangeHandler(e: Event): void {
        if (selectedImages.length >= 6) {
            alert("You can only upload a maximum of 6 images.");
            return;
        }

        const inputElement = e.target as HTMLInputElement;
        const fileList = inputElement.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                selectedImages = [...selectedImages, event.target.result as string];
            };
            reader.readAsDataURL(file);
        }
    }

    function removeImage(index: number): void {
        selectedImages.splice(index, 1);
        selectedImages = [...selectedImages];
    }
</script>

<AppShell>
	<svelte:fragment slot="default">
		<h1 class="font-bold w-full">Post a Listing</h1>
		<form on:submit={postListing}>

			<div class="image-grid">
				{#each selectedImages as image, index}
					<div class="image-container">
						<img class="object-contain w-full h-full" src="{image}" alt="Selected image" />
						<button on:click={() => removeImage(index)}><X/></button>
					</div>
				{/each}
			</div>
			<section class="!w-full text-center">
				<FileButton
					name="files"
					button="btn-xl variant-soft-primary"
					bind:files
					accept="image/*"
					on:change={onChangeHandler}>Add Photos</FileButton
				>
			</section>

			<label class="label">
				<span>Title</span>
				<input class="input" type="text" placeholder="Listing title" bind:value={title} required />
			</label>

			<label>
				<span>Address</span>
				<input
					class="input"
					type="text"
					placeholder="Enter address"
					bind:value={inputAddr}
					on:input={handleAddressInput}
				/>
			</label>

			<ul class="list">
				{#if addressSuggestions.length > 0}
					{#each addressSuggestions as suggestion}
						<li>
							<span class="flex-auto" on:click={() => setAddress(suggestion)}>
								{suggestion.display_name}</span
							>
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
					required
				/>
			</label>

			<button class="btn variant-filled-primary" type="submit">Post Listing</button>
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

