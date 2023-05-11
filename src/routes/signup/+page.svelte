<script lang="ts">
	import { AppShell, toastStore, Toast } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	let email = '';
	let password = '';
	let confirmed_password = '';
	let first_name = '';
	let last_name = '';
	let username = '';

	async function signUp(event) {
		event.preventDefault();

		if (password !== confirmed_password) {
			const t: ToastSettings = {
				message: 'Passwords are different!',
				classes: 'border-4 gradient-heading',
			};
			toastStore.trigger(t);
			return;
		}
		// Implement your sign-up logic here, e.g., call your authentication API
		const isRegistered = true;
		if (isRegistered) {
			// Redirect to the login page after successful registration
			goto('/login');
		} else {
			// Show an error message or handle failed registration attempt
		}
	}
</script>

<AppShell>
	<svelte:fragment slot="default">
		<h1 class="form-title">Sign Up</h1>

		<div class="form-container">
			<form on:submit={signUp}>
				<label class="label">
					<span>First Name</span>
					<input
						class="input"
						type="text"
						placeholder="John"
						bind:value={first_name}
						required
					/>
				</label>

				<label class="label">
					<span>Last Name</span>
					<input
						class="input"
						type="text"
						placeholder="Smith"
						bind:value={last_name}
						required
					/>
				</label>

				<label class="label">
					<span>Email</span>
					<input
						class="input"
						type="text"
						placeholder="johnsmith@hotmail.com"
						bind:value={email}
						required
					/>
				</label>

				<label class="label">
					<span>Password</span>
					<input class="input" type="password" bind:value={password} required />
				</label>

				<label class="label">
					<span>Confirm Password</span>
					<input
						class="input"
						type="password"
						bind:value={confirmed_password}
						required
					/>
				</label>

				<!-- <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <div class="input-group-shim">(segment)</div>
            <input type="search" placeholder="Search..." />
            <button class="variant-filled-secondary">Submit</button>
        </div> -->

				<button
					class="btn variant-filled-primary form-submit-button"
					type="submit">Sign Up</button
				>
			</form>
		</div>
	</svelte:fragment>
</AppShell>

<style>
	.form-container {
		max-width: 400px; /* Set the desired width for your form */
		margin: 0 auto; /* Center the form horizontally */
		padding: 1rem; /* Add some padding around the form */
	}

	/* Center the form's title */
	.form-title {
		margin-top: 1.5rem;
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.form-submit-button {
		display: block;
		margin: 1rem auto; /* Center the button horizontally */
	}
</style>
