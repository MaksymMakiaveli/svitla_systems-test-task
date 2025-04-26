<script lang="ts">
	import logo from '@/assets/images/logo.png';

	import type { Action } from 'svelte/action';

	const cardAction: Action = (node) => {
		if (!node) return;

		function handleMouseMove(event: MouseEvent) {
			requestAnimationFrame(() => {
				if (!node) return;
				const cardRect = node.getBoundingClientRect();
				const cardX = cardRect.left + cardRect.width / 2;
				const cardY = cardRect.top + cardRect.height / 2;
				const angleX = (event.clientY - cardY) / 10;
				const angleY = (event.clientX - cardX) / -10;

				node.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
				node.style.boxShadow = `${angleY * 2}px ${angleX * 2}px 30px rgba(0, 0, 0, 0.3)`;
			});
		}

		function handleMouseLeave() {
			if (!node) return;
			node.style.transform = `rotateX(0deg) rotateY(0deg)`;
			node.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.1)`;
		}

		$effect(() => {
			if (!node) return;
			node.addEventListener('mousemove', handleMouseMove);
			node.addEventListener('mouseleave', handleMouseLeave);

			return () => {
				node.removeEventListener('mousemove', handleMouseMove);
				node.removeEventListener('mouseleave', handleMouseLeave);
			};
		});
	};
</script>

<section class="h-full">
	<div class="perspective-distant flex size-full flex-col items-center justify-center">
		<div
			use:cardAction
			class="shadow-card size-110 rounded-140 transform-3d relative flex flex-col items-center justify-center overflow-hidden bg-white px-14 py-20 text-center transition-all duration-100"
		>
			<div class="translate-z-5 relative flex flex-col items-center justify-center gap-10 overflow-hidden">
				<div class="shrink-1 flex items-center justify-center overflow-hidden">
					<img src={logo} alt="Bing" class="size-full object-contain" />
				</div>
				<h2 class="text-primary shrink-0 grow text-4xl font-light">Bing</h2>
			</div>
		</div>
	</div>
</section>
