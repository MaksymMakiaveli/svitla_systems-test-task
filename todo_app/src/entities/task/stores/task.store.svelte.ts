import { generateId } from '@/shared/utils/common';
import { TASK_STATUS, type TaskEntity } from '../lib/types';

const STORAGE_KEY = 'tasks_store';

let tasksStore = $state<TaskEntity[]>([]);

type CreateTaskPayload = {
	title: string;
};

type UpdateTaskPayload = {
	id: string;

	title?: string;

	description?: string;

	status?: TASK_STATUS;
};

export const useTaskStore = () => {
	const create = (payload: CreateTaskPayload) => {
		const date = new Date().toISOString();
		const task: TaskEntity = {
			id: generateId(),
			title: payload.title,
			description: '',
			status: TASK_STATUS.TODO,
			createdAt: date,
			updatedAt: date
		};

		tasksStore.push(task);
	};

	const update = (payload: UpdateTaskPayload) => {
		const { id, ...rest } = payload;
		tasksStore = tasksStore.map((task) => {
			if (task.id !== id) return task;

			return {
				...task,
				...rest,
				updatedAt: new Date().toISOString()
			};
		});
	};

	const remove = (id: string) => {
		tasksStore = tasksStore.filter((task) => task.id !== id);
	};

	$effect(() => {
		const storageValue = localStorage.getItem(STORAGE_KEY);

		if (storageValue) tasksStore = JSON.parse(storageValue) as TaskEntity[];
	});

	$effect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksStore));
	});

	return {
		get tasks() {
			return tasksStore;
		},
		createTask: create,
		updateTask: update,
		removeTask: remove
	} as const;
};
