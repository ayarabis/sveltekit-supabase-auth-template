<script lang="ts">
	import Divider from '$lib/components/core/Divider.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		title?: string;
		children?: Snippet;
	};
	const { title, children } = $props<Props>();
</script>

<section class="card p-1 md:p-5">
	{#if title}
		<div class="flex items-center justify-between">
			{title}
			<slot name="actions" />
		</div>
		<Divider />
	{/if}
	<div class="p-2">
		<slot />
	</div>
</section>
