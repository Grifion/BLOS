import { createContext } from "react";

export interface NoteType {
  id: string;
  title: string;
  content: string;
  createdAt: string; // You can adjust the type depending on your use case (e.g., Date object)
}


// types.ts
export type TaskType = {
	id: string,
  title: string,
	subtasks?: Subtask[],
	priority: number,
};

export type Subtask = {
	id: number,
	completed: boolean,
	text: string | undefined,
}

export interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export enum BoardType {
  Overview = "Overview",
  Notes = "Notes",
  Tasks = "Tasks",
  About = "About"
}

export enum Color {
  First = "var(--first-color)",
  Second = "var(--second-color)",
  Third = "var(--third-color)",
  Fourth = "var(--fourth-color)",
  Fifth = "var(--fifth-color)",
  Sixth = "var(--sixth-color)",
  Seventh = "var(--seventh-color)"
}

export type Part = {
  color: Color;  
	partSize: number;
	partName: string;
};

export enum TaskFilter {
  completed,
  uncompleted,
  inProgres,
  empty,
  highPriority, 
  mediumPriority, 
  lowPriority, 
}