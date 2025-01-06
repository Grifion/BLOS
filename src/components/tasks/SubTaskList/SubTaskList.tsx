import React from "react";
import { Subtask } from "../../../types";
import { CheckBox } from "../buttons/CheckBox";
import "./SubTask.scss";

type Props = {
  subtasks: Subtask[];
  onUpdateSubtask: (id: number, completed: boolean) => void; // Callback for updating subtask completion
  onUpdateSubtaskText: (id: number, text: string) => void; // Callback to update subtask text
  onDeleteSubtask: (id: number) => void; // Callback to delete a subtask
  deleteVisible: boolean;
};

export const SubTaskList: React.FC<Props> = ({
  subtasks,
  onUpdateSubtask,
  onUpdateSubtaskText,
  onDeleteSubtask,
  deleteVisible,
}) => {
  // Early return if no subtasks are available
  if (subtasks.length === 0) return <div>No subtasks available</div>;

  return (
    <div className="subtask-list">
      <ul>
        {subtasks.map(({ id, completed, text }) => (
          <li key={id} className="subtask-list__item">
            <CheckBox
              isDone={completed}
              setDone={(newState) => onUpdateSubtask(id, newState)} // Updating subtask completion state
            />
            {" - "}
            <input
              className="subtask-list__item-text"
              type="text"
              value={text}
              onChange={(e) => onUpdateSubtaskText(id, e.target.value)} // Updating subtask text on change
            />
            {deleteVisible && (
              <button onClick={() => onDeleteSubtask(id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
