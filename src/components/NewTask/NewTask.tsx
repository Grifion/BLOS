import { useState } from "react";
import "./NewTask.scss";
import { Save } from "../buttons/Save/Save";
import { Task  } from "../../../types"; 

type Props = {
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const NewTask: React.FC<Props> = ({ setData }) => {
  const [title, setTitle] = useState("Title");
  const [text, setText] = useState("Text");

  const task: Task = { title, text };

  return (
    <>
      <form className="form">
        <input
          className="input input__title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          className="input input__text"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Save task={task} setData={setData} />
      </form>
    </>
  );
};
