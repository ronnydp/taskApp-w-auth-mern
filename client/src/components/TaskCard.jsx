import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import KebabMenu from "./KebabMenu";
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("es");

function TaskCard({ task }) {
  
  const today = dayjs().utc().startOf("day");
  const dueDate = dayjs(task.date).utc().startOf("day");
  const taskUpdated = dayjs(task.updatedAt).startOf("day");
  const diffDays = dueDate.diff(today, "day");
  const taskCompleted = task.completed;

  function getRelativeDateText(diff, taskUpdated, taskCompleted) {
    if (taskCompleted) {
      return `Completado: ${taskUpdated.format("ddd DD MMM")}`;
    }
    if (diff === 0) return "Hoy";
    if (diff === -1) return "Ayer";
    if (diff === 1) return "Mañana";
    if (diff < -1 && diffDays > -7) return `Hace ${Math.abs(diff)} días`;
    if (diff <= -7) {
      const weeks = Math.floor(Math.abs(diff) / 7);
      return `Hace ${weeks} semana${weeks > 1 ? "s" : ""}`;
    }
    dueDate.from(dayjs().startOf("day"));
  }

  return (
    <div className="flex flex-col justify-between bg-zinc-800 max-w-md w-full p-5 rounded-md hover:bg-zinc-900">
      <div className="flex gap-x-2 justify-between">
        <h1 className="text-2xl font-bold cursor-default">{task.title}</h1>
        <KebabMenu task={task} />
      </div>
      <div className="flex flex-col items-start h-full">
        <p className="text-slate-300 text-lg cursor-default">
          {task.description}
        </p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p
          className={`cursor-default ${
            task.completed
              ? "text-white-500"
              : diffDays === 0
              ? "text-blue-400 font-bold"
              : diffDays > 0
              ? "text-white-500 font-bold"
              : "text-red-600 font-bold"
          }`}
        >
          {getRelativeDateText(diffDays, taskUpdated, taskCompleted)}
        </p>
      </div>
    </div>
  );
}

export default TaskCard;
