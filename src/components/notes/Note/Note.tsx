// Note.tsx
import { useState } from "react";
import { NoteType } from "../../../types";
import "./Note.scss";
import { updateNote } from "../../../api/notesApi";
import { resizeTextarea } from "../../../helpers/textArea";

type Props = {
  note: NoteType;
  deleteVisible: boolean; // Видимість кнопки видалення
  onDelete: (id: string) => void; // Функція видалення
};

export const Note: React.FC<Props> = ({ note, deleteVisible, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = async () => {
    try {
      await updateNote({
        ...note,
        title,
        content,
      });
    } catch (error) {
      console.error("Failed to update the note", error);
    }
  };

  return (
    <div className="note">
      <textarea
        className="input note-title textarea"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          resizeTextarea(e);
          handleUpdate();
        }}
      />
      <textarea
        className="input note-content textarea"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          resizeTextarea(e);
          handleUpdate();
        }}
      />
      {deleteVisible && (
        <button
          className="delete-button"
          onClick={() => onDelete(note.id)} // Виклик функції видалення
        >
          Delete
        </button>
      )}
    </div>
  );
};
