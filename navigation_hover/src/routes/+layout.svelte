<script lang="ts">
	import '@/assets/css/root.css';

	let { children } = $props();
</script>

<div class="flex size-full flex-col">
	{@render children()}
</div>
