import mongoose from 'mongoose';
import app from './app.js';

const port = Number(process.env.PORT || 3000);
const uri = process.env.MONGO_URI;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;

if (!uri || !user || !pass) {
  console.error('Faltan MONGO_URI, MONGO_USER o MONGO_PASSWORD en .env.');
  process.exit(1);
}

try {
  await mongoose.connect(uri, { user, pass, serverSelectionTimeoutMS: 8000 });
  console.log('Conectado a MongoDB Atlas.');
  app.listen(port, () => console.log(`API: http://localhost:${port}`));
} catch (error) {
  console.error('No se pudo conectar a MongoDB Atlas:', error.message);
  process.exit(1);
}
