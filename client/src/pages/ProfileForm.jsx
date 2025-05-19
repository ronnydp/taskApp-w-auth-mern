import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfileForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, updateProfile, errors: updateErrors } = useAuth();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (values) => {
    const success = await updateProfile(params.id, values);
    if (success) {
      navigate("/profile");
    }
  });
  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
  });
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-4xl mx-3">Editar perfil</h1>
      </div>
      <form
        onSubmit={onSubmit}
        className="bg-zinc-800 w-full max-w-md p-10 rounded-md my-2 mx-3"
      >
        {updateErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-500 text-white text-lg font-semibold p-2 my-2 rounded-md"
          >
            {error}
          </div>
        ))}
        <label htmlFor="username" className="font-semibold text-lg">
          Nombre de usuario
        </label>
        <input
          id="username"
          type="text"
          {...register("username", { required: true })}
          autoFocus
          className="w-full bg-zinc-700 text-white text-lg px-2 py-2 rounded-md my-2"
        />
        {errors.username && (
          <p className="text-red-500 text-lg font-semibold">
            Nombre de usuario es requerido
          </p>
        )}
        <label htmlFor="email" className="font-semibold text-lg ">
          Correo electrónico
        </label>
        <input
          id="email"
          type="text"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white text-lg rounded-md px-2 py-2 my-2"
        />
        {errors.email && (
          <p className="text-red-500 text-lg font-semibold">
            Correo electronico es requerido
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 font-bold text-lg py-1 px-3 rounded-md mt-5 cursor-pointer"
        >
          Guardar
        </button>
      </form>
    </>
  );
}

export default ProfileForm;
