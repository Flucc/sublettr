<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ submit: string }>();

	let message = '';

	function handleSubmit() {
		if (message.trim()) {
			dispatch('submit', message);
			message = '';
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<textarea
		class="message-input"
		placeholder="Write your reply..."
		bind:value={message}
	/>
	<button class="reply-button" type="submit">Reply</button>
</form>
