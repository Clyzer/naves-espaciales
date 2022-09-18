<a name="inicio"></a>

[![Build][build-shield]][build-url]
[![Calidad][codequality-shield]][codequality-url]
[![Errores][issues-shield]][issues-url]
[![Top Lenguaje][toplanguage-shield]][toplanguage-url]
[![Licencia GPL][license-shield]][license-url]

<!-- LOGO DEL PROYECTO -->
<br />
<div align="center">
  <a href="https://github.com/Clyzer/naves-espaciales">
    <img src="frontend/public/logo192.png" alt="Logo" width="80" height="80"> <!-- El logo fue obtenido en openmoji.org bajo una licencia CC BY-SA 4.0 -->
  </a>

<h3 align="center">Naves Espaciales</h3>

  <p align="center">
    Herramienta de clasificación de naves espaciales
    <br />
    <a href="https://github.com/Clyzer/naves-espaciales/wiki"><strong>Explorar documentación »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Clyzer/naves-espaciales.git">Clonar repositorio</a>
    ·
    <a href="https://github.com/Clyzer/naves-espaciales/issues">Reportar un error</a>
  </p>
</div>

<!-- TABLA DE CONTENIDO-->
<details>
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#creado-con">Creado con</a></li>
        <li><a href="#requisitos-previos">Requisitos previos</a></li>
        <li><a href="#instalacion">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

<!-- Sobre el proyecto -->
## Sobre el proyecto

[![Captura de pantalla del proyecto][product-screenshot]](https://github.com/Clyzer/naves-espaciales)

Un reto técnico personal para SofkaU (Training League) que permite explorar, crear y clasificar información de naves espaciales y sus características

<p align="right">(<a href="#inicio">volver arriba</a>)</p>

### Creado con

* [![PostgreSQL][Postgre.sql]][Postgre-url]
* [![Node][Node.js]][Node-url]
* [![React][React.js]][React-url]
* [![ReactBootstrap][ReactBootstrap.css]][ReactBootstrap-url]
* [![Express][Express.js]][Express-url]

<p align="right">(<a href="#inicio">volver arriba</a>)</p>

### Requisitos previos

* postgreSQL
  https://www.postgresql.org/download/
* nodejs
  https://nodejs.org/en/download/
* react
  ```sh
  npm install react@latest -g
  ```
* express
  ```sh
  npm install express@latest -g
  ```

### Instalación

1. Clonar el repositorio en tu IDE favorito o con la consola
   ```sh
   git clone https://github.com/Clyzer/naves-espaciales.git
   ```
2. Revisar que los datos de ingreso a la base de datos sean correctos en "/backend/db.js"
    - En caso de que no sea así cambialos a los tuyos, no hace falta crear ningún schema o tabla, 
      el usuario tiene que tener todos los privilegios en la base de datos.
3. Instalar paquetes desde NPM
   ```sh
   npm install
   ```
4. Inicia la aplicación mediante
   ```sh
   npm run start
   ```
5. Abre tu navegador y navega a "http://localhost:3000"

<p align="right">(<a href="#inicio">volver arriba</a>)</p>



<!-- Ejemplos de uso -->
## Uso

- En la página principal puedes ver la tabla de lanzaderas, puedes moverte entre los tipos de naves espaciales dándole clic a los botones "<" y ">"
  - Si haces doble clic en una fila de la tabla puedes borrar esa nave espacial de la base de datos
  - Puedes ordenar la tabla por Nombre, Combustible, País y Actividad de manera tanto descendente como ascendente haciéndole clic a la columna
  - Al escribir en el buscador se irán filtrando las diferentes naves espaciales por Nombre, Combustible, País o Actividad según lo prefieras
  - Abajo de la tabla puedes elegir el número de filas por páginas y también moverte entre estas
- En el menú de arriba al darle clic a Agregar nave accederás a una página de creación de naves espaciales
  - Debes llenar todos los datos necesarios antes de darle clic al botón Agregar o presionar Enter
  - La selección de tiempo en actividad de la nave espacial no permite que la barra "Hasta" sea inferior a la barra "Desde"

_Para mas información revisa la documentación [Documentación](https://github.com/Clyzer/naves-espaciales/wiki)_

<p align="right">(<a href="#inicio">volver arriba</a>)</p>



<!-- Hoja de ruta -->
## Hoja de ruta

- [x] Backend (Express)
  - [x] Conexión con base de datos (PostgreSQL)
  - [x] Enviar datos mediante JSON
    - [x] Envió de las naves espaciales según el tipo (SELECT)
  - [x] Recibir datos mediante GET
    - [x] Escribir en la base de datos con lo recibido en GET (INSERT)
    - [x] Eliminar de la base de datos con lo recibido en GET (DELETE)
- [x] Frontend (React)
  - [x] Responsive (Bootstrap)
  - [x] Tabla con datos recibidos mediante JSON
    - [x] Sistema de páginas y moverse entre ellas sin redirección
    - [x] Sistema de filas por página
  - [x] Buscador integrado en la tabla
  - [x] Cambio de tablas mediante menú
  - [x] Creador de naves espaciales
  - [x] Eliminar naves espaciales (mediante doble clic en la tabla)
  - [x] Estilizado con CSS
  - [x] Diseño dinámico (React)
- [x] Empaquetado en una sola aplicación maestra

<p align="right">(<a href="#inicio">volver arriba</a>)</p>

<!-- Licencia -->
## Licencia

Distribuido bajo la licencia GPL 3.0. Mira `LICENSE.txt` para mas información.

<p align="right">(<a href="#inicio">volver arriba</a>)</p>



<!-- Contacto -->
## Contacto

Diego Sánchez - [@TheClyzer](https://twitter.com/TheClyzer)

Link del proyecto: [https://github.com/Clyzer/naves-espaciales](https://github.com/Clyzer/naves-espaciales)

<p align="right">(<a href="#inicio">volver arriba</a>)</p>



<!-- MARKDOWN -->
[build-shield]: https://img.shields.io/github/workflow/status/clyzer/naves-espaciales/Node.js%20CI?style=for-the-badge
[build-url]: https://github.com/Clyzer/naves-espaciales/actions
[codequality-shield]: https://img.shields.io/codefactor/grade/github/Clyzer/naves-espaciales?style=for-the-badge&label=calidad
[codequality-url]: https://www.codefactor.io/repository/github/clyzer/naves-espaciales
[issues-shield]: https://img.shields.io/github/issues/Clyzer/naves-espaciales.svg?style=for-the-badge&label=Errores
[issues-url]: https://github.com/Clyzer/naves-espaciales/issues
[toplanguage-shield]: https://img.shields.io/github/languages/top/clyzer/naves-espaciales?style=for-the-badge
[toplanguage-url]: https://github.com/Clyzer/naves-espaciales/
[license-shield]: https://img.shields.io/github/license/Clyzer/naves-espaciales.svg?style=for-the-badge&label=Licencia
[license-url]: https://github.com/Clyzer/naves-espaciales/blob/master/LICENSE.txt
[product-screenshot]: /frontend/public/images/captura.png
[Postgre.sql]: https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=postgresql
[Postgre-url]: https://www.postgresql.org/
[Node.js]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js
[Node-url]: https://nodejs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[React-url]: https://reactjs.org/
[ReactBootstrap.css]: https://img.shields.io/badge/React--Bootstrap-20232A?style=for-the-badge&logo=bootstrap
[ReactBootstrap-url]: https://react-bootstrap.github.io
[Express.js]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com
