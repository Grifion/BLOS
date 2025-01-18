import { TaskFilter, TaskType } from "../types";

export const getCount = (tasks: TaskType[], filter: TaskFilter): number => {
	return tasks.filter((task: TaskType) => {
		const subtasks = task.subtasks || [];

		switch (filter) {
			case TaskFilter.completed:
				return subtasks.length > 0 && subtasks.every((subtask) => subtask.completed);

			case TaskFilter.uncompleted:
				return subtasks.length > 0 && !subtasks.every((subtask) => subtask.completed);

			case TaskFilter.inProgres:
				return (
					subtasks.length > 0 &&
					subtasks.some((subtask) => subtask.completed) &&
					subtasks.some((subtask) => !subtask.completed)
				);

			case TaskFilter.empty:
				return subtasks.length === 0;

			default:
				return false;
		}
	}).length;
};

export const getPriority = (tasks: TaskType[], filter: TaskFilter): number => {
	return tasks.filter((task: TaskType) => {
		const priority = task.priority || 0;

		switch (filter) {
			case TaskFilter.highPriority:
				return priority >= 8 && priority <= 10;

			case TaskFilter.mediumPriority:
				return priority >= 4 && priority <= 7;

			case TaskFilter.lowPriority:
				return priority >= 1 && priority <= 3;

			default:
				return false;
		}
	}).length;
};
