import React from "react";
import { CheckBox } from "../buttons/CheckBox";
import "./SubTask.scss";
import { Subtask } from "../../../types";

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
            {deleteVisible && (
              <button
                className="subtask__delete"
                onClick={() => onDeleteSubtask(id)}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="subtask__delete__svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            )}
            {!deleteVisible && (
              <CheckBox
                isDone={completed}
                setDone={(newState) => onUpdateSubtask(id, newState)} // Updating subtask completion state
              />
            )}
            {" - "}
            <input
              className="subtask-list__item-text"
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
