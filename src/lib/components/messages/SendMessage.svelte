<script lang="ts">
	import type { MessageData } from "$lib/types";
  import type { PageData } from './$types';
  import ReplyPopup from '$lib/components/messages/ReplyPopup.svelte';
  
  export let message: MessageData;
  export let data: PageData;

  let showReplyPopup = false;

  function handleReplyClick() {
	  showReplyPopup = true;
  }

  async function handleSendReply(event) {
    showReplyPopup = false;
    replyToMessage(event.detail); // same here
}


  async function replyToMessage(reply: string) {
	try {
		// Construct the reply object
		const replyMessage = {
			sender_id: data.session.user.id,
			receiver_id: message.sender_id,  // assuming the reply is to the sender of the original message
			message_text: reply,
			listing_id: message.listing_id
		};

		// Send the reply to the backend
		const response = await fetch('/api/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(replyMessage)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	} catch (error) {
		console.error('Failed to send the reply:', error);
	}
}

</script>

<article class="message">
  <div class="sender">
	  <strong>{message.sender_id}</strong>
  </div>
  <div class="content">
	  <p>{message.message_texts.message_text}</p>
  </div>
  <time datetime={new Date(message.created_at).toISOString()}>
	  {new Date(message.created_at).toLocaleString()}
  </time>

  <button on:click={handleReplyClick}>Reply</button>

  {#if showReplyPopup}
	  <ReplyPopup on:send={handleSendReply} />
  {/if}
</article>
