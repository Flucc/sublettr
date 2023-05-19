<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ send: string }>();

	let reply = '';

    function handleSendClick() {
    if (reply.trim()) {
        console.log("Sending message: " + reply);
        dispatch('send', reply);
    }
}

</script>

<div class="reply-popup">
	<h2>Reply</h2>

	<textarea bind:value={reply} />

	<button on:click={handleSendClick}>Send</button>
</div>
