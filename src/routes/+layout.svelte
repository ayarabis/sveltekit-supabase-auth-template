<script lang="ts">
	import { invalidate } from '$app/navigation';
	import ModalView from '$lib/components/core/ModalView.svelte';

	const { data } = $props();
	const { supabase, session } = $derived(data);

	$effect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<ModalView />
<slot />
