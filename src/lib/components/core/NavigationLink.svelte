<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import clsx from 'clsx';

	const {
		path,
		text,
		class: className,
		activeClass = 'text-primary-500',
		exact = false,
		replace = false
	} = $props<{
		path: string;
		text: string;
		exact?: boolean;
		replace?: boolean;
		class?: string;
		activeClass?: string;
	}>();

	const location = $derived($page.url.pathname);
	const active = $derived(
		exact ? $page.url.href == $page.url.origin + path : location?.startsWith(path)
	);
</script>

<a
	data-sveltekit-replacestate={replace}
	class={cn('hover:text-blue-600 dark:text-gray-200', className, clsx({ [activeClass]: active }))}
	href={path}>
	{text}
</a>
