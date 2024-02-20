<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';

	const {
		color,
		size,
		rounded,
		nowrap = false,
		class: className,
		disabled,
		children,
		onclick,
		to,
		...rest
	} = $props<{
		color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'neutral';
		size?: 'sm' | 'md' | 'lg' | 'icon';
		rounded?: 'none' | 'sm' | 'md' | 'lg';
		nowrap?: boolean;
		class?: string;
		children?: Snippet;
		type?: HTMLButtonElement['type'];
		onclick?: (() => void) | ((event: MouseEvent & { currentTarget: HTMLButtonElement }) => void);
		disabled?: HTMLButtonElement['disabled'];
		to?: string;
	}>();

	let button: HTMLButtonElement | null = $state(null);

	const variance = tv({
		base: 'button',
		variants: {
			color: {
				primary: 'primary',
				secondary: 'secondary',
				tertiary: 'tertiary',
				success: 'success',
				warning: 'warning',
				danger: 'danger',
				neutral: 'neutral'
			},
			size: {
				sm: 'text-sm py-1 px-2',
				md: 'text-md py-2 px-4',
				lg: 'text-base py-3 px-5',
				icon: 'aspect-square p-2 h-fit'
			},
			rounded: {
				none: 'rounded-none',
				sm: 'rounded-sm',
				md: 'rounded-md',
				lg: 'rounded-lg'
			}
		},
		defaultVariants: {
			size: 'md',
			color: 'primary',
			rounded: 'lg'
		}
	});

	function handleClick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
		onclick && onclick(event);
	}
</script>

<button
	bind:this={button}
	{disabled}
	on:click={handleClick}
	class:text-nowrap={nowrap}
	class={cn('button', variance({ size, color, rounded }), className, '')}
	{...rest}>
	<slot />
</button>
