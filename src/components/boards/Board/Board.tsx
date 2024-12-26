import { SideBar } from "../../bars/SideBar/SideBar";
import './Board.scss';
import { TaskList } from "../TaskList";

export const Board = () => (
  <div className="board">
    <SideBar board={true} />
    <TaskList />
  </div>
);
