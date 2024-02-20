<script lang="ts">
	import { page } from '$app/stores';
	import Divider from '$lib/components/core/Divider.svelte';
	import NavigationLink from '$lib/components/core/NavigationLink.svelte';
	import Page from '$lib/components/core/app/Page.svelte';
	import clsx from 'clsx';

	const links = [
		{
			text: 'General',
			href: '/settings/general'
		},
		{
			text: 'Password',
			href: '/settings/password'
		},
		{
			text: 'Account',
			href: '/settings/account'
		}
	];
</script>

<div class="md:container">
	<Page>
		<section class="hidden md:block">
			<div class="flex items-center justify-between">Settings</div>
			<Divider />
		</section>
		<div
			class="mb-4 block overflow-x-auto overflow-y-hidden border-b border-gray-200 pb-1 dark:border-gray-700 md:hidden">
			<ul
				class="-mb-px flex flex-nowrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
				{#each links as link}
					<li class="me-2">
						<a
							href={link.href}
							class="group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-2 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 {clsx(
								{
									'border-blue-600 !text-blue-600 dark:border-blue-500 dark:text-blue-500':
										link.href == $page.url.pathname
								}
							)}">
							<svg
								class="me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path
									d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
							</svg>{link.text}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex flex-row gap-4">
			<div class="hidden w-3/12 flex-col md:flex">
				{#each links as link}
					<NavigationLink
						class="w-full rounded-md p-3"
						activeClass="bg-surface-100 dark:bg-surface-600"
						text={link.text}
						path={link.href}
						replace />
				{/each}
			</div>

			<div class="flex flex-1 flex-col">
				<slot />
			</div>
		</div>
	</Page>
</div>
