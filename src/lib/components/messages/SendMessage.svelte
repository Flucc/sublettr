<script lang="ts">
  	import type { MessageData } from "$lib/types";
	import type { PageData } from './$types';
	
	export let message: MessageData;
	export let data: PageData;
</script>

<article class="message">
	<div class="sender">
		<strong>{message.sender_id}</strong>
	</div>
	<div class="content">
		<p>{message.message_texts.message_text}</p>
	</div>
	<time datetime={new Date(message.created_at).toISOString()}
		>{new Date(message.created_at).toLocaleString()}</time
	>
</article>

