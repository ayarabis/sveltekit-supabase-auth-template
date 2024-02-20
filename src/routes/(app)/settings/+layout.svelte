<script lang="ts">
	import NavigationLink from '$lib/components/core/NavigationLink.svelte';
	import Page from '$lib/components/core/app/Page.svelte';
</script>

<div class="container">
	<Page title="Account Settings">
		<div class="flex flex-row gap-4">
			<div class="flex w-3/12 flex-col">
				<NavigationLink
					class="w-full rounded-md p-3"
					activeClass="bg-surface-100 dark:bg-surface-600"
					text="General"
					path="/settings/general"
					replace />
				<NavigationLink
					class="w-full rounded-md p-3"
					activeClass="bg-surface-100 dark:bg-surface-600"
					text="Password"
					path="/settings/password"
					replace />
				<NavigationLink
					class="w-full rounded-md p-3"
					activeClass="bg-surface-100 dark:bg-surface-600"
					text="Account"
					path="/settings/account"
					replace />
			</div>
			<div class="flex flex-1 flex-col">
				<slot />
			</div>
		</div>
	</Page>
</div>
