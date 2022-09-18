const Pool = require("pg").Pool
// Cambiar aqui los datos por los de tu base de datos postgresql en caso de que sea necesario.
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
})

/* Utilizaremos postgresql (https://www.postgresql.org/download/) como base de datos relaciónal
   decidi utilizarlo porque aprendi con el ademas de que puede realizar querys asyncronos sin mucho problema
   ademas de la facil instalación en el sistema mediante su pagina web oficial y de manera gratuita. */

// Explortamos la constante con el objeto que ya esta configurado para realizar conexiones a la base de datos
module.exports = {
    query: (text, params) => pool.query(text, params),
}