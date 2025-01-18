import React from "react";
import { CheckBox } from "../buttons/CheckBox";
import "./SubTask.scss";
import { Subtask } from "../../../types";
import { DeleteSmall } from "../../../shared/DeleteSmall/DeleteSmall";
import { resizeTextarea } from "../../../helpers/textArea";

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
            <div className="subtask-list__content">
              {deleteVisible && (
                <DeleteSmall onDelete={() => onDeleteSubtask(id)} />
              )}
              {!deleteVisible && (
                <CheckBox
                  isDone={completed}
                  setDone={(newState) => onUpdateSubtask(id, newState)}
                />
              )}
              <textarea
                className="subtask-list__item-text"
                value={text}
                onChange={(e) => {
                  onUpdateSubtaskText(id, e.target.value);
                  resizeTextarea(e);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
