const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Naves"
})

app.get("/", (req, res) => {
    res.send("Funcionando");
});

app.listen(3001, () => {
    console.log("Funcionando en el puerto 3001")
});