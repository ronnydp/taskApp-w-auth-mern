import axios from "./axios.js";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

//Esta petición se hace para verificar el token del usuario, para saber si está autenticado o no
export const verifyTokenRequest = () => axios.get(`/verify-token`);
