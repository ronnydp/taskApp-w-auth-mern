import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((values) => {
    if (params.id) {
      updateTask(params.id, values);
    } else {
      createTask({ ...values, date: dayjs.utc(values.date) });
    }
    navigate("/tasks");
  });
  return (
    <div className="bg-zinc-800 w-full max-w-md p-10 rounded-md my-2 mx-3">
      <h1 className="text-2xl font-bold">{params.id ? "Editar tarea" : ""}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Nombre de la tarea</label>
        <input
          type="text"
          placeholder="Título de la tarea"
          {...register("title")}
          autoFocus
          className="w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
        />
        <label htmlFor="description">Descripcion</label>
        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
        ></textarea>
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
        />
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-green-700 font-bold py-2 px-4 rounded-md my-2 cursor-pointer"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
