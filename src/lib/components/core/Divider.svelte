<script>
	import { cn } from '$lib/utils';

	const { class: className = '' } = $props();
</script>

<hr class={cn('my-4 border-t-gray-300 dark:border-t-gray-500/50', className)} />
