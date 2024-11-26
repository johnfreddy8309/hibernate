const express = require('express'); // framework web para Node.js
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitudes
const cors = require('cors'); //Middlenar para habilitar CORD (Cross-Origin Resource Sharing)
const mysql = require('mysql2/promise'); // Cliente MySQL con soporte para promesas

const app = express(); // Crear una instancia de la aplicacion express
const port = 3001; // Definir el puerto en el que correra el servidor

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Crear la conexion al pool de la base de datos
const connection = mysql.createPool({
  host: 'localhost', // Direccion del host de la base de datos
  user: 'root', // Usuario de la base de datos
  password: '', // Contraseña de la base de datos
  database: 'horizontes', // Nombre de la base de datos
});

// Ruta principal para la raiz del servidor
app.get('/', (req, res) => {
  res.send('Hello World!'); // Responder con hello world a la solicitud Get
});

// Ruta para el inicio de sesion
app.get('/login', async (req, res) => {
  const datos = req.query;

  try {
    // Ejecutar la consulta para verificar las credenciales del usuario
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuario` WHERE `usuario` = ? AND `clave` = ?",
      [datos.usuario, datos.clave]
    );

    if (results.length > 0) {
      // Si se encuentran coincidencias , responder con exito
      res.status(200).send('Inicio de sesión correcto');
    } else {
      // Si no se encuentran coincidencias , responder con error de autenticacion
      res.status(401).send('Datos incorrectos');
    }

    console.log(results); // Imprimir los resultados devueltos por la consulta
    console.log(fields); // Imprimir la meta sobre los resultados
  } catch (err) {
    console.error(err); // Imprimir el error en la consola
    res.status(500).send('Error en el servidor'); // Responder con error del servidor
  }
});

// Ruta para validar la sesion
app.get('/validar', (req, res) => {
  res.send('Sesión validada'); // Responder con "Sesion validada" a las solicitudes Get
});

// Endpoint para el registro de usuario
app.post('/registro', async (req, res) => {
  // Desestructurar los datos del cuerpo de la solicitud POST
  const {
    tipo_identificacion_id,
    identificacion,
    nombre_completo,
    telefono,
    celular,
    correo_electronico,
    contraseña,
    direccion,
    departamento_id,
    municipio_id,
    estado,
  } = req.body;

  try {
    // Definir la consulta de insercion de un nuevo usuario
    const query = `
      INSERT INTO tb_usuarios (
        tipo_identificacion_id, identificacion, nombre_completo, telefono,
        celular, correo_electronico, contrasena, direccion,
        departamento_id, municipio_id, estado
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Asignar los valores ala consulta
    const values = [
      tipo_identificacion_id,
      identificacion,
      nombre_completo,
      telefono,
      celular,
      correo_electronico,
      contraseña,
      direccion,
      departamento_id,
      municipio_id,
      estado,
    ];
    // Ejecutar la consulta se insercion 
    await connection.query(query, values);
    res.status(201).send('Usuario registrado exitosamente'); // Responder con exito
  } catch (error) {
    console.error(error); // Imprimir error en la consola
    res.status(500).send('Error al registrar el usuario'); // Responder con error del servidor
  }
});

// Iniciar el servidor en el puerto definido
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
