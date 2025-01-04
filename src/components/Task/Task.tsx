import React, { useState, useEffect } from "react";
import { TaskType, Subtask } from "../../../types";
import { updateSubtaskState } from "../../functions/functions";
import { SubTaskList } from "../SubTaskList";
import cn from "classnames";
import './Task.scss';

type Props = {
  key?: string;
  task?: TaskType;
  setData: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export const Task: React.FC<Props> = ({ task, setData }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks || []);
  const [subtaskText, setSubtaskText] = useState("");

  useEffect(() => {
    setTitle(task?.title || "");
    setSubtasks(task?.subtasks || []);
  }, [task]);

  const handleAddSubtask = () => {
    if (!subtaskText.trim()) return;

    setSubtasks((prev) => [
      ...prev,
      { id: Date.now(), text: subtaskText.trim(), completed: false },
    ]);
    setSubtaskText(""); // Clear input after adding
  };

  // Update subtask text callback
  const handleUpdateSubtaskText = (id: number, text: string) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, text } : subtask
      )
    );
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: TaskType = {
      id: task?.id || Date.now().toString(),
      title,
      subtasks,
    };

    try {
      const response = await fetch(
        `http://localhost:2001/tasks${task ? `/${task.id}` : ""}`,
        {
          method: task ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) {
        throw new Error(
          task ? "Failed to update task" : "Failed to create task"
        );
      }

      const savedTask: TaskType = await response.json();

      setData((prev) =>
        task
          ? prev.map((t) => (t.id === savedTask.id ? savedTask : t))
          : [...prev, savedTask]
      );

      if (!task) {
        setTitle("");
        setSubtasks([]);
      }
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  return (
    <form
      onSubmit={handleSaveTask}
      className={cn({ "new-task": !task, task: !!task }, "task-block")}
    >
      <input
        className="task-block__input"
        type="text"
        placeholder="Enter task title"
        value={title}
				onChange={(e) => setTitle(e.target.value)}
      />
      <div className="subtasks">
        <SubTaskList
          subtasks={subtasks}
          onUpdateSubtask={(id, completed) =>
            setSubtasks((prev) => updateSubtaskState(prev, id, completed))
          }
          onUpdateSubtaskText={handleUpdateSubtaskText} // Pass the text update handler
        />
        <input
          className="task-block__input"
          type="text"
          placeholder="Enter subtask"
          value={subtaskText}
					onChange={(e) => setSubtaskText(e.target.value)}
					onBlur={handleAddSubtask}
        />
      </div>
      <button type="submit">{task ? "Update Task" : "Save Task"}</button>
    </form>
  );
};
