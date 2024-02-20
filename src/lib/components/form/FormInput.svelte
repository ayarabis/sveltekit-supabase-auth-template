<script lang="ts">
	import type { FormFieldContext } from '$lib/form';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	type Props = {
		class?: string;
	} & {
		[key in keyof HTMLInputElement]?: any;
	};
	const { type, placeholder, class: className } = $props<Props>();
	const ctx = getContext<FormFieldContext>('form-field');
	const { name, error } = ctx;
	let { value } = ctx;

	const onInput: FormEventHandler<HTMLInputElement> = (event) => {
		value.set(event.currentTarget.value);
		error.set('');
	};
</script>

<input
	{type}
	{name}
	{placeholder}
	value={$value ?? ''}
	class:error={!!$error}
	class={cn(
		'input dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-300 focus:ring-primary-300 dark:border-gray-500 dark:bg-surface-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
		className
	)}
	on:input={onInput} />

<style lang="postcss">
	.input.error {
		@apply !border-red-400 !ring-red-400 placeholder:text-red-300;
	}
</style>
