import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createTask, getTask, updateTask, errors: taskErrors } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"));
        setValue("completed", task.completed);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    let success = false;
    if (params.id) {
      success = await updateTask(params.id, values);
    } else {
      success = await createTask({ ...values, date: dayjs.utc(values.date) });
    }
    if (success) {
      navigate("/tasks");
    }
  });
  return (
    <>
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-4xl font-bold">
          {params.id ? "Editar tarea" : "Añadir tarea"}
        </h1>
        {taskErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-500 text-white p-2 my-2 rounded-md"
          >
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            id="taskname"
            type="text"
            placeholder="Título de la tarea"
            {...register("title", { required: true })}
            autoFocus
            className="text-lg w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
          />
          {errors.title && (
            <p className="text-red-500">El título es requerido</p>
          )}
          <textarea
            id="description"
            rows="3"
            placeholder="Descripción"
            {...register("description", { required: true })}
            className="text-lg w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">La descripción es requerida</p>
          )}
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
            className="text-lg w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2 disabled"
            disabled={params.id ? true : false}
          />
          {errors.date && <p className="text-red-500">Fecha es requerida</p>}
          <div>
            <select
              {...register("completed", {
                required: true,
                setValuesAs: (value) => value === "true",
              })}
              className="text-lg w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2 cursor-pointer"
            >
              <option value="false">Pendiente</option>
              <option value="true">Completada</option>
            </select>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="text-lg w-full bg-indigo-500 hover:bg-indigo-700 font-bold py-2 px-4 rounded-md my-2 cursor-pointer"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="text-lg w-full bg-red-500 hover:bg-red-700 font-semibold py-2 px-4 rounded-md  cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskFormPage;
