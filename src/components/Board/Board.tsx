import { fetchNotes } from "../../api/notesApi";
import { addTask } from "../../api/taskApi";
import { BoardType, NoteType, TaskType } from "../../types";
import { SideBar } from "../bars/SideBar";
import { Notes } from "../notes/Notes";
import { OverView } from "../overview";
import { Tasks } from "../tasks";
import "./Board.scss";
import { useEffect, useState } from "react";

type Props = {
  board: BoardType;
};

export const Board: React.FC<Props> = ({ board }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [priorityVisible, setPriorityVisible] = useState<boolean>(false);
	const [notes, setNotes] = useState<NoteType[]>([]);


  const togglePriority = (): void => {
    setPriorityVisible((prev) => !prev); // Toggle priority
    if (!priorityVisible) setDeleteVisible(false); // If enabling priority, disable delete
  };

  // Toggle delete visibility
  const toggleDelete = (): void => {
    setDeleteVisible((prev) => !prev); // Toggle delete
    if (!deleteVisible) setPriorityVisible(false); // If enabling delete, disable priority
  };
	
 useEffect(() => {
   const getNotes = async () => {
     try {
       const fetchedNotes = await fetchNotes();
       setNotes(fetchedNotes);
     } catch (error) {
       console.error("Error fetching notes:", error);
     }
   };
   getNotes();
 }, []);

  const addNewTask = async (): Promise<void> => {
    const emptyTask: TaskType = {
      id: Date.now().toString(),
      title: "",
			subtasks: [],
			priority: 1,
    };

    try {
      setIsSaving(true); // Start saving
      const savedTask = await addTask(emptyTask);
      setTasks((prev) => [savedTask, ...prev]);
    } catch (error) {
      console.error("Error saving new task:", error);
    } finally {
      setIsSaving(false); // End saving
    }
  };

  // Function to render the correct component based on board type
  const renderBoardContent = (): JSX.Element => {
    switch (board) {
      case BoardType.Tasks:
        return (
          <Tasks
            newTaskVisible={false}
            setIsSaving={setIsSaving}
            deleteVisible={deleteVisible}
            addNewTask={addNewTask}
            tasks={tasks}
						setTasks={setTasks}
						priorityVisible={priorityVisible}
          />
        );
      case BoardType.Overview:
				return <OverView tasks={tasks}  />
			case BoardType.Notes:
				return <Notes notes={notes} />;
      case BoardType.About:
        return <div className="about">About content goes here.</div>;
      default:
        return <div>Unknown board type.</div>;
    }
  };

  return (
    <div className="board">
      <SideBar
        addNewTask={addNewTask}
        isSaving={isSaving}
        changeVDelete={toggleDelete}
        board={board}
        changeVPriority={togglePriority}
      />
      {renderBoardContent()}
    </div>
  );
};
