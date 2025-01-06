import { useState } from "react";
import "./App.scss";
import { TopBar } from "./components/bars/TopBar/TopBar";
import { Board } from "./components/Board";
import { BoardType } from "../types";

function App() {
		const [board, setBoard] = useState(BoardType.Overview);

  return (
    <>
      <TopBar setBoard={setBoard} />
			<Board board={board} />
    </>
  );
}

export default App;
