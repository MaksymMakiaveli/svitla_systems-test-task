export enum TASK_STATUS {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED'
}

export type TaskEntity = {
	id: string;

	title: string;

	description: string;

	status: TASK_STATUS;

	createdAt: string;

	updatedAt: string;
};
