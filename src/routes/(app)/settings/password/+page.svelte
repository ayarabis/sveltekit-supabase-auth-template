<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import * as Form from '$lib/components/form/index';
	import { pushModal } from '$lib/modal';
	import { easeForm } from '$lib/validation';
	import type { ActionResult } from '@sveltejs/kit';

	const { data } = $props();

	const form = easeForm(data.form, {
		resetForm: true
	});

	function onResult(result: ActionResult) {
		if (result.type == 'success') {
			if (result.status == 200) {
				pushModal({
					type: 'info',
					title: 'Password Updated Successfully',
					content: result.data?.message
				});
			}
		}
		if (result.type == 'error' && result.status == 403) {
			pushModal({
				type: 'alert',
				title: 'Old Password Incorrect',
				content: result.error.message
			});
		}
	}
</script>

<Form.Root action="?/updatePassword" {onResult} {form} let:config let:loading class="space-y-0">
	<div class="w-full rounded-md outline outline-1 outline-gray-300">
		<div class="flex justify-between p-5">
			<div class="space-y-2">
				<h3 class="mb-3 text-xl font-semibold">
					{data.hasPassword ? 'Change' : 'Create'} password
				</h3>
				{#if data.hasPassword}
					<Form.Group>
						<Form.Field {config} name="old_password">
							<Form.Label>Old Password</Form.Label>
							<Form.Input type="password" autocomplete="new-password" />
							<Form.ValidationError />
						</Form.Field>
					</Form.Group>
				{/if}
				<Form.Group>
					<Form.Field {config} name="password">
						<Form.Label>{data.hasPassword ? 'New' : ''} Password</Form.Label>
						<Form.Input type="password" autocomplete="new-password" />
						<Form.ValidationError />
					</Form.Field>
				</Form.Group>
				<Form.Group>
					<Form.Field {config} name="confirm_password">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Input type="password" autocomplete="new-password" />
						<Form.ValidationError />
					</Form.Field>
				</Form.Group>
			</div>
		</div>
		<div
			class="flex justify-end bg-surface-100/50 p-3 text-sm text-gray-500 dark:bg-surface-50/10 dark:text-gray-100">
			<Button type="submit" color="primary" disabled={loading}
				>{data.hasPassword ? 'Update' : 'Create'} password</Button>
		</div>
	</div>
</Form.Root>
