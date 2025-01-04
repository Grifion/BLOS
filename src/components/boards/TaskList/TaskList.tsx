import { useState, useEffect } from "react";
import { TaskType } from "../../../../types";
import { Task } from "../../Task";
import './TaskList.scss';

export const TaskList = () => {
  const [currentData, setData] = useState<TaskType[]>([]); // Стейт для даних завдань


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
      <Task setData={setData} />
      {currentData.map((task) => (
        <Task
          key={task.id}
          task={task}
          setData={setData} // Оновлюємо завдання в батьківському компоненті
        />
      ))}
    </div>
  );
};
