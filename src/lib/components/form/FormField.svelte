<script lang="ts" generics="T extends ZodSchema">
	import { cn } from '$lib/utils';

	import { writable } from 'svelte/store';

	import type { FormConfig } from '$lib/validation/types';
	import { setContext } from 'svelte';
	import { ZodSchema, z } from 'zod';

	type Props = {
		config: FormConfig<T>;
		name: keyof z.infer<T>;
		class?: string;
	};
	let { config, name, class: className } = $props<Props>();

	const errors = $derived(config.errors);

	const data = config.data;
	const value = writable($data[name]);
	const error = writable<string>($errors[name]);

	$effect(() => {
		error.set($errors[name]);
	});

	value.subscribe((v) => {
		$data[name] = v;
	});

	setContext('form-field', {
		name,
		value,
		error
	});
</script>

<div class={cn('flex flex-col', className)}>
	<slot />
</div>
