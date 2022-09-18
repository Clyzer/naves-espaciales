// Se llama a nuestro archivo iniciacion.js y realiza su funcion predeterminada start()
require("./iniciacion")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
// Se llama a nuestro archivo db.js y se guarda en la variable db para recibir la constante con el pool listo y configurado para los querys necesarios
const db = require("./db")
const app = express()

// Se usa la libreria BodyParser para transformar los GET en JSON facilmente
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Utilizo CORS para que no me bloquen por motivos de seguridad en las llamadas GET
app.use(cors())

// Utilizo Express.json para enviar JSON como respuestas
app.use(express.json())

// Interface simple que envia el estado de la API
app.get('/', (_request, response) => {
  response.json({ info: "Funcionando" })
})

/* Interface que se utiliza para agregar a la base de datos una nueva nave espacial con los datos recibidos mediante GET que envia el frontend al completar el formulario
   Tambien se realizan diversos chequeos para asegurarse que la base de datos no se contamine en caso de errores en los datos recibidos por GET */
app.get('/agregar', (request, response) => {
  if (!request.query.tabla || !request.query.nombre || !request.query.combustible || !request.query.pais || !request.query.actividad){
    response.json({ error: "Error al agregar la nave a la base de datos. (Faltan datos)" })
  } else {
    if (request.query.tabla == "lanzaderas" || request.query.tabla == "notripuladas" || request.query.tabla == "tripuladas"){
      var combustible = request.query.combustible;
      if (combustible === "SólidoLiquido"){
        combustible = "Sólido + Liquido";
      }
      db.query("INSERT INTO clyzer."+ request.query.tabla + "(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, '"+ request.query.nombre + "', '" + combustible + "', '" + request.query.pais + "', '" + request.query.actividad + "');", (err) => {
        if (err){
          console.log(err.stack)
        } else {
          response.json({ success: "Nave agregada correctamente a la base de datos." })
        }
      })
    } else {
      response.json({ error: "Error al agregar la nave a la base de datos. (Tipo de nave incorrecto)" })
    }
  }
})

// Interface para eliminar de la base de datos las naves espaciales mediante la id recibida por GET que envia el frontend al darle doble click a la nave y confirmar

app.get('/eliminar', (request, response) => {
  if (!request.query.tabla || !request.query.id){
    response.json({ error: "Error al borrar la nave de la base de datos. (Faltan datos)" })
  } else {
    db.query("DELETE FROM clyzer." + request.query.tabla + " WHERE id = " + request.query.id + ";", (err) => {
      if (err){
        console.log(err.stack)
      } else {
        response.json({ success: "Nave eliminada correctamente de la base de datos." })
      }
    })
  }
})

// Interface que envia un JSON con todos los datos de las lanzaderas

app.get('/lanzaderas', (_request, response) => {
  db.query("SELECT * FROM clyzer.lanzaderas;", (_err, res) => {
    response.json(res.rows)
  })
})

// Interface que envia un JSON con todos los datos de las naves no tripuladas

app.get('/notripuladas', (_request, response) => {
  db.query("SELECT * FROM clyzer.notripuladas;", (_err, res) => {
    response.json(res.rows)
  })
})

// Interface que envia un JSON con todos los datos de las naves tripuladas

app.get('/tripuladas', (_request, response) => {
  db.query("SELECT * FROM clyzer.tripuladas;", (_err, res) => {
    response.json(res.rows)
  })
})

// Iniciacion del servidor en el puerto 3001 con las interfaces ya configuradas

app.listen(3001, () => {
  console.log("Funcionando en el puerto 3001")
});
