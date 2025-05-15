import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  // Logic for user registration
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json(userSaved);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json(["El correo ya existe"]);
    }
    return res.status(500).json(["Error al registrar el usuario"]);
  }
};

export const login = async (req, res) => {
  // Logic for user login+
  const { email, password } = req.body;

  try {
    //buscar al usuario si existe
    const userFound = await User.findOne({ email }); //buscar el usuario por email
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    //comparar la contraseña
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

    //crear el token
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json(["Error al iniciar sesión"]);
  }
};

export const logout = (req, res) => {
  // Logic for user logout
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(404).json(["Usuario no encontrado"]);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return res.status(500).json(["Error al obtener el perfil del usuario"]);
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json(["No autorizado"]);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["No autorizado"]);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json(["No autorizado"]);

    return res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  });
};
