<script lang="ts">
	import type { FormFieldContext } from '$lib/form';
	import { getContext } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	type Props = {
		rows?: number | null;
		cols?: number | null;
		placeholder?: string;
	};
	const { rows, cols, placeholder } = $props<Props>();
	const ctx = getContext<FormFieldContext>('form-field');
	const { name, error } = ctx;
	let { value } = ctx;

	const onInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
		value.set(event.currentTarget.value);
	};
</script>

<textarea
	{rows}
	{cols}
	{name}
	{placeholder}
	value={$value ?? ''}
	class:error={!!$error}
	class="textarea block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
	on:input={onInput}></textarea>

<style lang="postcss">
	.textarea.error {
		@apply !border-red-400 !ring-red-400 placeholder:text-red-400;
	}
</style>
