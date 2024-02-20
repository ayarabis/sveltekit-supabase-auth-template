<script lang="ts">
	import { pushModal } from '$lib/modal';
	import type { Snippet } from 'svelte';

	const {
		content,
		title,
		class: className,
		backdropClosable = true
	} = $props<{
		children?: Snippet<[any]>;
		content: Snippet<
			[
				{
					close: () => void;
				}
			]
		>;
		class?: string;
		backdropClosable?: boolean;
		title?: string;
	}>();

	export function trigger(el: HTMLElement) {
		function onclick() {
			pushModal({
				type: 'custom',
				content: content,
				backdropClosable,
				class: className,
				title
			});
		}
		el.addEventListener('click', onclick);
	}
</script>

<slot {trigger} />
