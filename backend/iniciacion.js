const db = require('./db')

const start = () => {

    /* Esta es la parte mas engorosa del codigo, ya que necesitaba agregar datos de prueba iniciales (ademas de que son necesarios para el test)
       tuve que realizar muchisimas querys y ya que se ejecutan de manera asyncrona tuve que unirlos a las respuestas de anteriores llamadas
       para realizar diferentes chequeos, como que el schem o las tablas esten creadas antes de intentar agregarles datos para no saturarlos ni duplicarlos 
       esta primera query sirve como base para crear la schema en caso de que no exista y apartir de ahi crear las tablas seguidos de sus datos 
       dividi todo en varias funciones para una lectura un poco mas facil */
    db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = 'clyzer';", (err, res) => {
        if (res.rowCount == 0) {
            db.query("CREATE SCHEMA IF NOT EXISTS clyzer AUTHORIZATION postgres;", (err) => {
                console.log(err ? err.stack : "Creado schema.")
                creardatoslanzaderas();
                creardatostripuladas();
                creardatosnotripuladas();
            })
        } else {
            console.log(err ? err.stack : "El schema ya esta creado.")
            creardatoslanzaderas();
            creardatostripuladas();
            creardatosnotripuladas();
        }
    })

    /* Esta funcion es llamada desde la primera query y se encarga de agregar la tabla de lanzaderas y sus datos en caso de que no esten agregados desde antes
       si lo que se busca es recrear los datos se necesita borrar la tabla desde tu gestor de base de datos (PG Admin 4, etc) o el schema completo */
    function creardatoslanzaderas() {
        db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'lanzaderas';", (err, res) => {
            if (res.rowCount == 0) {
                db.query("CREATE TABLE IF NOT EXISTS clyzer.lanzaderas (id serial, nombre text, combustible text, pais text, actividad text, PRIMARY KEY (id));", (err) => {
                    console.log(err ? err.stack : "Creada tabla lanzaderas")
                    // Agregado de datos de lanzaderas de EEUU
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Saturno V', 'Liquido', 'EEUU', '1967-1973');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Transbordador espacial', 'S??lido + Liquido', 'EEUU', '1981-2011');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Atlas V', 'Liquido', 'EEUU', '2002-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Delta IV', 'Liquido', 'EEUU', '2002-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Falcon IX', 'Liquido', 'EEUU', '2010-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de lanzaderas de Rusia/Ucrania
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Energ??a', 'Liquido', 'Rusia/Ucrania', '1987-1988');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Prot??n', 'Liquido', 'Rusia/Ucrania', '2001-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Zenit II', 'Liquido', 'Rusia/Ucrania', '1985-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Soyuz 2', 'Liquido', 'Rusia/Ucrania', '2006-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Soyuz U', 'Liquido', 'Rusia/Ucrania', '1973-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de lanzaderas de Europa
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Ariane V', 'S??lido + Liquido', 'Europa', '1996-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de lanzaderas de Jap??n
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'H-IIA', 'S??lido + Liquido', 'Jap??n', '2001-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de lanzaderas de China
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Larga Marcha 3B', 'Liquido', 'China', '1996-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.lanzaderas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Larga Marcha 2F', 'Liquido', 'China', '1999-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                })
            } else {
                console.log(err ? err.stack : "La tabla lanzaderas ya esta creada.")
            }
        })
    }

    /* Esta funcion es llamada desde la primera query y se encarga de agregar la tabla de naves tripuladas y sus datos en caso de que no esten agregados desde antes
       si lo que se busca es recrear los datos se necesita borrar la tabla desde tu gestor de base de datos (PG Admin 4, etc) o el schema completo */

    function creardatostripuladas() {
        db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'tripuladas';", (err, res) => {
            if (res.rowCount == 0) {
                db.query("CREATE TABLE IF NOT EXISTS clyzer.tripuladas (id serial, nombre text, combustible text, pais text, actividad text, PRIMARY KEY (id));", (err) => {
                    console.log(err ? err.stack : "Creada tabla tripuladas")
                    // Agregado de datos de naves tripuladas de EEUU
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Dragon V2', 'S??lido', 'EEUU', '2016-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Apolo', 'Liquido', 'EEUU', '1966-1975');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'M??dulo Lunar', 'Liquido', 'EEUU', '1968-1972');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Gemini', 'S??lido', 'EEUU', '1964-1966');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mercury', 'Ninguno', 'EEUU', '1959-1963');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Orbitador del T.E.', 'Liquido', 'EEUU', '1981-2011');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Unid. Maniobra tripulada', 'Ninguno', 'EEUU', '1987-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Skylab', 'Ninguno', 'EEUU', '1973-1979');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de naves tripuladas de Rusia
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Vostok', 'Liquido', 'Rusia', '1960-1963');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Voskhod', 'Liquido', 'Rusia', '1964-1965');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Soyuz', 'Liquido', 'Rusia', '1967-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mir', 'Ninguno', 'Rusia', '1986-2001');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Salyut', 'Ninguno', 'Rusia', '1982-1991');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de naves tripuladas internacionales
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'EEI', 'Ninguno', 'Internacional', '1998-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de naves tripuladas de China
                    db.query("INSERT INTO clyzer.tripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Shenzou', 'Liquido', 'China', '1999-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                })
            } else {
                console.log(err ? err.stack : "La tabla tripuladas ya esta creada.")
            }
        })
    }

    /* Esta funcion es llamada desde la primera query y se encarga de agregar la tabla de naves no tripuladas y sus datos en caso de que no esten agregados desde antes
       si lo que se busca es recrear los datos se necesita borrar la tabla desde tu gestor de base de datos (PG Admin 4, etc) o el schema completo */

    function creardatosnotripuladas(){
        db.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'notripuladas';", (err, res) => {
            if (res.rowCount == 0) {
                db.query("CREATE TABLE IF NOT EXISTS clyzer.notripuladas (id serial, nombre text, combustible text, pais text, actividad text, PRIMARY KEY (id));", (err) => {
                    console.log(err ? err.stack : "Creada tabla notripuladas")
                    // Agregado de datos de naves no tripuladas de EEUU
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Explorer', 'Ninguno', 'EEUU', '1958-1970');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Surveyor', 'S??lido + Liquido', 'EEUU', '1966-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Galileo', 'Liquido', 'EEUU', '1989-1995');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mariner IV', 'Liquido', 'EEUU', '1965-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mariner IX', 'Liquido', 'EEUU', '1971-2060');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mariner X', 'Liquido', 'EEUU', '1973-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Pionero de Marte', 'Ninguno', 'EEUU', '1996-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Nuevos Horizontes', 'Liquido', 'EEUU', '2006-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Mensajero', 'Liquido', 'EEUU', '2004-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Pionero X', 'Liquido', 'EEUU', '1972-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Pionero XI', 'Liquido', 'EEUU', '1973-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Vikingo I', 'Liquido', 'EEUU', '1975-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Viajero II', 'Ninguno', 'EEUU', '1977-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Helios I', 'Ninguno', 'EEUU', '2009-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Helios II', 'Ninguno', 'EEUU', '2009-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Curiosidad', 'Liquido', 'EEUU', '2011-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de naves no tripuladas de Rusia
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Progreso M', 'Liquido', 'Rusia', '1989-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Sputnik', 'Ninguno', 'Rusia', '1957-1958');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Luna I', 'Ninguno', 'Rusia', '1959-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Luna IX', 'Liquido', 'Rusia', '1966-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Venera IV', 'Ninguno', 'Rusia', '1967-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'Venera IX', 'Ninguno', 'Rusia', '1975-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                    // Agregado de datos de naves no tripuladas de Europa
                    db.query("INSERT INTO clyzer.notripuladas(id, nombre, combustible, pais, actividad) VALUES (DEFAULT, 'ATV', 'Liquido', 'Europa', '2008-Act');", (err) => {
                        if (err){
                            console.log(err.stack)
                        }
                    })
                })
            } else {
                console.log(err ? err.stack : "La tabla notripuladas ya esta creada.")
            }
        })
    }
}

// Por ultimo se configura para que la funcion start se inicie automaticamente al ser llamada desde index

module.exports = start()