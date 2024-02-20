<script lang="ts">
	import { popModal } from '$lib/modal';
	import { modals } from '$lib/store';
	import { cn } from '$lib/utils';
	import { mdiAlert, mdiChatQuestion, mdiClose, mdiInformation } from '@mdi/js';
	import { type Snippet } from 'svelte';
	import { quartInOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import Button from './Button.svelte';

	let show = $state(false);
	let backdrop: HTMLElement | null = $state(null);

	function handleAction(event: Event, action?: () => boolean | void) {
		const close = (action && action()) ?? true;
		close && popModal();
		event.preventDefault();
		event.stopPropagation();
	}

	function handleBackDropClick(e: Event) {
		if ((e.target as HTMLElement).classList.contains('backdrop'))
			modals.update((value) => {
				const active = value[value.length - 1];
				active.backdropClosable && value.pop();
				return value;
			});
	}

	modals.subscribe((value) => {
		if (value.length) show = true;
		else backdrop?.classList.add('!bg-opacity-0');
	});

	$effect(() => {
		backdrop?.addEventListener('click', handleBackDropClick);
	});

	function onModalClose() {
		if (!$modals.length) {
			show = false;
			backdrop?.classList.remove('!bg-opacity-0');
		}
	}
</script>

<div
	bind:this={backdrop}
	transition:fade={{ duration: 200 }}
	class:hidden={!show}
	class:bg-opacity-50={show}
	class="backdrop sh-full fixed z-20 flex h-full w-full items-center justify-center bg-black transition-all">
	{#each $modals as modal, i (modal)}
		<div
			transition:scale={{ duration: 200, start: 0, easing: quartInOut }}
			on:outroend={onModalClose}
			tabindex="-1"
			class={cn(' h-min w-auto max-w-[90%]  overflow-y-auto overflow-x-hidden', modal.class)}>
			{#if i != $modals.length - 1}
				<!-- overlay for multi level modal -->
				<div
					transition:fade={{ duration: 200 }}
					class="overlay absolute z-20 h-full w-full rounded-lg bg-black bg-opacity-50">
				</div>
			{/if}
			{#if modal.type == 'custom'}
				<!-- Custom modal content -->
				<div class="card">
					<div class="flex justify-between border-b-[1px] border-b-gray-300 border-opacity-20 p-2">
						<h4>
							{#if modal.title}
								{modal.title}
							{/if}
						</h4>
						{#if !modal.noCloseButton}
							<button onclick={popModal}>
								<Icon path={mdiClose} />
							</button>
						{/if}
					</div>
					<div class="p-2">
						{#if typeof modal.content == 'string'}
							{@html modal.content}
						{:else}
							{@const     content = modal.content as Snippet<[any]>}
							{@render content(modal.data)}
						{/if}
					</div>
				</div>
			{:else}
				{@const onPositive = modal.onPositive}
				{@const onNegative = modal.onNegative}
				<!-- Modal content -->
				<div class="relative rounded-lg bg-white shadow-lg dark:bg-surface-700">
					<!-- Modal header -->
					<div
						class="flex items-center justify-between rounded-t border-b p-4 dark:border-surface-600 md:p-5">
						<h3 class="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
							{#if modal.type == 'info'}
								<Icon path={mdiInformation} class="text-primary-500" />
							{:else if modal.type == 'confirm'}
								<Icon path={mdiChatQuestion} class="text-secondary-500" />
							{:else if modal.type == 'alert'}
								<Icon path={mdiAlert} class="text-warning-500" />
							{:else if modal.type == 'error'}
								<Icon path={mdiAlert} class="text-danger-500" />
							{/if}
							<span class="text-nowrap">{modal.title}</span>
						</h3>
						{#if !modal.noCloseButton}
							<button
								onclick={popModal}
								type="button"
								class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
								<svg
									class="h-3 w-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14">
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						{/if}
					</div>
					{#if modal.content}
						<!-- Modal body -->
						<div class="space-y-4 p-4 md:p-5">
							{#if typeof modal.content == 'string'}
								{@html modal.content}
							{:else}
								{@const    content = modal.content as Snippet}
								{@render content()}
							{/if}
						</div>
					{/if}
					<!-- Modal footer -->
					<div
						class="flex items-center justify-end gap-3 rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
						{#if modal.type == 'confirm'}
							<Button onclick={(e) => handleAction(e, onNegative)} type="button" color="neutral"
								>{modal.negativeText ?? 'Cancel'}</Button>
						{/if}
						<Button onclick={(e) => handleAction(e, onPositive)} type="button" color="primary"
							>{modal.positiveText ?? 'Ok'}</Button>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
