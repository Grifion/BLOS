import { Note } from "../Note/Note";
import { NoteType } from "../../../types";

type Props = {
  notes: NoteType[];
  deleteVisible: boolean;
  onDelete: (id: string) => void;
  onUpdate: (updatedNote: NoteType) => void;
};

export const Notes: React.FC<Props> = ({ notes, deleteVisible, onDelete }) => (
  <div className="notes">
    {notes.map((note) => (
      <Note
        key={note.id}
        note={note}
        deleteVisible={deleteVisible}
        onDelete={onDelete}
      />
    ))}
  </div>
);
