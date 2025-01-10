import React from "react";
import './ChangePriority.scss';

type Props = {
  changeVPriority: () => void;
};

export const ChangePriority: React.FC<Props> = ({ changeVPriority }) => {
  return (
    <button className="priority" onClick={() => changeVPriority()}>
      <svg className="priority__svg"></svg>
    </button>
  );
};