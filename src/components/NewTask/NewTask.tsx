// import { useState } from "react";
// import "./NewTask.scss";
// import { Save } from "../buttons/Save/Save";

// export const NewTask = () => {
// 	const [title, setTitle] = useState("Title");
// 	const [text, setText] = useState("Text");

// 	type Task = {
// 		title: string;
// 		text: string;
// 	}

// 	const task: Task = {
// 		title: title,
// 		text: text,
// 	}

//   return (
//     <>
//       <form className="form">
//         <input
//           className="input input__title"
//           type="text"
//           onChange={(e) => {
// 						setTitle(e.target.value);
//           }}
//           defaultValue={"Title"}
//         ></input>
// 				<input className="input input__text" type="text" onChange={(e) => {
// 					setText(e.target.value);
// 				}}/>
// 				<Save title={task} />
//       </form>

//       <p>{title}</p>
//     </>
//   );
// };
