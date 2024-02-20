<script>
	import Button from '$lib/components/core/Button.svelte';
	import Icon from '$lib/components/core/Icon.svelte';
	import LoadingPane from '$lib/components/core/LoadingPane.svelte';
	import Modal from '$lib/components/core/Modal.svelte';
	import * as Form from '$lib/components/form/index';
	import { easeForm } from '$lib/validation';
	import { mdiAlert } from '@mdi/js';

	const { data } = $props();
	const form = easeForm(data.form);
	const fd = form.data;

	const confirmationText = 'delete my account';
</script>

<div class="w-full rounded-md outline outline-1 outline-red-300">
	<div class="flex justify-between p-5">
		<div>
			<h3 class="mb-3 text-xl font-semibold text-danger-500">Delete Account</h3>
			<p class="text-sm">
				Once you delete your account, there is no going back. Please be certain.
			</p>
		</div>
	</div>
	<div
		class="flex justify-end bg-surface-100/50 p-3 text-sm text-gray-500 dark:bg-surface-50/10 dark:text-gray-100">
		<Modal title="Are you sure you want to do this?" class="w-96" let:trigger>
			<button use:trigger class="button danger">Delete your account</button>
			{#snippet content()}
				<div class="flex items-center gap-2 bg-danger-400/20 p-3 outline-1 outline-red-500">
					<Icon path={mdiAlert} size="1rem" class="text-red-300" />
					This is extremely important.
				</div>
				<Form.Root action="?/deleteAccount" {form} let:config let:loading class="space-y-0">
					<LoadingPane show={loading} />
					<div class="space-y-5 p-5">
						<p>
							Are you sure you want to delete your account? This action is irreversible, and all
							your data will be permanently lost.
						</p>
						<Form.Group>
							<Form.Field {config} name="confirm_text">
								<Form.Label
									>To verify, type <span class="confirm-text">delete my account</span> below:</Form.Label>
								<Form.Input required />
								<Form.ValidationError />
							</Form.Field>
						</Form.Group>
						<Form.Group>
							<Form.Field {config} name="password">
								<Form.Label>Confirm your password:</Form.Label>
								<Form.Input type="password" required />
								<Form.ValidationError />
							</Form.Field>
						</Form.Group>
					</div>
					<div class="flex justify-end">
						<Button
							disabled={$fd.confirm_text != confirmationText || !$fd.password}
							color="danger"
							class="w-full">Delete this account</Button>
					</div>
				</Form.Root>
			{/snippet}
		</Modal>
	</div>
</div>

<style>
	.confirm-text {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		font-weight: bold;
	}
</style>
