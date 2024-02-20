<script lang="ts">
	import type { FormFieldContext } from '$lib/form';
	import { getContext, type Snippet } from 'svelte';

	type Props = {
		markRequired?: boolean;
		children?: Snippet;
	};

	const { markRequired } = $props<Props>();

	const { name, error } = getContext<FormFieldContext>('form-field');
</script>

<label
	for={name}
	class:required={markRequired}
	class="mb-2 block text-sm font-medium text-gray-900 {$error
		? 'text-red-500'
		: 'dark:text-gray-300'}">
	<slot />
</label>

<style>
	.required::after {
		content: '*';
		color: rgb(var(--color-danger-500));
		margin-left: 0.5rem;
		vertical-align: middle;
	}
</style>
