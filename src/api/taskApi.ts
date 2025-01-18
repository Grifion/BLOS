import { TaskType } from "../types";

export const serverLink = 'http://localhost:2001/tasks'

import { NoteType } from "../types";

export const updateNote = async (
  id: string,
  updatedFields: Partial<NoteType>
): Promise<NoteType> => {
  const response = await fetch(`${serverLink}/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return response.json();
};


// Fetch all tasks
export const fetchTasks = async (): Promise<TaskType[]> => {
  const response = await fetch(serverLink);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

// Add a new task
export const addTask = async (task: TaskType): Promise<TaskType> => {
  const response = await fetch(serverLink, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return response.json();
};

export const updateTask = async (task: TaskType): Promise<TaskType> => {
  const response = await fetch(`${serverLink}${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  const response = await fetch(`${serverLink}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};

export const changeTaskPriorityApi = async (
  id: string,
  newPriority: number
): Promise<void> => {
  const response = await fetch(`${serverLink}/${id}/priority`, {
    method: "PATCH", // PATCH is suitable for partial updates
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ priority: newPriority }), // Pass the new priority
  });

  if (!response.ok) {
    throw new Error("Failed to change task priority");
  }
};

