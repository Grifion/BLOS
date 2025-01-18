import React from "react";
import "./SideBar.scss";
import { Delete } from "../../../shared/Delete";
import { BoardType } from "../../../types";
import { ChangePriority } from "../../tasks/buttons/ChangePriority/ChangePriority";
import { AddNew } from "../../../shared/AddNew";

type Props = {
  addNew: () => Promise<void>; // Both `addNewNote` and `addNewTask` match this signature
  isSaving: boolean;
  changeVDelete: () => void;
  board: BoardType;
  changeVPriority: () => void;
};



export const SideBar: React.FC<Props> = ({
  addNew,
  isSaving,
  changeVDelete,
  board,
  changeVPriority,
}) => (
  <nav className="nav">
    <ul className="nav-controls">
      <li className="nav-controls__item">
        {(() => {
          switch (board) {
            case BoardType.Tasks:
              return (
                <>
                  <AddNew addNew={addNew} />
                  <Delete changeVDelete={changeVDelete} />
                  <ChangePriority changeVPriority={changeVPriority} />
                </>
              );
            case BoardType.Notes:
              return (
                <>
                  <AddNew addNew={addNew} />
                  <Delete changeVDelete={changeVDelete} />
                </>
              );
            default:
              return null;
          }
        })()}
      </li>
    <li className="nav-controls align-end save">
      {isSaving && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="save__svg"
          viewBox="0 0 16 16"
        >
          <path d="M11 2H9v3h2z" />
          <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
        </svg>
      )}
    </li>
    </ul>
  </nav>
);
