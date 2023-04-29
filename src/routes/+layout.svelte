<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppBar, AppShell, toastStore, Toast, autoModeWatcher } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Brush, Inbox, User, BookMarked, LogIn, UserPlus } from 'lucide-svelte';

	// Replace with a proper authentication check
	let isAuthenticated = true;

	function navigateTo(route: string): void {
		goto(route);
	}

	function handlePostListingClick(): void {
		const t: ToastSettings = {
			message: 'You need to login first!',
			classes: 'border-4 gradient-heading'
		};
		if (!isAuthenticated) {
			toastStore.trigger(t);
		} else {
			navigateTo('/post');
		}
	}
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/" class="logo" on:click|preventDefault={() => navigateTo('/')}>
					<span><h1 class="gradient-heading font-bold text-xl">Sublettr</h1> </span>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<button
					type="button"
					class="btn variant-filled-primary"
					style="border-radius: 9999px;"
					on:click={() => handlePostListingClick()}
				>
					<span><Brush /></span>
					<span>Post Listing</span>
				</button>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if !isAuthenticated}
					<button
						type="button"
						class="btn variant-filled-primary"
						style="border-radius: 9999px;"
						data-sveltekit-preload-data="hover"
						on:click={() => navigateTo('/login')}
					>
						<span><LogIn /></span>
						<span>Login</span>
					</button>
					<button
						type="button"
						class="btn variant-filled-primary"
						style="border-radius: 9999px;"
						data-sveltekit-preload-data="hover"
						on:click={() => navigateTo('/signup')}
					>
						<span><UserPlus /></span>
						<span>Sign Up</span>
					</button>
				{:else}
					<a
						class="btn variant-filled-primary"
						href="/messages"
						style="border-radius: 9999px;"
						data-sveltekit-preload-data="hover"
						on:click|preventDefault={() => navigateTo('/messages')}
					>
						<span><Inbox /></span>
						<span>Messages</span>
					</a>
					<a
						class="btn variant-filled-primary"
						href="/bookmarks"
						style="border-radius: 9999px;"
						data-sveltekit-preload-data="hover"
						on:click|preventDefault={() => navigateTo('/bookmarks')}
					>
						<span><BookMarked /></span>
						<span>Bookmarks</span>
					</a>
					<a
						class="btn variant-filled-primary"
						href="/profile"
						style="border-radius: 9999px;"
						data-sveltekit-preload-data="hover"
						on:click|preventDefault={() => navigateTo('/profile')}
					>
						<span><User /></span>
						<span>Profile</span>
					</a>
					<!-- Add more functions as needed -->
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
<Toast />
