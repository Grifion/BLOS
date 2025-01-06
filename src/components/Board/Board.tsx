import { BoardType, TaskType } from "../../../types";
import { addTask } from "../../api/taskApi";
import { SideBar } from "../bars/SideBar";
import { TaskList } from "../tasks/TaskList";
import "./Board.scss";
import { useState } from "react";

type Props = {
	board: BoardType;
}

export const Board: React.FC<Props> = ({ board }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskType[]>([]); // Define tasks state

  const changeVDelete = (): void => {
    setDeleteVisible(!deleteVisible);
  };

  // Define the function to add a new task
  const addNewTask = async () => {
    const emptyTask: TaskType = {
      id: Date.now().toString(), // Unique task ID
      title: "", // Empty title for new task
      subtasks: [], // Empty subtasks array
    };

    try {
      const savedTask = await addTask(emptyTask); // Save the task via the API
      setTasks((prev) => [savedTask, ...prev]); // Add the task to the state
    } catch (error) {
      console.error("Error saving new task:", error);
    }
	};
	
	

  return (
    <div className="board">
      <SideBar
        addNewTask={addNewTask}
        isSaving={isSaving}
				changeVDelete={changeVDelete}
				board={board}
      />
      {board === BoardType.Tasks && (
        <TaskList
          newTaskVisible={false} // Handle this if needed, else leave as false
          setIsSaving={setIsSaving}
          deleteVisible={deleteVisible}
          addNewTask={addNewTask} // Pass the function here
          tasks={tasks} // Pass tasks to TaskList
          setTasks={setTasks} // Pass setTasks function to TaskList
        />
      )}
    </div>
  );
};
