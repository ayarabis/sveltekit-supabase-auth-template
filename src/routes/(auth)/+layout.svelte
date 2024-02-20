<script lang="ts">
	import '../../app.pcss';
</script>

<slot />

<style>
	:global(body) {
		background-image: url('/wave.svg');
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
