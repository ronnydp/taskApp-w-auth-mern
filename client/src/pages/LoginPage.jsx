import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    login(values);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
        <h1 className="text-3xl font-bold">Iniciar sesión</h1>
        {loginErrors.map((error, index) => (
          <div
            key={index}
            className="bg-red-500 text-white text-lg font-semibold p-2 my-2 rounded-md"
          >
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white text-lg px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {errors.email && <p className="text-red-500 text-lg font-semibold">Correo es requerido</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white text-lg px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500 text-lg font-semibold">Contraseña es requerida</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-lg font-bold py-2 px-4 rounded-md my-2 cursor-pointer"
          >
            Acceder
          </button>
        </form>
        <p className="flex gap-2 justify-between ">
          No tienes cuenta aún?{" "}
          <Link
            to="/register"
            className="text-sky-500 hover:text-sky-600 cursor-pointer font-bold"
          >
            Registrarme
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
