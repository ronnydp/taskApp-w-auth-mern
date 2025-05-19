import { useEffect } from "react";
import { useTasks } from "../context/TasksContext.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { Link } from "react-router-dom";

function TaskPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);
  // if (tasks.length === 0) return <h1 className="mx-3">No hay tareas</h1>;
  return (
    <div className="">
      <div className="flex items-center mx-3 py-2 justify-end">
        <Link
          to={"/add-task"}
          className="bg-green-500 text-lg px-4 py-1 rounded-sm hover:bg-green-700 font-bold"
        >
          Añadir tarea
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 text-lg md:grid-cols-3 gap-2 mx-3">
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
