import { useEffect } from "react";
import { useTasks } from "../context/TasksContext.jsx";
import TaskCard from "../components/TaskCard.jsx";

function TaskPage() {
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return <h1 className="mx-3">No hay tareas</h1>;
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mx-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskPage;
