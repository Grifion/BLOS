import { useContext } from "react";
import { ThemeContextType, ThemeContext } from "../../types";
import { Subtask } from "../../types";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme should be used only under tag ThemeProvider");
  }

  return context;
};

export const updateSubtaskState = (
  subtasks: Subtask[],
  id: number,
  completed: boolean
): Subtask[] =>
  subtasks.map((subtask) =>
    subtask.id === id ? { ...subtask, completed } : subtask
  );
