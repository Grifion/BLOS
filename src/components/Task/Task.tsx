import React from "react";
import './Task.scss';

type Props = {
  task: {
    title: string;
    text: string;
  };
};

export const Task: React.FC<Props> = ({ task }) => (
  <div className="task" style={{ width: "18rem" }}>
    <div className="task-body">
      <h5 className="task-title">{task.title}</h5>
      <p className="task-text">{task.text}</p>
      {/* <a href="#" className="btn btn-primary">
        Go somewhere
      </a> */}
    </div>
  </div>
);
