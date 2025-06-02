import axios from "./axios";

export const getSubtasksRequest = (id) => axios.get(`/tasks/${id}/subtasks`)
export const createSubtasksRequest = (id, subtask) => axios.post(`/tasks/${id}/subtasks`, subtask)
export const updateSubtaskRequest = (id, subtask) => axios.put(`/subtask/${id}`, subtask)