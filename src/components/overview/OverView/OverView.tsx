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
    color: Color.Seventh, // Color for high priority
    partSize: getPriority(tasks, TaskFilter.highPriority),
    partName: "High Priority",
  },
  {
    color: Color.Third, // Color for medium priority
    partSize: getPriority(tasks, TaskFilter.mediumPriority),
    partName: "Medium Priority",
  },
  {
    color: Color.Sixth, // Color for low priority
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