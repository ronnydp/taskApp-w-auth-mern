import { useEffect } from "react";
import { useTasks } from "../context/TasksContext.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { Link } from "react-router-dom";

function TaskPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <div className="flex items-center mx-3 py-2 justify-between">
        <h1 className="text-4xl font-bold">Mis tareas</h1>
        <Link
          to={"/add-task"}
          className="flex gap-2 bg-green-500 text-lg p-2 rounded-sm hover:bg-green-700 font-bold"
        >
          <img
            width="28"
            height="28"
            src="https://img.icons8.com/color/28/add--v1.png"
            alt="add--v1"
          />
          Crear
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 text-lg md:grid-cols-3 gap-2 m-3">
        {tasks.length === 0 ? (
          <>
            <h1 className="mx-3">No hay tareas</h1>
          </>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default TaskPage;
