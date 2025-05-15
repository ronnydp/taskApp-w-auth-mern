import axios from 'axios'

export const instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true //Esto es para que se envien las cookies
})

export default instance;