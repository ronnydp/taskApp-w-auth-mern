import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";

function Navbar() {
  const { isAuthenticated} = useAuth();
  return (
    <nav className="bg-zinc-700 my-3 mx-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold ">Gestor de Tareas</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Dropdown/>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"} className="bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-700">Iniciar sesión</Link>
            </li>
            <li>
              <Link to={"/register"} className="bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-700">Registrarme</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
