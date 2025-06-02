import { createContext, useContext, useState } from "react";
import { createSubtasksRequest, getSubtasksRequest, updateSubtaskRequest } from "../api/subtasks.js";

const SubtaskContext = createContext();

export const useSubtasks = () => {
  const context = useContext(SubtaskContext);
  if (!context) {
    throw new Error("useSubtasks debe estar dentro de un SubtaskProvider");
  }
  return context;
};

export function SubtaskProvider({ children }) {
  const [subtasks, setSubtasks] = useState([]);

  const getSubtasks = async (id) => {
    try {
      const subtask = await getSubtasksRequest(id);
      setSubtasks(subtask.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createSubtask = async (subtask) => {
    try {
      const savedSubtask = await createSubtasksRequest(subtask);
      setSubtasks((prevSubtasks) => [...prevSubtasks, savedSubtask.data]);
      return true;
    } catch (error) {
      console.log("Error al crear una subtarea");
      console.log(error);
      return false;
    }
  };

  const updateSubtask = async (subtaskId, subtask) => {
    try {
      await updateSubtaskRequest(subtaskId, subtask)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <SubtaskContext.Provider value={{ subtasks, getSubtasks, createSubtask, updateSubtask }}>
      {children}
    </SubtaskContext.Provider>
  );
}
