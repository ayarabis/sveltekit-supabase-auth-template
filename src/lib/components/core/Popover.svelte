<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { flip, offset, shift } from 'svelte-floating-ui/dom';
	import { fade } from 'svelte/transition';

	type PopperAction = (node: HTMLElement) => void;

	let { trigger } = $props<{ trigger: Snippet<[PopperAction]>; children?: Snippet }>();

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'fixed',
		placement: 'bottom-end',
		middleware: [offset(), flip(), shift()]
	});

	let showTooltip = $state(false);

	function popper<T extends HTMLElement>(el: T) {
		floatingRef(el);
		el.addEventListener('click', (e) => {
			showTooltip = !showTooltip;
			e.preventDefault();
			e.stopPropagation();
		});
	}
</script>

<svelte:window onclick={() => (showTooltip = false)} />

{@render trigger(popper)}

{#if showTooltip}
	<div transition:fade={{ duration: 100 }} class="absolute" use:floatingContent>
		<div class="card z-10 m-[0.1rem] rounded-lg shadow-md">
			<slot />
		</div>
	</div>
{/if}
