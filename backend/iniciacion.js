const db = require('./db')

const start = () => {
    db.query("CREATE SCHEMA IF NOT EXISTS clyzer AUTHORIZATION postgres;", (err, res) => {
        console.log(err ? err.stack : res.command)
    })
    
    db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'lanzaderas';", (err, res) => {
        console.log(err ? err.stack : res.command)
        if (res.rowCount == 0) {
            db.query("CREATE TABLE IF NOT EXISTS clyzer.lanzaderas (id serial, nombre text, combustible text, pais text, actividad text, PRIMARY KEY (id));", (err, res) => {
                console.log(err ? err.stack : res.command)
                // Agregado de datos de lanzaderas de EEUU
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Saturno V', 'Liquido', 'EEUU', '1967-1973');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Transbordador espacial', 'Sólido + Liquido', 'EEUU', '1981-2011');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Atlas V', 'Liquido', 'EEUU', '2002-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Delta IV', 'Liquido', 'EEUU', '2002-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Falcon IX', 'Liquido', 'EEUU', '2010-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                // Agregado de datos de lanzaderas de Rusia/Ucrania
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Energía', 'Liquido', 'Rusia/Ucrania', '1987-1988');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Protón', 'Liquido', 'Rusia/Ucrania', '2001-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Zenit II', 'Liquido', 'Rusia/Ucrania', '1985-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Soyuz 2', 'Liquido', 'Rusia/Ucrania', '2006-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Soyuz U', 'Liquido', 'Rusia/Ucrania', '1973-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                // Agregado de datos de lanzaderas de Europa
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Ariane V', 'Sólido + Liquido', 'Europa', '1996-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                // Agregado de datos de lanzaderas de Japón
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'H-IIA', 'Sólido + Liquido', 'Japón', '2001-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                // Agregado de datos de lanzaderas de China
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Larga Marcha 3B', 'Liquido', 'China', '1996-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Larga Marcha 2F', 'Liquido', 'China', '1999-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
            })
        }
    })

    db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'notripuladas';", (err, res) => {
        console.log(err ? err.stack : res.command)
        if (res.rowCount == 0) {
            db.query("CREATE TABLE IF NOT EXISTS clyzer.notripuladas (id serial, nombre text, combustible text, pais text, actividad text, PRIMARY KEY (id));", (err, res) => {
                console.log(err ? err.stack : res.command)
                // Agregado de datos de naves no tripuladas de EEUU
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Explorer', 'Liquido', 'EEUU', '1958-1970');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Surveyor', 'Sólido + Liquido', 'EEUU', '1966-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Galileo', 'Liquido', 'EEUU', '1989-1995');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mariner IV', 'Liquido', 'EEUU', '1965-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mariner IX', 'Liquido', 'EEUU', '1971-2060');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mariner X', 'Liquido', 'EEUU', '1973-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Pionero de Marte', 'Liquido', 'EEUU', '1996-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Nuevos Horizontes', 'Liquido', 'EEUU', '2006-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mensajero', 'Liquido', 'EEUU', '2004-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Pionero X', 'Liquido', 'EEUU', '1972-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Pionero XI', 'Liquido', 'EEUU', '1973-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Vikingo I', 'Liquido', 'EEUU', '1975-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Viajero II', 'Liquido', 'EEUU', '1977-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Helios I', 'Liquido', 'EEUU', '2009-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Helios II', 'Liquido', 'EEUU', '2009-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Curiosidad', 'Liquido', 'EEUU', '2011-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                // Agregado de datos de naves no tripuladas de Rusia
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Progreso M', 'Liquido', 'Rusia', '1989-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Sputnik', 'Liquido', 'Rusia', '1957-1958');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Luna I', 'Liquido', 'Rusia', '1959-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Luna IX', 'Liquido', 'Rusia', '1966-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Venera IV', 'Liquido', 'Rusia', '1967');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Venera IX', 'Liquido', 'Rusia', '1975');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
                // Agregado de datos de naves no tripuladas de Europa
                db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'ATV', 'Liquido', 'Europa', '2008-Act');", (err, res) => {
                    console.log(err ? err.stack : res.command)
                })
            })
        }
    })
    
    db.query("CREATE TABLE IF NOT EXISTS clyzer.tripuladas (id serial, nombre text, combustible text, pais text, actividad text, PRIMARY KEY (id));", (err, res) => {
        console.log(err ? err.stack : res.command)
    })
}

module.exports = start()