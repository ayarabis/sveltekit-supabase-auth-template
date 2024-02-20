<script lang="ts">
	import { cn } from '$lib/utils';

	const {
		class: className,
		size = '1.5rem',
		color = 'currentColor',
		ariaLabel,
		ariaHidden,
		desc,
		title,
		path
	} = $props<{
		size?: string;
		color?: string;
		viewBox?: string;
		class?: string;
		ariaLabel?: string;
		ariaHidden?: boolean;
		desc?: string;
		title?: string;
		path: string;
	}>();

	const width = size;
	const height = size;
</script>

<svg
	class={cn('inline', className)}
	{width}
	{height}
	viewBox="0 0 24 24"
	aria-label={ariaLabel}
	aria-hidden={ariaHidden}>
	{#if title}
		<title>{title}</title>
	{/if}
	{#if desc}
		<desc>{desc}</desc>
	{/if}
	<path d={path} fill={color} />
</svg>
