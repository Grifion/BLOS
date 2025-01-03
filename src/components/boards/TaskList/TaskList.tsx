import { useState, useEffect } from "react";
import { Task } from "../../Task/Task";
import { Task as TaskType } from "../../../../types";
import { NewTask } from "../../NewTask";

export const TaskList = () => {
  const [currentData, setData] = useState<TaskType[]>([]); // Стейт для даних завдань

  // Функція для оновлення завдання
  const updateTask = (updatedTask: TaskType) => {
    setData((prevTasks) =>
      prevTasks.map(
        (task) => (task.id === updatedTask.id ? updatedTask : task) // Оновлюємо завдання в глобальному стані
      )
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:2001/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data: TaskType[] = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      <NewTask setData={setData} />
      {currentData.map((task) => (
        <Task
          key={task.id}
          task={task}
          updateTask={updateTask} // Оновлюємо завдання в батьківському компоненті
        />
      ))}
    </div>
  );
};
