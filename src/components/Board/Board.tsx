import { addNote, fetchNotes, deleteNote } from "../../api/notesApi";
import { addTask } from "../../api/taskApi";
import { BoardType, NoteType, TaskType } from "../../types";
import { SideBar } from "../bars/SideBar";
import { Notes } from "../notes/Notes/Notes";
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

  const addNewNote = async (): Promise<void> => {
    const newNote: NoteType = {
      id: Date.now().toString(),
      title: "",
      content: "",
      createdAt: "",
    };

    try {
      setIsSaving(true);
      const savedNote = await addNote(newNote);
      setNotes((prev) => [savedNote, ...prev]);
    } catch (error) {
      console.error("Error adding new note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const togglePriority = (): void => {
    setPriorityVisible((prev) => !prev);
    if (!priorityVisible) setDeleteVisible(false);
  };

  const toggleDelete = (): void => {
    setDeleteVisible((prev) => !prev);
    setPriorityVisible(false);
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
      setIsSaving(true);
      const savedTask = await addTask(emptyTask);
      setTasks((prev) => [savedTask, ...prev]);
    } catch (error) {
      console.error("Error saving new task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const addNew =
    board === BoardType.Notes
      ? addNewNote
      : board === BoardType.Tasks
      ? addNewTask
      : undefined;

  const handleNoteUpdate = (updatedNote: NoteType): void => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const handleNoteDelete = async (id: string): Promise<void> => {
    try {
      await deleteNote(id); 
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

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
        return <OverView tasks={tasks} />;
      case BoardType.Notes:
        return (
          <Notes
            notes={notes}
            onUpdate={handleNoteUpdate}
            deleteVisible={deleteVisible} 
            onDelete={handleNoteDelete} 
          />
        );
      case BoardType.About:
        return <div className="about">About content goes here.</div>;
      default:
        return <div>Unknown board type.</div>;
    }
  };

  return (
    <div className="board">
      <SideBar
        isSaving={isSaving}
        changeVDelete={toggleDelete}
        board={board}
        changeVPriority={togglePriority}
        addNew={addNew || (() => Promise.resolve())}
      />
      {renderBoardContent()}
    </div>
  );
};
