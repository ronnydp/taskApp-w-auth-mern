import React from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createSubtasksRequest } from "../api/subtasks";

dayjs.extend(utc);

function SubTaskFormPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (values) => {
    await createSubtasksRequest(params.id, values);
    navigate(`/tasks/${params.id}/subtasks`);
  });
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <div className="bg-zinc-800 w-full max-w-md p-5 rounded-md">
        <h1 className="text-2xl mx-3 font-bold">Añadir subtarea</h1>
        <form onSubmit={onSubmit}>
          <input
            id="subtaskname"
            type="text"
            placeholder="Titulo de la subtarea"
            autoFocus
            {...register("title", { required: true })}
            className="text-lg w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
          />
          <input
            id="description"
            type="text"
            placeholder="Descripcion de la subtarea"
            {...register("description", { required: true })}
            className="text-lg w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
          />
          <input
            id="date"
            type="date"
            {...register("date", { required: true })}
            className="text-lg w-full bg-zinc-700 text-white px-2 py-2 rounded-md my-2"
          />
          <div className="mt-10">
            <button
              type="submit"
              className="text-lg w-full bg-indigo-500 hover:bg-indigo-700 font-bold py-2 px-4 rounded-md my-2 cursor-pointer"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => navigate(`/tasks/${params.id}/subtasks`)}
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

export default SubTaskFormPage;
