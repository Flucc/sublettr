<script lang="ts">
	import type { PageData, Listing } from '$lib/types'; 
	export let data: Listing;
</script>

<h1>{data?.title}</h1>
<p>{data?.description}</p>
<!-- Add other listing details and messaging functionality here -->
