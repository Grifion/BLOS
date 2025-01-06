import { createContext } from "react";



// types.ts
export type TaskType = {
	id: string,
  title: string,
	subtasks?: Subtask[],
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
