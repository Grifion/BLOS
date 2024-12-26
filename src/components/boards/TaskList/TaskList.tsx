// TaskList.tsx
import { useEffect, useState } from "react";
import { NewTask } from "../../NewTask/NewTask";
import { Task } from "../../Task/Task";
import { Task as TaskType } from "../../../../types"; 
import "./TaskList.scss";

// Тепер використовуємо TaskType у всіх місцях
export const TaskList = () => {
  const [currentData, setData] = useState<TaskType[]>([]); // Тип даних TaskType
  const [loading, setLoading] = useState<boolean>(true); // Стан для завантаження
  const [error, setError] = useState<string | null>(null); // Стан для помилок

  // Отримуємо задачі при монтуванні компонента
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        if (!response.ok) {
          throw new Error("Не вдалося отримати задачі");
        }
        const data: TaskType[] = await response.json();
        setData(data); // Оновлюємо стан з отриманими даними
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Невідома помилка при завантаженні задач.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Завантаження задач...</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  return (
    <div className="task-list">
      <NewTask setData={setData} />
      {currentData.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
};
