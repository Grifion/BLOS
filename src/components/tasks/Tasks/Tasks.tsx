import React, { useEffect } from "react";
import { Task } from "../Task";
import "./Tasks.scss";
import {
  changeTaskPriorityApi,
  deleteTaskApi,
  fetchTasks,
} from "../../../api/taskApi";
import { TaskType } from "../../../types";

type Props = {
  newTaskVisible: boolean;
  deleteVisible: boolean;
  setIsSaving: (saving: boolean) => void;
  addNewTask: () => void; // Add new task function passed from parent
  tasks: TaskType[]; // Tasks state passed from parent
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>; // setTasks function passed from parent
  priorityVisible: boolean;
};

export const Tasks: React.FC<Props> = ({
  newTaskVisible,
  setIsSaving,
  deleteVisible,
  addNewTask,
  tasks,
  setTasks,
  priorityVisible,
}) => {
  const deleteTask = async (id: string) => {
    try {
      await deleteTaskApi(id); // Call API to delete task
      setTasks((prev) => prev.filter((e: TaskType) => e.id !== id)); // Remove task from state
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const changeTaskPriority = async (id: string, newPriority: number) => {
    if (newPriority < 1 || newPriority > 10) {
      console.error("Priority must be between 1 and 10");
      return;
    }

    try {
      await changeTaskPriorityApi(id, newPriority); // Call API to update priority

      // Update local state with new priority
      setTasks((prev) =>
        prev.map((task: TaskType) =>
          task.id === id ? { ...task, priority: newPriority } : task
        )
      );
    } catch (error) {
      console.error("Failed to change task priority", error);
    }
  };

  // Fetch the tasks on initial load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, [setTasks]);

  // Trigger adding the task when newTaskVisible changes to true
  useEffect(() => {
    if (newTaskVisible) {
      addNewTask();
    }
  }, [newTaskVisible, addNewTask]);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          setData={setTasks} // Pass setData function here
          setSaving={setIsSaving}
          deleteVisible={deleteVisible}
          deleteTask={deleteTask}
          priorityVisible={priorityVisible}
          changeTaskPriority={changeTaskPriority}
        />
      ))}
    </div>
  );
};
