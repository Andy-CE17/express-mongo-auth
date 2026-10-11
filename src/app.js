import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || false }));
app.use(express.json({ limit: '32kb' }));
app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'API CRUD de usuarios',
    documentation: {
      health: '/api/health',
      users: '/api/users',
    },
  });
});
app.get('/api/health', async (_req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ ok: true, database: 'Atlas conectado' });
  } catch {
    res.status(503).json({ ok: false, database: 'Atlas no disponible' });
  }
});
app.use('/api/users', userRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Ruta no encontrada.' }));

export default app;
