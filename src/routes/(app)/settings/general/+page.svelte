<script lang="ts">
	import AvatarPicker from '$lib/components/AvatarPicker.svelte';

	const { data } = $props();
	const { user } = data;

	const fullName = user.user_metadata.full_name;
	const avatar =
		user.user_metadata.avatar ??
		`https://ui-avatars.com/api/?name=${fullName}&background=0D8ABC&color=fff`;
</script>

<div class="w-full rounded-md outline outline-1 outline-gray-300">
	<div class="flex justify-between p-5">
		<div>
			<h3 class="mb-3 text-xl font-semibold">Avatar</h3>
			<p class="text-sm">
				This is your avatar.<br />
				Click on the avatar to upload a custom one from your files.
			</p>
		</div>

		<AvatarPicker value={avatar} />
	</div>
	<div class="bg-surface-100/50 p-3 text-sm text-gray-500 dark:bg-surface-50/10 dark:text-gray-100">
		An avatar is optional but strongly recommended.
	</div>
</div>
