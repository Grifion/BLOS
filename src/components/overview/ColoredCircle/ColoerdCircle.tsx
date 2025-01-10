import React from "react";
import { Part } from "../../../types";
import "./ColoredCircle.scss";

type Props = {
  parts: Part[];
};

export const ColoredCircle: React.FC<Props> = ({ parts }) => {
  const totalSize = parts.reduce((sum, part) => sum + part.partSize, 0);

  let cumulativeSize = 0;
  const segments = parts.map((part) => {
    const startAngle = (cumulativeSize / totalSize) * 360;
    cumulativeSize += part.partSize;
    const endAngle = (cumulativeSize / totalSize) * 360;
    return { color: part.color, startAngle, endAngle };
  });

  const gradient = segments
    .map(
      ({ color, startAngle, endAngle }) =>
        `${color} ${startAngle}deg ${endAngle}deg`
    )
    .join(", ");

	return (
    <div className="stats">
      <div
        className="circle"
        style={{ background: `conic-gradient(${gradient})` }}
      >
        <div className="circle__data">
          {parts.map((part) => (
            <p
              className="circle__data-text"
              key={part.partName} // Add a unique key for each item (assuming `partName` is unique)
              style={{ color: part.color }} // Properly wrap the style object in curly braces
            >
              {part.partSize} {/* Display the name of the part */}
            </p>
          ))}
        </div>
      </div>
      <ul className="stats__description">
        {parts.map((part) => (
          <div className="stats__description-text">
            <div
              style={{ backgroundColor: part.color }}
              className="stats__description-circle"
            />
            <label htmlFor={part.partName} className="stats__description-label">
              {part.partName}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};
