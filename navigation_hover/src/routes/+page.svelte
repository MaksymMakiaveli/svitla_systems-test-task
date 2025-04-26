<script lang="ts">
	import { untrack } from 'svelte';

	const NAV_ITEMS = [
		{
			id: 'animation',
			label: 'Animation',
			href: '/'
		},
		{
			id: 'branding',
			label: 'Branding',
			href: '/'
		},
		{
			id: 'illustration',
			label: 'Illustration',
			href: '/'
		}
	];

	let indicatorNode = $state<HTMLElement | null>(null);
	let listNode = $state<HTMLElement | null>(null);
	let activeLinkId = $state(NAV_ITEMS[0].id);

	const updateIndicator = (activeLink: HTMLElement) => {
		if (!indicatorNode) return;

		const [linkWidth, linkLeft] = [activeLink.offsetWidth, activeLink.offsetLeft];
		const indicatorWidth = linkWidth / 2;
		const indicatorLeft = linkLeft + linkWidth / 2 - indicatorWidth / 2;
		indicatorNode.style.transform = `translateX(${indicatorLeft}px)`;
		indicatorNode.style.width = `${indicatorWidth}px`;

		if (indicatorNode.classList.contains('hidden')) {
			indicatorNode.classList.remove('hidden');
		}
	};

	const onUpdateActiveLinkId = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		const element = target.closest('[data-id]') as HTMLElement;

		if (!element) return;

		const id = element.getAttribute('data-id');

		if (!id) return;

		activeLinkId = id;

		if (!indicatorNode) return;

		updateIndicator(element);
	};

	$effect(() => {
		if (!listNode || !indicatorNode) return;

		untrack(() => {
			const list = listNode as HTMLElement;
			const activeLink = Array.from(list.children).find(
				(child) => child.getAttribute('data-active') === 'true'
			) as HTMLElement;

			if (!activeLink) return;

			updateIndicator(activeLink);
		});
	});
</script>

<section class="size-full grow">
	<div class="flex size-full flex-col items-center justify-center">
		<ul bind:this={listNode} onclick={onUpdateActiveLinkId} class="md:gap-26 relative flex items-center gap-8">
			{#each NAV_ITEMS as item (item.label)}
				<li
					data-id={item.id}
					data-active={activeLinkId === item.id}
					class="text-fg-inactive duration-400 px-2 py-1 text-xl font-bold transition-colors data-[active=true]:text-white md:text-2xl"
				>
					<a href={item.href}>{item.label}</a>
				</li>
			{/each}
			<li
				bind:this={indicatorNode}
				class="absolute inset-x-0 -bottom-1 hidden h-1 rounded-full bg-white transition-all duration-300"
			></li>
		</ul>
	</div>
</section>
