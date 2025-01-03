import React, { useState, useEffect } from "react";
import { SubTaskList } from "../SubTaskList";
import { Task as TaskType, Subtask } from "../../../types";
import { updateSubtaskState } from "../../functions/functions";

type Props = {
  task: TaskType;
  updateTask: (updatedTask: TaskType) => void; // Функція для оновлення завдання в батьківському компоненті
};

export const Task: React.FC<Props> = ({ task, updateTask }) => {
	
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);

  // Оновлення стану підзавдання
  const handleSubtaskChange = (id: number, completed: boolean) => {
    // Оновлюємо підзавдання в локальному стані
    const updatedSubtasks = updateSubtaskState(subtasks, id, completed);
    setSubtasks(updatedSubtasks);

    // Оновлюємо завдання в TaskList (батьківському компоненті)
    updateTask({ ...task, subtasks: updatedSubtasks });
  };

  useEffect(() => {
    // Ініціалізуємо локальний стан підзавдань, якщо task вже має підзавдання
    setSubtasks(task.subtasks || []);
  }, [task]);

  return (
    <div className="task-body" id={task.id.toString()}>
      <h5 className="task-title">{task.title}</h5>
      <SubTaskList
        subtasks={subtasks}
        onUpdateSubtask={handleSubtaskChange} // Оновлення підзавдання
      />
    </div>
  );
};
