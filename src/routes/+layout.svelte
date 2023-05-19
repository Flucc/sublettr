<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		toastStore,
		Toast,
		ListBox,
		ListBoxItem,
		autoModeWatcher,
		storePopup,
		type PopupSettings,
		popup,
	} from '@skeletonlabs/skeleton';
	import {
		computePosition,
		autoUpdate,
		offset,
		shift,
		flip,
		arrow,
		size, autoPlacement, hide, inline 
	} from '@floating-ui/dom';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Brush, Inbox, User, BookMarked, LogIn, LogOut, Github } from 'lucide-svelte';

	// AUTH CHECK ON MOUNT
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow, size, autoPlacement, hide, inline  });
	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item',
	};

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	async function handleLogout(event) {
		event.preventDefault();
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error signing out:', error);
		} else {
			goto('/'); // Redirect to home page after successful logout
		}
	}

	function navigateTo(route: string): void {
		goto(route);
	}

	function handlePostListingClick(): void {
		const t: ToastSettings = {
			message: 'You need to login first!',
			classes: 'border-4 gradient-heading',
		};
		if (!session) {
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
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<a href="https://github.com/Flucc/sublettr"><Github/></a>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<a
					href="/"
					class="logo"
					on:click|preventDefault={() => navigateTo('/')}
				>
					<span
						><h1 class="gradient-heading font-bold text-xl">Sublettr</h1>
					</span>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">

			{#if session}
			<div class ="flex rounded-md items-center mr-10">
			<button
			class="btn variant-filled justify-between flex items-center"
			use:popup={popupCombobox}>
			<span>Menu ↓</span>
		</button>
		<div data-popup="popupCombobox">
			
			

			<ListBox active="variant-filled-primary">
				<ListBoxItem on:click={() => handlePostListingClick()}>
					<div class="flex items-center">
					<Brush class="mr-2"/>
					Post Listing
				</div>
				</ListBoxItem>
					<ListBoxItem on:click={() => navigateTo('/messages')}>
						<div class="flex items-center">
						<Inbox class="mr-2" />
						Messages
					</div>
					</ListBoxItem>
					<ListBoxItem on:click={() => navigateTo('/bookmarks')}>
						<div class="flex items-center">
						<BookMarked class="mr-2"/>
						Bookmarks
					</div>
					</ListBoxItem>
					<ListBoxItem on:click={() => navigateTo('/profile')}>
						<div class="flex items-center">
						<User class="mr-2"/>
						Profile
					</div>
					</ListBoxItem>
					<ListBoxItem on:click={handleLogout}>
						<div class="flex items-center">
						<LogOut class="mr-2"/>
						Logout
					</div>
					</ListBoxItem>
				
			</ListBox>
		</div>
	</div>
		{:else}
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
		{/if}
	</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
<Toast />

<slot />
<Toast />

