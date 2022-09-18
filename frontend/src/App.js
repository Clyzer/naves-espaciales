import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import styled, { keyframes } from 'styled-components';
import DatePicker from  "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

/* Primero que nada importamos todas las librerias necesarias para el frontend, entre ellas la ultima que es necesaria para crear selectores de fechas dinamicos
   necesita un archivo css por lo que lo importamos tambien y luego mediante date-fns que se encarga de traducir las fechas registramos el idioma español*/
import "react-datepicker/dist/react-datepicker.css";
registerLocale('es', es)


// Como decidi mostrar los datos mediante una tabla para su facil lectura necesitaremos columnas que aqui se crean como una constante y se le agregan sus propiedades
const columnas = [
  {
    name: 'Nombre',
    selector: row => row.nombre,
    sortable: true,
    reorder: true
  },
  {
    name: 'Cumbustible',
    selector: row => row.combustible,
    sortable: true,
    reorder: true
  },
  {
    name: 'Pais',
    selector: row => row.pais,
    sortable: true,
    reorder: true
  },
  {
    name: 'Actividad',
    selector: row => row.actividad,
    sortable: true,
    reorder: true
  },
];

// Creamos una pequeña animación para mostrar mientras se cargan los datos de la base de datos
const Rotar360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Tambien le agregamos un estilo css y insertamos la animacion de arriba a la rueda de carga
const Ruedita = styled.div`
	margin: 16px;
	animation: ${Rotar360} 1s linear infinite;
	transform: translateZ(0);
	border-left: 4px solid skyblue;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

// Por ultimo creamos ahora si su compontente final y sus contenedores div estilizados con bootstrap
const Cargando = () => (
  <div style={{width: "min-content"}}>
    <Ruedita />
    <p className="text-center">Poniendonos en orbita...</p>
  </div>
);

// Aqui creamos un componente para mostrar si la tabla no tiene datos
const SinDatos = () => (
  <div>
    <br></br>
    <p className="text-center"><img src="/logo192.png" alt="Logo" width="40" height="40"/>Parece que nos quedamos sin datos...</p>
    <br></br>
  </div>
);

// Tambien hacemos un input que funcionara como parte externa de nuestro filtro, enviara los datos del texto que escribamos en el mediante el trigger onChange 
const Filtrador = ({ textoFiltrado, alFiltrar }) => (
	<>
		<Form.Control
			type="text"
			placeholder="Buscador"
			value={textoFiltrado}
			onChange={alFiltrar}
		/>
	</>
);

// Esta función es de las mas dificiles del proyecto, primero recibimos el tipo de nave para la cual crearemos la tabla
function CrearTabla(tipo) {
  // Luego declararemos constantes y sus metodos para poder cambiarlas mediante el Hook React.useState() para no tener que llenar de clases el codigo
  // La primera constante se encargara de avisar a la tabla cuando cargaron los datos
  const [pending, setPending] = React.useState(true);
  // Esta segunda contendra los datos en bruto que recibiremos de nuestro backend
  const [data, setRows] = React.useState([]);
  // Aqui guardaremos el texto del input declarado arriba para luego filtrar
  const [textoFiltrado, setTextoFiltrado] = React.useState('');
  // Por ultimo necesitamos este booleano para avisar a nuestra tabla que tiene que reiniciar los botones de paginación para actualizarlos segun vayamos filtrando
  const [reiniciarPaginacion, setResetPaginationToggle] = React.useState(false);


  // Utilizaremos React.useEffect() para imitar una llamada de manera sincrona en esta funcion asyncrona
  React.useEffect(() => {
    // Creamos un timeout pequeño ya que tampoco esperamos tener miles y miles de naves espaciales
    const timeout = setTimeout(() => {
      // Mediante la libreria Axios realizamos un get a nuestro backend con el tipo de nave espacial para que nos de un JSON con todas las naves de la tabla correspondiente
      Axios.get("http://localhost:3001/" + tipo).then((response) => {
        // Una vez recibidos los datos los guardaremos en la variable data
        setRows(response.data);
      });
      // Reciba o no los datos avisamos a la tabla que terminamos de cargar para que continue el thread
      setPending(false);
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Creamos una constante que utilizaremos para mostrar los datos y mediante los datos que ya tenemos en data aplicaremos los filtros correspondientes
     Lo que estamos obteniendo son todos los objetos que contengan en los campos nombre, combustible, pais o actividad un texto similar al que tenemos en el input
     En caso de que no tenga ningun texto se agregaran todos los datos recibidos de manera nativa */ 
  const ObjetosFiltrados = data.filter(item => item && (item.nombre.toLowerCase().includes(textoFiltrado.toLowerCase()) || item.combustible.toLowerCase().includes(textoFiltrado.toLowerCase()) || item.pais.toLowerCase().includes(textoFiltrado.toLowerCase()) || item.actividad.toLowerCase().includes(textoFiltrado.toLowerCase())),);

  /* Creamos un event handler llamado HeaderMemo que estara revisando si nuestro texto filtrado vuelve a estar vacio para reiniciar la paginacion y el string de nuestro filtro
     Ademas entregara el Filtrador (visual) que declaramos arriba con los datos y le ordenamos que llame a nuestras funciones una vez se activen dichos eventos */
  const HeaderMemo = React.useMemo(() => {
		const handleClear = () => {
			if (textoFiltrado) {
				setResetPaginationToggle(!reiniciarPaginacion);
				setTextoFiltrado('');
			}
		};

		return (
		  <Filtrador alFiltrar={e => setTextoFiltrado(e.target.value)} onClear={handleClear} textoFiltrado={textoFiltrado} />
		);
	}, [textoFiltrado, reiniciarPaginacion]);

  return (
    /* Por ultimo configuramos nuestra DataTable con las columnas, datos filtrados y componentes customizados que ya declaramos ademas de nuestras opciones */
    <DataTable
      columns={columnas}
      data={ObjetosFiltrados}
      direction="auto"
      defaultSortFieldId={4}
      defaultSortAsc={false}
      highlightOnHover
      /* Aqui tambien utilizaremos el evento de doble click para enviar una alerta de confirmación y en caso de que sea aceptada enviar a nuestro backend la id y tipo de nave
         del row por el cual fue llamado el evento para que nuestro backend se encargue de eliminarlo */
      onRowDoubleClicked={(row) => {
        if (window.confirm('¿Realmente quieres eliminar esta nave espacial?')) {
          Axios.get("http://localhost:3001/eliminar?tabla=" + tipo + "&id=" + row.id).then(() => {
            // En caso de que recibamos respuesta recargaremos la pagina para que se vean los cambios
            window.location.reload();
          });
        }
      }}
      pagination
      paginationComponentOptions={opcionesPaginacion}
      paginationResetDefaultPage={reiniciarPaginacion}
      noDataComponent={<SinDatos />}
      responsive
      subHeader
      subHeaderComponent={HeaderMemo}
      persistTableHead
      progressPending={pending}
      progressComponent={<Cargando />}
    />
  );
}

// Ajustamos algunas opciones de la libreria para que nos quede en perfecto español
const opcionesPaginacion = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

// Aqui tenemos nuestra función principal que se utiliza para redireccionar a los diferentes elementos primarios segun el path en el que nos encontremos
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirigir />} />
        <Route path="/lanzaderas" element={<Lanzaderas />} />
        <Route path="/tripuladas" element={<Tripuladas />} />
        <Route path="/notripuladas" element={<NoTripuladas />} />
        <Route path="/crear" element={<PaginaCreador />} />
      </Routes>
    </BrowserRouter>
  );
}

// Estas constantes las cree para agregar unos styles que fui necesitando para que quede a mi gusto el frontend
const blanco = {
  color: "white"
};
const negro = {
  color: "black"
};
const padding = {
  paddingRight: 10
};

// Esta es la funcion primaria que siempre se mantiene alrededor del backend, es nuestro header que contiene nuestro logo y menu
function Navegador(actual) {
  // Si estamos en la vista general necesitamos que se agregue la class active en nuestros navlinks para que resalten y de manera visual sepamos donde estamos ubicados
  if (actual === "lanzaderas" || actual === "tripuladas" || actual === "notripuladas"){
    return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            <img src="/logo192.png" alt="Logo" width="40" height="40"/>Naves Espaciales
          </Navbar.Brand>
          <Nav variant="pills">
            <Nav.Item style={padding}>
              {/* Este boton enviara siempre el tipo de nave espacial que la tabla esta renderizando para que el boton nos mantenga en el mismo lugar y no se
                  de prioridad a ningun tipo de nave sobre las demas */}
              <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={"/" + actual} style={ ({ isActive }) => (isActive ? blanco : negro) }>Vista general</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/crear" style={ ({ isActive }) => (isActive ? blanco : negro) }>Agregar nave</NavLink>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            <img src="/logo192.png" alt="Logo" width="40" height="40"/>Naves Espaciales
          </Navbar.Brand>
          <Nav variant="pills">
            <Nav.Item style={padding}>
              {/* En caso de que no estemos en la vista general el boton nos mandara a las lanzaderas ya que se encuentra en "el medio" entre los tipos de nave */}
              <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/lanzaderas" style={ ({ isActive }) => (isActive ? blanco : negro) }>Vista general</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/crear" style={ ({ isActive }) => (isActive ? blanco : negro) }>Agregar nave</NavLink>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
  }
};

// Esta es la redireccion principal ya que nos enviara desde http://localhost:3000/ a las lanzaderas que se considera el "centro" entre los tipos de nave
const Redirigir = () => {
  return (
    <Navigate to="lanzaderas" />
  );
};

// Aqui agrego un par de styles que utilizare mas adelante para que quede a mi gusto el frontend
const linknavegador = {
  color: "var(--bs-heading-color)",
  textDecoration: "none"
};
const margetabla = {
  marginBottom: 100
}

// Esta constante en forma de funcion se utiliza para devolvernos un render de la pagina en caso de que estemos en la vista general y el tipo de nave sea lanzaderas
const Lanzaderas = () => {
  return (
    // Primero creamos un div maestro y aqui agregamos nuestro header con el dato de que estamos en "lanzaderas"
    <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("lanzaderas")}
      {/* Tambien creamos los botones de navegacion alrededor del titulo de la tabla que estamos renderizando */}
      <div className="nav-link text-center"><h2><NavLink style={linknavegador} to="/tripuladas"> {'< '}</NavLink>Lanzaderas<NavLink style={linknavegador} to="/notripuladas"> {'>'}</NavLink></h2></div>
      <br></br><br></br>
      <div className="tabla border rounded" style={margetabla}>
        {/* Por ultimo mandamos a renderizar la tabla enviando el dato que estamos en "lanzaderas" */}
        {CrearTabla("lanzaderas")}
      </div>
    </div>
  );
};

// Esta constante en forma de funcion se utiliza para devolvernos un render de la pagina en caso de que estemos en la vista general y el tipo de nave sea naves tripuladas
const Tripuladas = () => {
  return (
    // Primero creamos un div maestro y aqui agregamos nuestro header con el dato de que estamos en "tripuladas"
    <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("tripuladas")}
      {/* Tambien creamos el boton de navegacion a la derecha del titulo de la tabla que estamos renderizando para ir a "lanzaderas" */}
      <div className="nav-link text-center"><h2>Tripuladas<NavLink style={linknavegador} to="/lanzaderas"> {'>'}</NavLink></h2></div>
      <br></br><br></br>
      <div className="tabla border rounded" style={margetabla}>
        {/* Por ultimo mandamos a renderizar la tabla enviando el dato que estamos en "tripuladas" */}
        {CrearTabla("tripuladas")}
      </div>
    </div>
  );
};

// Esta constante en forma de funcion se utiliza para devolvernos un render de la pagina en caso de que estemos en la vista general y el tipo de nave sea naves no tripuladas
const NoTripuladas = () => {
  return (
    // Primero creamos un div maestro y aqui agregamos nuestro header con el dato de que estamos en "notripuladas"
    <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("notripuladas")}
      {/* Tambien creamos el boton de navegacion a la izquierda del titulo de la tabla que estamos renderizando para ir a "lanzaderas" */}
      <div className="nav-link text-center"><h2><NavLink style={linknavegador} to="/lanzaderas"> {'< '}</NavLink>No Tripuladas</h2></div>
        <br></br><br></br>
        <div className="tabla border rounded" style={margetabla}>
        {/* Por ultimo mandamos a renderizar la tabla enviando el dato que estamos en "notripuladas" */}
        {CrearTabla("notripuladas")}
      </div>
    </div>
  );
};

// Creamos el selector de fechas (por año) para el creador de naves espaciales utilizando la libreria que importamos al principio del programa

const SelectorAños = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  return (
    <div className="form-control">
      <DatePicker
        className="form-control"
        id="desde"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        showYearPicker
        dateFormat="yyyy"
        locale="es"
      />
      <DatePicker
        className="form-control"
        id="hasta"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        showYearPicker
        dateFormat="yyyy"
        locale="es"
      />
    </div>
  );
};

// Esta constante en forma de funcion se utiliza para devolvernos un render de la pagina en caso de que estemos en el creador de naves espaciales
const PaginaCreador = () => {
  // Primero definimos la funcion que utilizaremos para enviar los datos del form mediante GET al backend para que los agregue a la base de datos
  function enviar(){
    // Realizamos unos pequeños chequeos para asegurarnos de que los datos estan siendo enviados de manera correcta
    if (document.getElementById("tipo").value && document.getElementById("nombre").value && document.getElementById("combustible").value && document.getElementById("pais").value && document.getElementById("desde").value && document.getElementById("hasta").value) {
      var actividad = "";
      if (document.getElementById("desde").value === document.getElementById("hasta").value){
        actividad = document.getElementById("hasta").value + "-Act";
      } else {
        actividad = document.getElementById("desde").value + "-" + document.getElementById("hasta").value;
      }
      var tipo = document.getElementById("tipo").value + "s";
      var combustible = document.getElementById("combustible").value;
      var nombre = document.getElementById("nombre").value;
      var pais = document.getElementById("pais").value;
      // Aqui realizamos el envio de datos mediante GET mediante Axios
      Axios.get("http://localhost:3001/agregar?tabla=" + tipo + "&nombre=" + nombre + "&combustible=" + combustible + "&pais=" + pais + "&actividad=" + actividad).then((response) => {
        // Una ves recibimos la respuesta enviamos una alerta avisando que la nave espacial fue enviada correctamente
        window.alert("Nave espacial agregada con exito.");
      });
    } else {
      // En caso de que los datos no fueron ingresados de manera correcta tambien se avisara mediante una alerta
      window.alert("Debe ingresar todos los datos antes de tocar este boton.")
    }
  }
  // Por ultimo ahora si devolvemos el formulario (y el header) para renderizar ademas de que hacemos que el formulario al activar el evento onSubmit llame a la funcion de arriba
  return (
    <div>
      <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("creador")}
        <div className="content">
          <h2 className="text-center">Agregar nave espacial</h2>
        </div>
      </div>
      <div className="col-lg-4 mx-auto p-4 py-md-1 border" style={margetabla}>
        <br></br>
        {/* eslint-disable-next-line */}
        <form onSubmit={enviar}>
          <div className="form-outline mb-4">
            <label className="form-label">Tipo de nave espacial:</label>
            <select id="tipo" className="form-select">
              <option value="lanzadera">Lanzadera</option>
              <option value="tripulada">Tripulada</option>
              <option value="notripulada">No tripulada</option>
            </select>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Nombre:</label>
            <input id="nombre" type="text"className="form-control"/>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Combustible:</label>
            <select id="combustible" className="form-select">
              <option value="Liquido">Liquido</option>
              <option value="Sólido">Sólido</option>
              <option value="SólidoLiquido">Sólido + Liquido</option>
            </select>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">País:</label>
            <input id="pais" type="text" className="form-control"/>
          </div>
          <div className="form-outline mb-4">
            <div className="input-group">
              <span className="input-group-text">Desde<br></br><br></br>Hasta</span>
              <SelectorAños />
            </div>
          </div>
          <button className="btn btn-primary btn-block mb-4">Agregar</button>
        </form>
      </div>
    </div>
  );
};

// Por ultimo exportamos la clase principal que contiene todos los route a las diferentes versiones del programa para ser renderizado en el DOM en index.js
export default App;