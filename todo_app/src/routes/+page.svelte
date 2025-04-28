<script lang="ts">
	import { IconCross, IconTrash } from '@/assets/images/icons';
	import { TASK_STATUS, type TaskEntity } from '@/entities/task/lib/types';
	import { useTaskStore } from '@/entities/task/stores/task.store.svelte';
	import { TaskTile } from '@/entities/task/ui/task-tile';
	import { slide } from 'svelte/transition';

	let taskTitle = $state('');

	const store = useTaskStore();

	const onSubmit = (event: Event) => {
		event.preventDefault();

		if (!taskTitle) return;

		store.createTask({ title: taskTitle });

		taskTitle = '';
	};

	const onClickTrash = (event: MouseEvent, id: string) => {
		event.stopPropagation();

		store.removeTask(id);
	};

	const onStatusClick = (task: TaskEntity) => {
		let status = task.status;

		switch (status) {
			case TASK_STATUS.TODO:
				status = TASK_STATUS.IN_PROGRESS;
				break;
			case TASK_STATUS.IN_PROGRESS:
				status = TASK_STATUS.COMPLETED;
				break;
			case TASK_STATUS.COMPLETED:
				break;
		}

		store.updateTask({
			id: task.id,
			status
		});
	};
</script>

<section class="flex h-full flex-col">
	<div class="flex h-full flex-col items-center px-4 py-10">
		<div class="shadow-list rounded-44 relative flex max-h-full w-full max-w-125 flex-col bg-white p-11">
			<div class="flex flex-col gap-2">
				<h2 class="text-4xl font-bold">ToDo List</h2>
				<p class="text-primary/50 text-lg font-bold">Here you can add, edit and delete your tasks</p>
			</div>

			<div class="shrink overflow-auto pt-5">
				<ul class="flex flex-col gap-2.5">
					{#each store.tasks as task (task.id)}
						<li class="group" in:slide={{ axis: 'y', duration: 500 }} out:slide={{ axis: 'x' }}>
							<TaskTile
								onStatusClick={() => onStatusClick(task)}
								class="relative pr-8"
								title={task.title}
								status={task.status}
							>
								{#snippet action()}
									<button
										onclick={(event) => onClickTrash(event, task.id)}
										class="text-accent-red absolute -right-6 z-1 cursor-pointer transition-all group-hover:right-2"
									>
										<IconTrash />
									</button>
								{/snippet}
							</TaskTile>
						</li>
					{/each}
				</ul>
			</div>

			<form onsubmit={onSubmit} class="pt-3">
				<div class="border-primary/10 relative flex border-b py-1.5">
					<input
						bind:value={taskTitle}
						type="text"
						placeholder="Your task here..."
						class="w-full border-none p-0 pr-8 text-lg font-bold ring-0 outline-none focus:outline-none"
					/>
					<button
						type="submit"
						class="bg-accent-green/80 absolute top-1/2 right-0 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg p-1.5 text-white"
					>
						<IconCross class="relative rotate-45" />
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
