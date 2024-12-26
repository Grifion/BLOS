type Task = {
	title: string;
	text: string;
};

type Props = {
  task: Task;
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const Save: React.FC<Props> = ({ task, setData }) => {
  const addItem = async () => {
    const newItem = {
      id: Date.now(), // Унікальний ID
      ...task,
    };

    setData((prevData) => [...prevData, newItem]);

    try {
      const response = await fetch("https://your-api-endpoint.com/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log("Item added successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <button type="button" className="btn-save" onClick={addItem}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-floppy"
        viewBox="0 0 16 16"
      >
        <path d="M11 2H9v3h2z" />
        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
      </svg>
    </button>
  );
};
