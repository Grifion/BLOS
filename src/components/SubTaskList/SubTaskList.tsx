import React from "react";
import { Subtask } from "../../../types";
import { CheckBox } from "../buttons/CheckBox";

type Props = {
  subtasks: Subtask[];
  onUpdateSubtask: (id: number, completed: boolean) => void; // Callback для оновлення підзавдання
};

export const SubTaskList: React.FC<Props> = ({ subtasks, onUpdateSubtask }) => {
  if (!subtasks.length) return <div>No subtasks available</div>;

  return (
    <div className="subtask-list">
      <h3>Subtasks</h3>
      <ul>
        {subtasks.map(({ id, completed, text }) => (
          <li key={id}>
            <CheckBox
              isDone={completed}
              setDone={(newState) => onUpdateSubtask(id, newState)} // Оновлюємо підзавдання
            />
            {" - "}
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};
