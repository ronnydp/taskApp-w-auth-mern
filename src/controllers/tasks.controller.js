import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate("user").sort({createAt: -1});
  if (!tasks) {
    return res.status(404).json(["No hay tareas"]);
  }
  return res.status(200).json(tasks);
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id, // id del usuario que creó la tarea
    });
    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    console.log(error)
    return res.status(500).json(["Error al crear la tarea"]);
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json(["Tarea no encontrada."]);
    return res.json(task);
  } catch (error) {
    return res.status(500).json(["Error al obtener la tarea"]);
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!task) return res.status(404).json(["Tarea no encontrada."]);
    return res.json(task);
  } catch (error) {
    console.log(error)
    return res.status(500).json(["Error al actualizar la tarea"]);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id, {
      new: true, // para devolver el nuevo objeto
    });
    if (!task) return res.status(404).json(["Tarea no encontrada."]);
    return res.status(204).json(task);
  } catch (error) {
    console.log(error)
    return res.status(500).json(["Error al eliminar la tarea"]);
  }
};
