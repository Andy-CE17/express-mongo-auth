import mongoose from 'mongoose';
import { userService } from '../services/userService.js';

const validUser = (body) =>
  body &&
  typeof body.name === 'string' &&
  body.name.trim().length > 0 &&
  body.name.trim().length <= 120 &&
  typeof body.email === 'string' &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim());

const handleError = (error, res) => {
  if (error?.code === 11000) {
    return res.status(409).json({ message: 'El correo ya está registrado.' });
  }
  if (error?.name === 'ValidationError') {
    return res.status(400).json({ message: 'Nombre o correo inválido.' });
  }
  console.error('Error de usuarios:', error?.message);
  return res.status(500).json({ message: 'Error interno del servidor.' });
};

const validId = (id, res) => {
  if (mongoose.isValidObjectId(id)) return true;
  res.status(400).json({ message: 'ID inválido.' });
  return false;
};

export const userController = {
  async getAll(_req, res) {
    try {
      return res.json(await userService.getAll());
    } catch (error) {
      return handleError(error, res);
    }
  },
  async getById(req, res) {
    if (!validId(req.params.id, res)) return;
    try {
      const user = await userService.getById(req.params.id);
      return user ? res.json(user) : res.status(404).json({ message: 'Usuario no encontrado.' });
    } catch (error) {
      return handleError(error, res);
    }
  },
  async create(req, res) {
    if (!validUser(req.body)) return res.status(400).json({ message: 'Nombre o correo inválido.' });
    try {
      const user = await userService.create({ name: req.body.name, email: req.body.email });
      return res.status(201).json(user);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async update(req, res) {
    if (!validId(req.params.id, res)) return;
    if (!validUser(req.body)) return res.status(400).json({ message: 'Nombre o correo inválido.' });
    try {
      const user = await userService.update(req.params.id, {
        name: req.body.name,
        email: req.body.email,
      });
      return user ? res.json(user) : res.status(404).json({ message: 'Usuario no encontrado.' });
    } catch (error) {
      return handleError(error, res);
    }
  },
  async remove(req, res) {
    if (!validId(req.params.id, res)) return;
    try {
      const user = await userService.remove(req.params.id);
      return user ? res.status(204).end() : res.status(404).json({ message: 'Usuario no encontrado.' });
    } catch (error) {
      return handleError(error, res);
    }
  },
};
