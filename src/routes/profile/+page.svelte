<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	
	let userData = null;
	let isCurrentUser = false; // Set this value based on the current user
	let editing = false;
	let newPassword = '';
	let confirmPassword = '';

	function editProfile() {
		editing = true;
	}

	async function saveProfile() {
		if (newPassword !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		// Save changes to the user's profile
		// Then, set editing to false
		editing = false;
	}

	function cancelEditing() {
		editing = false;
	}
</script>

<AppShell>
	<svelte:fragment slot="default">
		<h1>
			{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}
		</h1>
		{#if userData}
			{#if editing}
				<!-- Profile editing form -->
				<form on:submit|preventDefault={saveProfile}>
					<label>
						First Name
						<input type="text" bind:value={userData.first_name} />
					</label>
					<label>
						Last Name
						<input type="text" bind:value={userData.last_name} />
					</label>
					<label>
						Email
						<input type="text" bind:value={userData.email} />
					</label>
					<label>
						New Password
						<input type="password" bind:value={newPassword} />
					</label>
					<label>
						Confirm Password
						<input type="password" bind:value={confirmPassword} />
					</label>
					<button type="submit">Save</button>
					<button type="button" on:click={cancelEditing}>Cancel</button>
				</form>
			{:else}
				<!-- Display user's profile -->
				<div class="profile">
					<p>First Name: {userData.first_name}</p>
					<p>Last Name: {userData.last_name}</p>
					<p>Email: {userData.email}</p>

					{#if isCurrentUser}
						<button on:click={editProfile}>Edit Profile</button>
					{/if}
				</div>
			{/if}
		{/if}
	</svelte:fragment>
</AppShell>
