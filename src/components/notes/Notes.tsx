import React from "react";
import { NoteType } from "../../types";
import "./Notes.scss"; // Assuming you've created the SCSS file for styling

type Props = {
  notes: NoteType[];
};

export const Notes: React.FC<Props> = ({ notes}) => {

  return (
    <div className="notes">
      <ul className="notes-block">
        {notes.map((note) => (
          <li key={note.id} className="notes-block__note">
            <h3 className="notes-block__note__title" >{note.title}</h3>
            <p className="notes-block__note__content">{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
