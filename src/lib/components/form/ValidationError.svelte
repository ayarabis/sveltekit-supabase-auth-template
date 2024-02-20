<script lang="ts">
	import type { FormFieldContext } from '$lib/form';
	import { getContext } from 'svelte';

	const { error } = getContext<FormFieldContext>('form-field');
</script>

{#if $error}
	<span class="text-sm text-danger-500">{$error}</span>
{/if}
