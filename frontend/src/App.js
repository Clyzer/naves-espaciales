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

import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es)

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

const Rotar360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Ruedita = styled.div`
	margin: 16px;
	animation: ${Rotar360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid light grey;
	border-right: 2px solid light grey;
	border-bottom: 2px solid light grey;
	border-left: 4px solid skyblue;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

const Cargando = () => (
  <div style={{width: "min-content"}}>
    <Ruedita />
    <p className="text-center">Poniendonos en orbita...</p>
  </div>
);

const SinDatos = () => (
  <div>
    <br></br>
    <p className="text-center"><img src="/logo192.png" alt="Logo" width="40" height="40"/>Parece que nos quedamos sin datos...</p>
    <br></br>
  </div>
);

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

function CrearTabla(tipo) {
  const [pending, setPending] = React.useState(true);
  const [data, setRows] = React.useState([]);
  const [textoFiltrado, setTextoFiltrado] = React.useState('');
  const [reiniciarPaginacion, setResetPaginationToggle] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      Axios.get("http://localhost:3001/" + tipo).then((response) => {
        setRows(response.data);
      });
      setPending(false);
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ObjetosFiltrados = data.filter(item => item && (item.nombre.toLowerCase().includes(textoFiltrado.toLowerCase()) || item.combustible.toLowerCase().includes(textoFiltrado.toLowerCase()) || item.pais.toLowerCase().includes(textoFiltrado.toLowerCase()) || item.actividad.toLowerCase().includes(textoFiltrado.toLowerCase())),);

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
    <DataTable
      columns={columnas}
      data={ObjetosFiltrados}
      direction="auto"
      defaultSortFieldId={4}
      defaultSortAsc={false}
      highlightOnHover
      onRowDoubleClicked={(row) => {
        if (window.confirm('¿Realmente quieres eliminar esta nave espacial?')) {
          Axios.get("http://localhost:3001/eliminar?tabla=" + tipo + "&id=" + row.id).then(() => {
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

const opcionesPaginacion = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

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

const blanco = {
  color: "white"
};
const negro = {
  color: "black"
};

const padding = {
  paddingRight: 10
};

// Barra de navegación
function Navegador(actual) {
  if (actual === "lanzaderas" || actual === "tripuladas" || actual === "notripuladas"){
    return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            <img src="/logo192.png" alt="Logo" width="40" height="40"/>Naves Espaciales
          </Navbar.Brand>
          <Nav variant="pills">
            <Nav.Item style={padding}>
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

// Redirección automatica
const Redirigir = () => {
  return (
    <Navigate to="lanzaderas" />
  );
};

const linknavegador = {
  color: "var(--bs-heading-color)",
  textDecoration: "none"
};

// Lanzaderas
const Lanzaderas = () => {
  return (
    <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("lanzaderas")}
      <div className="nav-link text-center"><h2><NavLink style={linknavegador} to="/tripuladas"> {'< '}</NavLink>Lanzaderas<NavLink style={linknavegador} to="/notripuladas"> {'>'}</NavLink></h2></div>
      <br></br><br></br>
      <div className="tabla border rounded">
        {CrearTabla("lanzaderas")}
      </div>
    </div>
  );
};

// Tripuladas
const Tripuladas = () => {
  return (
    <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("tripuladas")}
      <div className="nav-link text-center"><h2>Tripuladas<NavLink style={linknavegador} to="/lanzaderas"> {'>'}</NavLink></h2></div>
      <br></br><br></br>
      <div className="tabla border rounded">
        {CrearTabla("tripuladas")}
      </div>
    </div>
  );
};

// No Tripuladas
const NoTripuladas = () => {
  return (
    <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("notripuladas")}
      <div className="nav-link text-center"><h2><NavLink style={linknavegador} to="/lanzaderas"> {'< '}</NavLink>No Tripuladas</h2></div>
        <br></br><br></br>
        <div className="tabla border rounded">
        {CrearTabla("notripuladas")}
      </div>
    </div>
  );
};

// Selector de fechas (por año) para el creador

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

// Pagina creador
const PaginaCreador = () => {
  function enviar(){
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
      Axios.get("http://localhost:3001/agregar?tabla=" + tipo + "&nombre=" + nombre + "&combustible=" + combustible + "&pais=" + pais + "&actividad=" + actividad).then((response) => {
        console.log(response.data);
        window.alert("Nave espacial agregada con exito.");
      });
    } else {
      window.alert("Debe ingresar todos los datos antes de tocar este boton.")
    }
  }
  return (
    <div>
      <div className="col-lg-8 mx-auto p-4 py-md-5">{Navegador("creador")}
        <div className="content">
          <h2 className="text-center">Agregar nave espacial</h2>
        </div>
      </div>
      <div className="col-lg-4 mx-auto p-4 py-md-1 border">
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

export default App;
