<script lang="ts">
	import type { IconProps } from './types';

	let { width = 15, height = 15, ...props }: IconProps = $props();
</script>

<svg {width} {height} viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M7.4999 9.31827L12.9547 14.7731L14.773 12.9548L9.31817 7.5L14.773 2.04518L12.9547 0.226901L7.49989 5.68173L2.04507 0.226902L0.226796 2.04518L5.68162 7.5L0.226797 12.9548L2.04507 14.7731L7.4999 9.31827ZM7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z"
		fill="currentColor"
	/>
	<path d="M7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z" fill="currentColor" />
</svg>
