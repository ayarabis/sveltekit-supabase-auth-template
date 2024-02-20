<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/core/Button.svelte';
	import LoadingPane from '$lib/components/core/LoadingPane.svelte';
	import * as Form from '$lib/components/form';
	import { easeForm } from '$lib/validation/index.js';

	const { data } = $props();

	const form = easeForm(data.form, {
		resetForm: true
	});
</script>

<section class="relative h-full overflow-x-auto">
	<div class="wrapper grid h-full grid-cols-1 items-center justify-center lg:grid-cols-2">
		<div class="hidden h-full items-center justify-center p-10 lg:flex">
			<div
				class="drop-shadow-full flex aspect-square w-full max-w-[600px] items-center justify-center rounded-lg bg-gray-300/20 shadow-md">
				<img src="/undraw_images_re_0kll.svg" class=" w-40" alt="Placeholder" />
			</div>
		</div>
		<div class="flex items-center justify-center">
			<Form.Root
				{form}
				class="relative w-11/12 space-y-0 rounded-lg bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-surface-900 sm:p-8 md:w-10/12 lg:w-8/12"
				let:config
				let:loading
				let:errors>
				<LoadingPane show={loading} />
				<div class="space-y-4 md:space-y-3">
					<a
						href="/home"
						class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
						Easephare
					</a>
					<h1
						class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
						Sign in to your account
					</h1>
					{#if errors.message}
						<Alert type="error" dismissable>Login failed... try again.</Alert>
					{/if}
					<Form.Group>
						<Form.Field {config} name="email">
							<Form.Label>Your Email</Form.Label>
							<Form.Input placeholder="name@email.com" />
							<Form.ValidationError />
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field {config} name="password">
							<Form.Label>Password</Form.Label>
							<Form.Input type="password" placeholder="••••••••" />
							<Form.ValidationError />
						</Form.Field>
					</Form.Group>
					<div class="flex items-center justify-between">
						<div class="flex items-start">
							<div class="flex h-5 items-center">
								<input
									id="remember"
									aria-describedby="remember"
									type="checkbox"
									class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
							</div>
							<div class="ml-3 text-sm">
								<label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
							</div>
						</div>
					</div>
					<Button type="submit" color="primary" class="w-full" size="lg">Sign in</Button>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Don’t have an account yet? <a
							href="/auth/register"
							data-sveltekit-reload
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Register</a>
					</p>
				</div>
			</Form.Root>
		</div>
	</div>
</section>
