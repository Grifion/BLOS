import React from "react";
import "./SideBar.scss";
import { AddTask } from "../../tasks/buttons/AddTask";
import { Delete } from "../../tasks/buttons/Delete";
import { Save } from "../../tasks/buttons/Save";
import { BoardType } from "../../../../types";

type Props = {
  addNewTask: () => void;
  isSaving: boolean;
  changeVDelete: () => void;
  board: BoardType;
};

export const SideBar: React.FC<Props> = ({
  addNewTask,
  isSaving,
  changeVDelete,
  board,
}) => (
  <nav className="nav">
    <ul className="nav-controls">
      <li className="nav-controls__item">
        {board === BoardType.Tasks && (
          <>
            <AddTask addNewTask={addNewTask} />
            <Delete changeVDelete={changeVDelete} />
          </>
        )}
      </li>
      <li className="nav-controls__item align-end">{isSaving && <Save />}</li>
    </ul>
  </nav>
);
