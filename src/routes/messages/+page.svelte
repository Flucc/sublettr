<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Message from '$lib/components/messages/SendMessage.svelte';
	import type { MessageData } from "$lib/types";

	import MessageForm from '$lib/components/messages/MessageForm.svelte';


	import type { PageData } from './$types'

	export let data: PageData;

	export let messages: MessageData[] = [];

	async function fetchMessages() {
	const response = await fetch(`/api/messages?userId=${data.session.user.id}`);
	const fetched = await response.json();
	messages = fetched.messages;
	console.log(messages);

}


	async function replyToMessage(reply: string) {
		// Send the reply to the backend, e.g., by calling a REST API or WebSocket
		// Add the new reply to the existing messages list
	}

	onMount(() => fetchMessages());
</script>

<AppShell>
	<section class="messages-container">
		<h1>Messages</h1>
		{#if messages.length === 0}
			<p>No messages found. Check back later!</p>
		{/if}
		{#each messages as message}
			<Message {message} {data}/>
		{/each}
		
	</section>
</AppShell>
