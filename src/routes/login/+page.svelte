<script lang="ts">
	import { AppShell, toastStore, Toast } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	let email = '';
	let password = '';

	async function logIn(event) {
		event.preventDefault();

		// Implement your login logic here, e.g., call your authentication API
		const isAuthenticated = false; // Set this value based on your authentication result

		if (isAuthenticated) {
			// Redirect to the home page after successful login
			goto('/');
		} else {
			// Show an error message or handle failed login attempt
			const t: ToastSettings = {
				message: 'Incorrect email or password!',
				classes: 'border-4 gradient-heading'
			};
			toastStore.trigger(t);
		}
	}

	function forgotPassword() {
		// Redirect to the forgot password page
		goto('/forgot-password');
	}
</script>

<AppShell>
	<svelte:fragment slot="default">
		<h1 class="form-title">Log In</h1>

		<div class="form-container">
			<form on:submit={logIn}>
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

				<button class="btn variant-filled-primary form-submit-button" type="submit">Log In</button>
				<button
					class="btn btn-sm variant-filled-tertiary form-submit-button"
					type="button"
					on:click={forgotPassword}
				>
					Forgot Password
				</button>
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
