import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  return (
    <div className="flex flex-col justify-between bg-zinc-800 max-w-md w-full p-5 rounded-md">
      <div className="flex gap-x-2 items-center justify-end">
        <button
          className="bg-red-500 hover:bg-red-700 font-bold text-lg py-1 px-3 rounded-md my-2 cursor-pointer"
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          Eliminar
        </button>
        <Link
          to={`/tasks/${task._id}`}
          className="bg-yellow-500 hover:bg-yellow-700 font-bold text-lg py-1 px-3 rounded-md my-2 cursor-pointer"
        >
          Editar
        </Link>
      </div>
      <div className="flex flex-col items-start h-full mt-5">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-slate-300 text-lg ">{task.description}</p>
      </div>
      <div className="flex justify-between items-center mt-7">
        {!task.completed && (
          <p className="text-white-300 font-bold">{`⌛${days(task.date)
            .utc()
            .format("DD/MM/YYYY")}`}</p>
        )}
        <p
          className={
            task.completed
              ? "text-green-500 font-bold text-right"
              : "text-red-500 font-bold text-right"
          }
        >
          {task.completed ? "🟢 Completado" : "🔴 Pendiente"}
        </p>
      </div>
    </div>
  );
}

export default TaskCard;
