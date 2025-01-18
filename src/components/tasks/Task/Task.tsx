import React, { useState, useEffect, useRef } from "react";
import { SubTaskList } from "../SubTaskList";
import cn from "classnames";
import "./Task.scss";
import { updateSubtaskState } from "../../../functions";
import { Subtask, TaskType } from "../../../types";
import { serverLink } from "../../../api/taskApi";
import { DeleteSmall } from "../../../shared/DeleteSmall/DeleteSmall";
import { resizeTextarea } from "../../../helpers/textArea";

type Props = {
  task?: TaskType; // Current task
  setData: React.Dispatch<React.SetStateAction<TaskType[]>>; // Function to update data
  setSaving: (saving: boolean) => void; // Function to inform parent about saving state
  deleteVisible: boolean;
  deleteTask: (id: string) => void;
  priorityVisible: boolean;
  changeTaskPriority: (id: string, newPriority: number) => void;
};

export const Task: React.FC<Props> = ({
  task,
  setData,
  setSaving,
  deleteVisible,
  deleteTask,
  priorityVisible,
  changeTaskPriority,
}) => {
  const [title, setTitle] = useState(task?.title || ""); // State for task title
  const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks || []); // State for subtasks
  const [subtaskText, setSubtaskText] = useState(""); // State for new subtask text
  const [priority, setPriority] = useState(task?.priority || 1); // State for priority
  const lastSavedTask = useRef<TaskType | null>(null); // Ref to keep track of the last saved state

  // Synchronize state when task changes
  useEffect(() => {
    setTitle(task?.title || "");
    setSubtasks(task?.subtasks || []);
    setPriority(task?.priority || 1); // Sync priority
    lastSavedTask.current = task || null; // Update last saved task
  }, [task]);

  // Automatically save changes every 500ms
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTask: TaskType = {
        id: task?.id || Date.now().toString(),
        title,
        subtasks,
        priority,
      };

      // Check if the task has changed before saving
      if (
        JSON.stringify(currentTask) !== JSON.stringify(lastSavedTask.current)
      ) {
        await saveTask(currentTask);
        lastSavedTask.current = currentTask; // Update the last saved state
      }
    }, 500);

    return () => clearInterval(interval); // Clear interval on component unmount
  });

  const handleAddSubtask = async () => {
    if (!subtaskText.trim()) return;

    const newSubtask = {
      id: Date.now(),
      text: subtaskText.trim(),
      completed: false,
    };

    setSubtasks((prev) => [...prev, newSubtask]);
    setSubtaskText(""); // Clear input after adding

    // Save the subtask immediately
    await saveTask({
      id: task?.id || Date.now().toString(),
      title,
      subtasks: [...subtasks, newSubtask],
      priority,
    });
  };

  const handleUpdateSubtaskText = (id: number, text: string) => {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, text } : subtask
      )
    );
  };

  const handleDeleteSubtask = async (id: number) => {
    const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(updatedSubtasks);

    // Save the updated task with the remaining subtasks
    await saveTask({
      id: task?.id || Date.now().toString(),
      title,
      subtasks: updatedSubtasks,
      priority,
    });
  };

  const handlePriorityChange = (newPriority: number) => {
    setPriority(newPriority); // Update local priority
    if (task?.id) {
      changeTaskPriority(task.id, newPriority); // Call parent handler to save priority
    }
  };

  const saveTask = async (currentTask: TaskType) => {
    setSaving(true); // Inform parent that saving started

    try {
      const response = await fetch(
        `${serverLink}${task ? `/${task.id}` : ""}`,
        {
          method: task ? "PUT" : "POST", // PUT for update, POST for new task
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentTask),
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
    } catch (error) {
      console.error("Failed to save task", error);
    } finally {
      setSaving(false); // Inform parent that saving is complete
    }
  };

  return (
    <form className={cn({ "new-task": !task, task: !!task }, "task-block")}>
      <textarea
        className="task-block__input"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          resizeTextarea(e);
        }}
      />

      {priorityVisible && (
        <select
          className="task-block__priority"
          value={priority}
          onChange={(e) => handlePriorityChange(Number(e.target.value))}
        >
          {[...Array(5).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>
              {n + 1}
            </option>
          ))}
        </select>
      )}
      {deleteVisible && <DeleteSmall onDelete={() => deleteTask(task!.id)} />}

      <div className="subtasks">
        <SubTaskList
          subtasks={subtasks}
          onUpdateSubtask={(id, completed) =>
            setSubtasks((prev) => updateSubtaskState(prev, id, completed))
          }
          onUpdateSubtaskText={handleUpdateSubtaskText}
          onDeleteSubtask={handleDeleteSubtask} // Pass the delete handler
          deleteVisible={deleteVisible}
        />
        <input
          className="task-block__input"
          type="text"
          placeholder="Enter subtask"
          value={subtaskText}
          onChange={(e) => setSubtaskText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent form submission or default behavior
              handleAddSubtask(); // Add subtask
            }
          }}
        />
      </div>
    </form>
  );
};
