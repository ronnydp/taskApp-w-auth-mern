import Subtask from "../models/subtask.model.js";

export const getSubtasks = async (req, res) => {
  try {
    const subtasks = await Subtask.find({ taskId: req.params.id })
      .populate("taskId")
      .sort({ createdAt: -1 });
    if (!subtasks) {
      return res.status(404).json(["No hay subtareas."]);
    }
    console.log(subtasks);
    return res.status(200).json(subtasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error al listar las subtareas");
  }
};
export const createSubtask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newSubtask = new Subtask({
      title,
      description,
      date,
      taskId: req.params.id,
    });
    const savedSubtask = await newSubtask.save();
    console.log(savedSubtask);
    return res.status(201).json(savedSubtask);
  } catch (error) {
    console.log(error);
    return res.status(500).json(["Error al crear la subtarea."]);
  }
};
export const getSubtask = async (req, res) => {};
export const deleteSubtasks = async (req, res) => {};
export const updateSubtasks = async (req, res) => {
  try {
    const updateSubtask = await Subtask.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    if (!updateSubtask) return res.status(404).json("Subtarea no encontrada");
    return res.json(updateSubtask);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error al actualizar la subtarea");
  }
};
