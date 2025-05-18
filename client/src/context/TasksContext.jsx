import { createContext, useState, useContext } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks.js";

const TaskContext = createContext();

//Este hook es para acceder al contexto de las tareas en cualquier parte de la aplicacion
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe estar dentro de un TaskProvider");
  }

  return context;
};



export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);
  
  const createTask = async (task) => {
    try {
      const savedTask = await createTaskRequest(task);
      setTasks((prevTasks) => [...prevTasks, savedTask.data]); // Actualiza el estado de las tareas
      return true;
    } catch (error) {
      console.log("error del create")
      console.log(error);
      setErrors(error.response.data);
      return false;
    }
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const getTask = async (id) => {
    try {
      const task = await getTaskRequest(id);
      return task.data;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
      return true;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      return false;
    }
  }
  return (
    <TaskContext.Provider
      value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask, errors }}
    >
      {children}
    </TaskContext.Provider>
  );
}
