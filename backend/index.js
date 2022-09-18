require("./iniciacion")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./db")
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())
app.use(express.json())

app.get('/', (_request, response) => {
  response.json({ info: "Funcionando" })
})

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

app.get('/lanzaderas', (_request, response) => {
  db.query("SELECT * FROM clyzer.lanzaderas;", (_err, res) => {
    response.json(res.rows)
  })
})

app.get('/notripuladas', (_request, response) => {
  db.query("SELECT * FROM clyzer.notripuladas;", (_err, res) => {
    response.json(res.rows)
  })
})

app.get('/tripuladas', (_request, response) => {
  db.query("SELECT * FROM clyzer.tripuladas;", (_err, res) => {
    response.json(res.rows)
  })
})

app.listen(3001, () => {
  console.log("Funcionando en el puerto 3001")
});
