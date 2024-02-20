<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children?: Snippet;
	};
	const { class: className } = $props<Props>();
</script>

<div class={className}>
	<slot />
</div>
