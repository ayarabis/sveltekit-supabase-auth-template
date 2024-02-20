<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/core/Button.svelte';
	import Icon from '$lib/components/core/Icon.svelte';
	import LoadingPane from '$lib/components/core/LoadingPane.svelte';
	import * as Form from '$lib/components/form';
	import { pushModal } from '$lib/modal.js';
	import { easeForm } from '$lib/validation/index.js';
	import { mdiGmail, mdiMicrosoftOutlook, mdiYahoo } from '@mdi/js';
	import type { ActionResult } from '@sveltejs/kit';

	const { data } = $props();

	const form = easeForm(data.form, {
		resetForm: true
	});

	function onResult(result: ActionResult) {
		if (result.type == 'success' && result.status == 200) {
			pushModal({
				type: 'info',
				title: 'Registration Successful',
				content: registrationComplete,
				class: 'min-w-96',
				onPositive() {
					goto('/auth/login');
				}
			});
		}
		if (result.type == 'error' && result.status == 500) {
			pushModal({
				type: 'error',
				title: 'Error occured',
				content: result.error.message,
				class: 'min-w-96'
			});
		}
	}
</script>

{#snippet registrationComplete()}
	<p>
		Registration successful! A verification email has been sent to your email address. Please check
		your inbox and follow the instructions to activate your account.
	</p>
	<div class="flex flex-wrap justify-center gap-3">
		<a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
			<Button color="secondary" to="https://mail.google.com/mail/u/0/#inbox"
				><Icon path={mdiGmail} /></Button>
		</a>
		<a href="https://outlook.office365.com/mail/" target="_blank">
			<Button color="secondary" to="https://outlook.office365.com/mail/"
				><Icon path={mdiMicrosoftOutlook} /></Button>
		</a>
		<a href="https://mail.yahoo.com/" target="_blank">
			<Button color="secondary" to="https://mail.yahoo.com/"><Icon path={mdiYahoo} /></Button>
		</a>
	</div>
{/snippet}
<section class="relative h-full overflow-x-auto">
	<div class="wrapper grid h-screen grid-cols-1 items-center justify-center lg:grid-cols-2">
		<div class="flex items-start justify-center">
			<Form.Root
				{form}
				{onResult}
				class="relative w-11/12 space-y-0 rounded-lg bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-surface-900 sm:p-8 md:w-10/12  lg:w-8/12"
				let:config
				let:loading>
				<LoadingPane show={loading} />
				<div class="space-y-4 md:space-y-3">
					<a
						href="/home"
						class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
						Easephare
					</a>
					<h1
						class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
						Create your account
					</h1>

					<Form.Group>
						<Form.Field {config} name="email">
							<Form.Label markRequired>Your Email</Form.Label>
							<Form.Input placeholder="name@email.com" />
							<Form.ValidationError />
						</Form.Field>
					</Form.Group>
					<div class="flex gap-2">
						<Form.Group class="flex-1">
							<Form.Field {config} name="first_name">
								<Form.Label markRequired>Firstname</Form.Label>
								<Form.Input placeholder="John" />
								<Form.ValidationError />
							</Form.Field>
						</Form.Group>
						<Form.Group class="flex-1">
							<Form.Field {config} name="last_name">
								<Form.Label markRequired>Lastname</Form.Label>
								<Form.Input placeholder="Doe" />
								<Form.ValidationError />
							</Form.Field>
						</Form.Group>
					</div>
					<Form.Group>
						<Form.Field {config} name="company">
							<Form.Label>Company</Form.Label>
							<Form.Input placeholder="ABC" />
							<Form.ValidationError />
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field {config} name="password">
							<Form.Label markRequired>Password</Form.Label>
							<Form.Input type="password" placeholder="••••••••" />
							<Form.ValidationError />
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field {config} name="confirm_password">
							<Form.Label markRequired>Confirm Password</Form.Label>
							<Form.Input type="password" placeholder="••••••••" />
							<Form.ValidationError />
						</Form.Field>
					</Form.Group>
					<Button
						type="submit"
						color="primary"
						class="w-full text-center"
						disabled={loading}
						size="lg">Continue</Button>
					<div class="flex items-center justify-between"></div>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Already have an account? <a
							href="/auth/login"
							data-sveltekit-reload
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
					</p>
				</div>
			</Form.Root>
		</div>
		<div class="hidden h-full items-center justify-center p-10 lg:flex">
			<div
				class="drop-shadow-full flex aspect-square w-full max-w-[600px] items-center justify-center rounded-lg bg-gray-300/20 shadow-md">
				<img src="/undraw_images_re_0kll.svg" class=" w-40" alt="Placeholder" />
			</div>
		</div>
	</div>
</section>
