import DataTable from 'react-data-table-component';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';


const columns = [
  {
      name: 'Nombre',
      selector: row => row.title,
      sortable: true,
      reorder: true
  },
  {
      name: 'Año',
      selector: row => row.year,
      sortable: true,
      reorder: true
  },
];

const data = [
  {
      id: 1,
      title: 'Beetle juice',
      year: '1988'
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984'
  },
]

const rotar360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Ruedita = styled.div`
	margin: 16px;
	animation: ${rotar360} 1s linear infinite;
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

function CrearTabla() {
  const [pending, setPending] = React.useState(true);
  const [, setRows] = React.useState([]);
  
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <DataTable
      columns={columns}
      data={data}
      direction="auto"
      defaultSortFieldId={1}
      expandOnRowClicked
      expandableRows
      expandableRowsHideExpander
      highlightOnHover
      pagination
      paginationComponentOptions={paginationComponentOptions}
      responsive
      expandableRowsComponent={ExpandedComponent}
      progressPending={pending}
      progressComponent={<Cargando />}
    />

  );
}

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>; //todo esta en data como objeto

const paginationComponentOptions = {
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
        <Route path="/inicio" element={<PaginaInicio />} />
        <Route path="/crear" element={<PaginaCreador />} />
        <Route path="/borrar" element={<PaginaBuscador />} />
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

// Barra de navegación
const Navegador = () => {
  return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            <img src="/logo192.png" alt="Logo" width="40" height="40"/>Naves Espaciales
          </Navbar.Brand>
          <Nav variant="pills">
            <Nav.Item>
              <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/inicio" style={ ({ isActive }) => (isActive ? blanco : negro) }>Vista general</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/crear" style={ ({ isActive }) => (isActive ? blanco : negro) }>Agregar</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/borrar" style={ ({ isActive }) => (isActive ? blanco : negro) }>Buscador</NavLink>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
  );
};

// Redirección automatica
const Redirigir = () => {
  return (
    <Navigate to="inicio" />
  );
};

// Pagina inicial
const PaginaInicio = () => {
  return (
    <div className="col-lg-8 mx-auto p-4 py-md-5"><Navegador />
      <div className="Tabla">
        {CrearTabla()}
      </div>
    </div>
  );
};

// Pagina creador
const PaginaCreador = () => {
  return (
    <div className="col-lg-8 mx-auto p-4 py-md-5"><Navegador />
      <div className="content">
        <h1>Agregar</h1>
      </div>
    </div>
  );
};

// Pagina buscador
const PaginaBuscador = () => {
  return (
    <div className="col-lg-8 mx-auto p-4 py-md-5"><Navegador />
      <div className="content">
        <h1>Buscar</h1>
      </div>
    </div>
  );
};

export default App;
