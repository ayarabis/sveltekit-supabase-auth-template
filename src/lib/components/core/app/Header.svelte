<script lang="ts">
	import { type User } from '@supabase/gotrue-js';
	import LightSwitch from '../LightSwitch.svelte';
	import NavigationLink from '../NavigationLink.svelte';
	import Popover from '../Popover.svelte';

	type Props = {
		user: User;
	};

	const { user } = $props<Props>();
	const fullName = user.user_metadata.full_name;
</script>

<header class="z-10 flex-none bg-surface-100 shadow-md dark:bg-surface-900">
	<div class="flex flex-col space-y-4 p-4" role="toolbar" aria-label="" aria-labelledby="">
		<div class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
			<div class="flex flex-none items-center justify-between">
				<div class="flex items-center space-x-4">
					<a href="/">
						<img class="logo" src="/logo-white-shadow.png" width="40" height="40" alt="logo" />
					</a>
					<strong class="ml-3 text-xl uppercase dark:text-white">Easephare</strong>
				</div>
			</div>
			<div class="flex-auto"></div>
			<div class="flex flex-none items-center space-x-4">
				<LightSwitch />
				<div class="hidden items-center gap-10 md:flex">{user.email}</div>
				<Popover>
					{#snippet trigger(popper)}
						<button use:popper aria-label="Menu">
							<div
								class="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-primary-400 to-primary-600 shadow-md">
								<img
									class="w- h-full max-w-max rounded-full"
									src={user.user_metadata.avatar ??
										`https://ui-avatars.com/api/?name=${fullName}&background=0D8ABC&color=fff`}
									alt="Rounded Avatar" />
							</div>
						</button>
					{/snippet}
					<div class="flex min-w-28 flex-col py-2">
						<NavigationLink class="p-3" text="Home" path="/" exact />
						<NavigationLink class="p-3" text="Settings" path="/settings/general" />
						<NavigationLink class="p-3" text="Logout" path="/auth/logout" />
					</div>
				</Popover>
			</div>
		</div>
	</div>
</header>
