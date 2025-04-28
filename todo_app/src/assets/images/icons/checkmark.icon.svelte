<script lang="ts">
	import type { IconProps } from './types';

	let { width = 19, height = 14, ...props }: IconProps = $props();
</script>

<svg {width} {height} viewBox="0 0 19 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M7.25 9.25L16.25 0.25L18.5 2.5L9.5 11.5L7.25 9.25ZM5 11.5L7.25 9.25L2.75 4.75L0.5 7L5 11.5Z"
	/>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M7.25 9.25L16.25 0.25L18.5 2.5L9.5 11.5L7.25 9.25ZM5 11.5L7.25 9.25L2.75 4.75L0.5 7L5 11.5Z"
	/>
	<path d="M5 11.5L7.25 13.75L9.5 11.5L7.25 9.25L5 11.5Z" />
	<path d="M5 11.5L7.25 13.75L9.5 11.5L7.25 9.25L5 11.5Z" />
</svg>
