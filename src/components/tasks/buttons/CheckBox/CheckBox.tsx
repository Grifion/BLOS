import "./CheckBox.scss";
import React from "react";

type Props = {
  isDone: boolean;
  setDone: (value: boolean) => void;
};

export const CheckBox: React.FC<Props> = ({ isDone, setDone }) => (
  <input
    type="checkbox"
    className="checkbox"
    checked={isDone}
    onChange={(e) => setDone(e.target.checked)}
  />
);
