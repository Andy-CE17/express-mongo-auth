# Express + MongoDB Atlas

API de usuarios del Laboratorio 08. Usa Express, Mongoose y MongoDB Atlas. El servidor escucha solo después de conectarse a la base de datos.

1. Ejecuta `npm install`.
2. Copia `.env.example` como `.env` y escribe la contraseña de `lab08_app` en `MONGO_PASSWORD`.
3. Ejecuta `npm run dev`.
4. En Postman prueba `GET http://localhost:3000/api/health` y `GET http://localhost:3000/api/users`.

Para crear un usuario: `POST http://localhost:3000/api/users`, encabezado `Content-Type: application/json`, cuerpo `{"name":"Usuario Demo","email":"demo@example.com"}`. Para consultar, actualizar o eliminar uno, usa `GET`, `PUT` o `DELETE` en `/api/users/:id`.

La contraseña permanece en `.env`, excluido de Git. La base `my_cloud_database` aparece en Compass después de insertar el primer documento.
