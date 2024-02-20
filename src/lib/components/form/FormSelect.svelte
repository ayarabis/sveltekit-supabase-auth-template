<script lang="ts" generics="T">
	import type { FormFieldContext } from '$lib/form';
	import { getContext } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';

	type Props = {
		placeholder?: string;
		items: T[];
		itemText: keyof T;
		itemValue?: keyof T;
	};
	const { items, placeholder, itemText, itemValue } = $props<Props>();
	const ctx = getContext<FormFieldContext>('form-field');
	const { name, error } = ctx;
	let { value } = ctx;
</script>

<select
	{name}
	{placeholder}
	bind:value={$value}
	class:error={!!$error}
	class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-surface-500 dark:bg-surface-700 dark:text-white dark:placeholder-gray-400">
	<option value="" selected disabled>{placeholder}</option>
	{#each items as item}
		<option value={itemValue ? item[itemValue] : item}>{item[itemText]}</option>
	{/each}
</select>

<style lang="postcss">
	.input.error {
		@apply !border-red-400 !ring-red-400 placeholder:text-red-300;
	}
</style>
