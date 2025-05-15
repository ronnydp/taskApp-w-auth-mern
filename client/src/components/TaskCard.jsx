import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <div className="flex gap-x-2 items-center justify-end">
        <button
          className="bg-red-500 hover:bg-red-700 font-bold py-2 px-1 rounded-md my-2 cursor-pointer"
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          🗑️ Eliminar
        </button>
        <Link
          to={`/tasks/${task._id}`}
          className="bg-yellow-500 hover:bg-red-700 font-bold py-2 px-1 rounded-md my-2 cursor-pointer"
        >
          ✏️ Editar
        </Link>
      </div>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p className="text-cyan-300">{`⌛${days(task.date).utc().format("DD/MM/YYYY")}`}</p>
      <p
        className={
          task.completed
            ? "text-green-500 font-bold text-right"
            : "text-amber-500 font-bold text-right"
        }
      >
        {task.completed ? "✅ Finalizado" : "⚠️ Por finalizar"}
      </p>
    </div>
  );
}

export default TaskCard;
