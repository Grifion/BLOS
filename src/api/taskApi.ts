// api/tasksApi.ts

import { TaskType } from "../../types";

// Fetch all tasks
export const fetchTasks = async (): Promise<TaskType[]> => {
  const response = await fetch("http://localhost:2001/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

// Add a new task
export const addTask = async (task: TaskType): Promise<TaskType> => {
  const response = await fetch("http://localhost:2001/tasks", {
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
  const response = await fetch(`http://localhost:2001/tasks/${task.id}`, {
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
  const response = await fetch(`http://localhost:2001/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};


