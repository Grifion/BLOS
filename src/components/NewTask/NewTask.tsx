import React, { useState } from "react";
import "./NewTask.scss";
import { Task, Subtask } from "../../../types";
import { updateSubtaskState } from "../../functions/functions";
import { SubTaskList } from "../SubTaskList";

type Props = {
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const NewTask: React.FC<Props> = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [subtaskText, setSubtaskText] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  const handleAddSubtask = () => {
    if (!subtaskText.trim()) return;

    setSubtasks((prev) => [
      ...prev,
      { id: Date.now(), text: subtaskText.trim(), completed: false },
    ]);
    setSubtaskText("");
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = { id: Date.now().toString(), title, subtasks };

    setData((prev) => [...prev, newTask]);

    try {
      await fetch("http://localhost:2001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error("Failed to save task", error);
    }

    setTitle("");
    setSubtasks([]);
  };

  return (
    <div className="new-task">
      <form onSubmit={handleSaveTask}>
        <input
          className="input"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="subtasks">
          <SubTaskList
            subtasks={subtasks}
            onUpdateSubtask={(id: number, completed) =>
              setSubtasks((prev) => updateSubtaskState(prev, id, completed))
            }
          />
          <input
            className="input"
            type="text"
            placeholder="Enter subtask"
            value={subtaskText}
            onChange={(e) => setSubtaskText(e.target.value)}
          />
          <button type="button" onClick={handleAddSubtask}>
            Add Subtask
          </button>
        </div>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
};
