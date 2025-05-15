import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }, //extrae los errores del formulario
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md mx-3">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        {registerErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-500 text-white my-2 p-2 rounded-md"
          >
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {/* Aquí se muestra el error si el campo username es requerido */}
          {errors.username && (
            <p className="text-red-500">Usuario es requerido</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {errors.email && <p className="text-red-500">Correo es requerido</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">Contraseña es requerida</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded-md my-2 cursor-pointer"
          >
            Registrarme
          </button>
        </form>
        <p className="flex gap-2 text-sm justify-between">
          Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-sky-500 hover:text-sky-600 font-bold"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
