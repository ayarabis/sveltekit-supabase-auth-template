<script lang="ts">
	import { cn } from '$lib/utils';
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	import { tv } from 'tailwind-variants';

	const {
		type,
		class: className,
		dismissable = false
	} = $props<{
		type?: 'success' | 'info' | 'warning' | 'error';
		class?: HTMLElement['className'];
		dismissable?: boolean;
		children?: Snippet;
	}>();

	let show = $state(true);

	const variance = tv({
		base: 'border-1 mb-4 rounded-lg border',
		variants: {
			type: {
				success:
					'border-success-300/50 p-3 bg-success-400/30 text-success-700 dark:bg-surface-500/20 dark:border-success-500/30 dark:text-success-500',
				info: 'border-sky-300/50 p-3 bg-sky-400/30 text-blue-700 dark:bg-surface-500/20 dark:border-sky-500/30 dark:text-sky-500',
				warning:
					'border-warning-400/50 p-3 bg-warning-500/30 text-warning-700 dark:bg-surface-500/20 dark:border-warning-500/30 dark:text-warning-500',
				error:
					'border-danger-300/50 p-3 bg-danger-500/20 text-red-700 dark:bg-surface-500/20 dark:border-danger-500/30 dark:text-danger-400',
				neutral:
					'border-gray-300/50 p-3 bg-surface-300/20 text-gray-70 dark:bg-surface-500/20 dark:border-gray-500 dark:text-white0'
			}
		},
		defaultVariants: {
			type: 'neutral'
		}
	});
</script>

{#if show}
	<div
		transition:scale={{ duration: 100 }}
		class={cn(
			variance({ type }),
			className,
			clsx({ 'flex items-center justify-between': dismissable })
		)}
		role="alert">
		<slot />
		{#if dismissable}
			<button type="button" on:click={() => (show = false)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
{/if}
