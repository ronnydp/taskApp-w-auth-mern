import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, updateProfileRequest } from "../api/auth.js";
import Cookies from "js-cookie"; //Librería para manejar cookies en el navegador
import { verifyTokenRequest } from "../api/auth.js";

export const AuthContext = createContext(); //Contexto de autenticación

//Hook para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  //Proveer el contexto de autenticación
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); //Sirve para saber si el usuario está autenticado o no en la aplicación
  const [errors, setErrors] = useState([]); //Para manejar los errores de la autenticación
  const [loading, setLoading] = useState(true); //Para manejar el loading de la autenticación

  const signup = async (user) => {
    try {
      //Registrar un nuevo usuario
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const logout = () => {
    //Cerrar sesión
    Cookies.remove("token"); //Eliminar la cookie del token
    setUser(null);
    setIsAuthenticated(false);
  }
  const updateProfile = async (id, user) => {
    try {
      await updateProfileRequest(id, user)
      return true
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
      return false
    }
  }
  useEffect(() => {
    if (errors.length > 0) {
      //Si hay errores, se limpian después de 5 segundos
      const timer = setTimeout(() => {
        setErrors([]); //Limpiar errores
      }, 5000);
      return () => clearTimeout(timer); //Limpiar el timer, para no consumir recursos
    }
  }, [errors]);
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false)
        return setUser(null);
      }
      try {
        // Hacer petición al backend para verificar el token y traer los datos.
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Si la petición es exitosa, se guarda el usuario en el estado
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
        login,
        loading,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
