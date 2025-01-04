import React from "react";
import { Subtask } from "../../../types";
import { CheckBox } from "../buttons/CheckBox";
import './SubTask.scss';

type Props = {
  subtasks: Subtask[];
  onUpdateSubtask: (id: number, completed: boolean) => void; // Callback for updating subtask completion
  onUpdateSubtaskText: (id: number, text: string) => void; // Callback to update subtask text
};

export const SubTaskList: React.FC<Props> = ({
  subtasks,
  onUpdateSubtask,
  onUpdateSubtaskText,
}) => {
  // Early return if no subtasks are available
  if (subtasks.length === 0) return <div>No subtasks available</div>;

  return (
    <div className="subtask-list">
      <ul>
        {subtasks.map(({ id, completed, text }) => (
          <li key={id}>
            <CheckBox
              isDone={completed}
              setDone={(newState) => onUpdateSubtask(id, newState)} // Updating subtask completion state
						/>
            {" - "}
						<input
							className="subtask-text"
              type="text"
              value={text}
              onChange={(e) => onUpdateSubtaskText(id, e.target.value)} // Updating subtask text on change
						/>
          </li>
        ))}
      </ul>
    </div>
  );
};
