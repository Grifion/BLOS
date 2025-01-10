import { NoteType } from "../types";

// api/notesApi.ts
const serverLink = "http://localhost:2001/notes"; // The endpoint for notes

// Fetch all notes
export const fetchNotes = async (): Promise<NoteType[]> => {
  const response = await fetch(serverLink);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

// Add a new note
export const addNote = async (note: NoteType): Promise<NoteType> => {
  const response = await fetch(serverLink, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to add note");
  }
  return response.json();
};

// Update a note
export const updateNote = async (note: NoteType): Promise<NoteType> => {
  const response = await fetch(`${serverLink}/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
};

// Delete a note
export const deleteNote = async (id: string): Promise<void> => {
  const response = await fetch(`${serverLink}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
};
