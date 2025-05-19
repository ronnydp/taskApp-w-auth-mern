import React, { useEffect } from "react";
import { profileRequest } from "../api/auth";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Link } from "react-router-dom";
import {useAuth} from '../context/AuthContext';    

dayjs.extend(utc);

function Profile() {
  const { register, setValue } = useForm();
  const {user} = useAuth();

  useEffect(() => {
    async function loadProfile() {
      const res = await profileRequest();
      const profile = res.data;
      setValue("username", profile.username);
      setValue("email", profile.email);
      setValue("createdAt", dayjs.utc(profile.createdAt).format("DD-MM-YYYY"));
      setValue("updatedAt", dayjs.utc(profile.updatedAt).format("DD-MM-YYYY"));
    }
    loadProfile();
  });
  return (
    <>
      <div className="flex justify-between">
      <h1 className="font-semibold text-4xl mx-3">Mi perfil</h1>
      <Link
        to={`/profile/${user.id}`}
        className="bg-yellow-500 hover:bg-yellow-700 font-bold text-lg py-1 px-3 rounded-md my-2 mx-3 cursor-pointer"
      >
        Editar perfil
      </Link>
      </div>
      <div className="bg-zinc-800 w-full max-w-md p-10 rounded-md my-2 mx-3">
        <label htmlFor="username" className="font-semibold text-lg">
          Nombre de usuario
        </label>
        <input
          id="username"
          type="text"
          {...register("username", { required: true })}
          disabled
          className="w-full bg-zinc-700 text-white text-lg px-2 py-2 rounded-md my-2"
        />
        <label htmlFor="email" className="font-semibold text-lg ">
          Correo electrónico
        </label>
        <input
          id="email"
          type="text"
          {...register("email", { required: true })}
          disabled
          className="w-full bg-zinc-700 text-white text-lg rounded-md px-2 py-2 my-2"
        />
        <label htmlFor="createdAt" className="font-semibold text-lg ">
          Fecha de creación
        </label>
        <input
          id="createdAt"
          type="text"
          disabled
          {...register("createdAt")}
          className="w-full bg-zinc-700 text-white text-lg rounded-md px-2 py-2 my-2"
        />
        <label htmlFor="updatedAt" className="font-semibold text-lg ">
          Última actualización
        </label>
        <input
          id="updatedAt"
          type="text"
          disabled
          {...register("updatedAt")}
          className="w-full bg-zinc-700 text-white text-lg rounded-md px-2 py-2 my-2"
        />
      </div>
    </>
  );
}

export default Profile;
