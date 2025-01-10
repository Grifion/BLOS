import { getCount, getPriority } from "../../../api/overviewApi";
import { Color, Part, TaskFilter, TaskType } from "../../../types";
import { ColoredCircle } from "../ColoredCircle/ColoerdCircle";

type Props = {
	tasks: TaskType[];
}

export const OverView: React.FC<Props> = ({ tasks }) => {

const partsCompleted: Part[] = [
  {
    color: Color.Fourth,
    partSize: getCount(tasks, TaskFilter.completed),
    partName: "Completed",
  },
  {
    color: Color.Second,
    partSize: getCount(tasks, TaskFilter.uncompleted),
    partName: "Uncompleted",
  },
  {
    color: Color.Fifth,
    partSize: getCount(tasks, TaskFilter.inProgres),
    partName: "In progres",
  },
  {
    color: Color.First,
    partSize: getCount(tasks, TaskFilter.empty),
    partName: "Empty Tasks",
  },
];
	
const partsPriority: Part[] = [
  {
    color: Color.Seventh, // Колір для високого пріоритету
    partSize: getPriority(tasks, TaskFilter.highPriority),
    partName: "High Priority",
  },
  {
    color: Color.Third, // Колір для середнього пріоритету
    partSize: getPriority(tasks, TaskFilter.mediumPriority),
    partName: "Medium Priority",
  },
  {
    color: Color.Sixth, // Колір для низького пріоритету
    partSize: getPriority(tasks, TaskFilter.lowPriority),
    partName: "Low Priority",
  },
];


	return (
		<div className="over-view">
			<ColoredCircle parts={partsCompleted} />
			<ColoredCircle parts={partsPriority} />
		</div>
	);
}