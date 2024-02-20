<script lang="ts">
	import Divider from '$lib/components/core/Divider.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children?: Snippet;
	};
	const { title, children } = $props<Props>();
</script>

<section class="card p-5">
	<div class="flex items-center justify-between">
		{title}
		<slot name="actions" />
	</div>
	<Divider />
	<slot />
</section>
