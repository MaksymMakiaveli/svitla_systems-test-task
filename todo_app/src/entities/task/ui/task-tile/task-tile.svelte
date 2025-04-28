<script lang="ts" module>
	import { IconCheckmark, IconCross, IconSpinner } from '@/assets/images/icons';
	import { TASK_STATUS } from '@/entities/task/lib/types';
	import { cn } from '@/shared/utils/common';
	import type { Snippet } from 'svelte';

	export type TaskTileProps = {
		title: string;

		status: TASK_STATUS;

		action?: Snippet;

		class?: string;

		onStatusClick?: () => void;
	};

	const STATUS_ICON_MAP = {
		[TASK_STATUS.COMPLETED]: IconCheckmark,
		[TASK_STATUS.IN_PROGRESS]: IconSpinner,
		[TASK_STATUS.TODO]: IconCross
	};
</script>

<script lang="ts">
	let { title, status, class: className, onStatusClick, action }: TaskTileProps = $props();

	const Icon = $derived(STATUS_ICON_MAP[status]);
</script>

<div
	class={cn(
		'flex w-full items-center gap-3.5 overflow-hidden rounded-2xl p-3.5 transition-all duration-300',
		{
			'bg-accent-green/10 text-accent-green': status === TASK_STATUS.COMPLETED,
			'bg-accent-yellow/10 text-accent-yellow': status === TASK_STATUS.IN_PROGRESS,
			'bg-primary/5 text-primary': status === TASK_STATUS.TODO
		},
		className
	)}
>
	<button
		onclick={onStatusClick}
		class={cn(
			'flex size-8.5 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-all duration-300',
			{
				'bg-accent-green/80 text-white': status === TASK_STATUS.COMPLETED,
				'bg-accent-yellow/80 text-white': status === TASK_STATUS.IN_PROGRESS,
				'bg-primary/10 text-primary/25': status === TASK_STATUS.TODO
			}
		)}
	>
		<Icon
			class={cn({
				'animate-spin': status === TASK_STATUS.IN_PROGRESS
			})}
		/>
	</button>

	<div class="flex grow items-center justify-between truncate">
		<p class="w-full shrink truncate pr-2">{title}</p>

		{@render action?.()}
	</div>
</div>
