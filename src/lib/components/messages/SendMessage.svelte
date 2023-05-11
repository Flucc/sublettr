<script lang="ts" context="module">
	export interface MessageData {
		id: string;
		sender: string;
		content: string;
		date: Date;
	}

	export let message: MessageData;
</script>

<article class="message">
	<div class="sender">
		<strong>{message.sender}</strong>
	</div>
	<div class="content">
		<p>{message.content}</p>
	</div>
	<time datetime={message.date.toISOString()}
		>{message.date.toLocaleString()}</time
	>
</article>
