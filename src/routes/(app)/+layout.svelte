<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/core/Icon.svelte';
	import Header from '$lib/components/core/app/Header.svelte';
	import { mdiViewDashboard } from '@mdi/js';
	import clsx from 'clsx';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import '../../app.pcss';

	const { data } = $props();

	let expanded = $state(true);

	const railMenuItems = [
		{
			icon: mdiViewDashboard,
			text: 'Dashboard',
			path: '/'
		}
	];
</script>

<div class="flex h-screen w-full flex-col overflow-hidden">
	<Header user={data.user} />
	<div class="flex h-full w-full flex-auto overflow-hidden">
		{#if !$page.url.pathname.includes('/settings')}
			<aside
				transition:fly={{
					duration: 200,
					x: '-100%',
					opacity: 0.5,
					easing: quintOut
				}}
				class="hidden flex-none overflow-y-auto overflow-x-hidden bg-surface-100 shadow-xl dark:bg-surface-800 md:block lg:w-auto">
				<div
					class="grid h-full grid-cols-[auto_1fr] overflow-hidden lg:grid {clsx({
						'border-r border-surface-500/30': expanded
					})}">
					<div class="h-full w-20 gap-0 overflow-y-auto border-r border-surface-500/30">
						{#each railMenuItems as item}
							<a
								href={item.path}
								class="group flex aspect-square w-full flex-col items-stretch justify-center"
								tabindex="0">
								<div class="space-y-1 text-center">
									<div class="flex w-full justify-center">
										<Icon path={item.icon} class="group-hover:text-primary-500" />
									</div>
									<span class="text-xs group-hover:text-primary-500">{item.text}</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</aside>
		{/if}
		<div
			id="page"
			class="flex flex-1 flex-col overflow-x-hidden scroll-smooth"
			style="scrollbar-gutter: auto;">
			<main class="relative flex-auto p-5">
				<slot />
			</main>
		</div>
	</div>
</div>
