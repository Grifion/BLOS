import React, { useEffect } from "react";
import { Task } from "../Task";
import "./TaskList.scss";
import { TaskType } from "../../../../types";
import { deleteTaskApi, fetchTasks } from "../../../api/taskApi";

type Props = {
  newTaskVisible: boolean;
  deleteVisible: boolean;
  setIsSaving: (saving: boolean) => void;
  addNewTask: () => void; // Add new task function passed from parent
  tasks: TaskType[]; // Tasks state passed from parent
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>; // setTasks function passed from parent
};

export const TaskList: React.FC<Props> = ({
  newTaskVisible,
  setIsSaving,
  deleteVisible,
  addNewTask,
  tasks,
  setTasks,
}) => {
  const deleteTask = async (id: string) => {
    try {
      await deleteTaskApi(id); // Call API to delete task
      setTasks((prev) => prev.filter((e: TaskType) => e.id !== id)); // Remove task from state
    } catch (error) {
      console.error("Failed to delete task", error);
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

  // Trigger adding the task when `newTaskVisible` changes to `true`
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
        />
      ))}
    </div>
  );
};
