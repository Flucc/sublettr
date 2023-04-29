<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Message, { type MessageData } from '$lib/components/messages/SendMessage.svelte';
	import MessageForm from '$lib/components/messages/MessageForm.svelte';

	let messages: MessageData[] = [];

	async function fetchMessages() {
		//const response = await fetch('/api/messages');
		//messages = await response.json();
	}

	async function replyToMessage(reply: string) {
		// Send the reply to the backend, e.g., by calling a REST API or WebSocket
		// Add the new reply to the existing messages list
	}

	onMount(fetchMessages);
</script>

<AppShell>
	<section class="messages-container">
		<h1>Messages</h1>
		{#if messages.length === 0}
			<p>No messages found. Check back later!</p>
		{:else}
			{#each messages as message (message.id)}
				<Message {message} />
			{/each}
		{/if}
		<MessageForm on:submit={replyToMessage} />
	</section>
</AppShell>
