require('./iniciacion');
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db')
const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Funcionando' })
  })

app.listen(3001, () => {
    console.log("Funcionando en el puerto 3001")
});
