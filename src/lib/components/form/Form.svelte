<script lang="ts" generics="T extends ZodSchema">
	import { applyAction, enhance } from '$app/forms';
	import { cn } from '$lib/utils';
	import type { EaseForm, FormConfig } from '$lib/validation/types';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { writable } from 'svelte/store';
	import { ZodSchema } from 'zod';
	import type { Snippet } from 'svelte';

	type Props = {
		form: EaseForm<T>;
		class?: string;
		action?: string;
		onResult?: (result: ActionResult) => void;
		children?: Snippet<[any]>;
	};

	const { form, class: className, action, onResult } = $props<Props>();

	let loading = $state(false);
	let errors = $state<Record<string, any>>({});

	const handleSubmit: SubmitFunction = () => {
		if (loading) return;
		errors = {};
		loading = true;
		return ({ result }) => {
			if (result.type == 'success' || result.type == 'failure') {
				const responseForm = (<any>result.data).form;
				if (responseForm) {
					config.errors.set(responseForm.errors);
				}
				if (result.type == 'success' && form.options?.resetForm) {
					resetForm();
				} else if (result.type == 'failure') {
					errors = result.data ?? {};
				}
			}
			onResult && onResult(result);
			applyAction(result);
			loading = false;
		};
	};

	function resetForm() {
		form.data.set({});
	}

	const config: FormConfig<T> = {
		data: form.data,
		errors: writable({})
	} as FormConfig<T>;
</script>

<form use:enhance={handleSubmit} method="POST" {action} class={cn('w-full space-y-8', className)}>
	<slot {loading} {config} {errors} />
</form>
