const formGenerarCitaLibro = document.getElementById("form-libro");
const nombreAutor = document.querySelector("#nombres-autor");
const apellidosAutor = document.querySelector("#apellidos-autor");
const tituloArticulo = document.querySelector("#titulo-articulo");
const tituloRevista = document.querySelector("#titulo-revista");
const urlRevista = document.querySelector("#url-revista");
const anioPublicacion = document.querySelector("#anio-publicacion");
const fechaConsulta = document.querySelector("#fecha-consulta");
const botonApa = document.querySelector(".btn-apa");
const botonLimpiar = document.querySelector(".btn-limpiar");
const divBibliografias = document.querySelector(".bibliografias");
const checkboxInstitucion = document.querySelector("#institucion");
const btnAgregarAutor = document.querySelector("#btn-agregar-autor");
const divFormAutor = document.querySelector(".autores");

document.addEventListener("DOMContentLoaded", () => {
  isBotonApaDisabled(true);
});

nombreAutor.addEventListener("blur", validarCampos);
apellidosAutor.addEventListener("blur", validarCampos);
tituloArticulo.addEventListener("blur", validarCampos);
tituloRevista.addEventListener("blur", validarCampos);
urlRevista.addEventListener("blur", validarCampos);
fechaConsulta.addEventListener("input", validarCampos);
anioPublicacion.addEventListener("blur", validarCampos);

divFormAutor.addEventListener("click", (e) => {
  if (e.target.classList.contains("form-check-input")) {
    checkedInstitucion(e);
  } else if (e.target.classList.contains("borrar-autor")) {
    eliminarAutor(e);
  }
});
btnAgregarAutor.addEventListener("click", agregarAutor);

botonLimpiar.addEventListener("click", limpiarFormularioRevista);

formGenerarCitaLibro.addEventListener("submit", (e) => {
  e.preventDefault();

  const autores = document.querySelectorAll(".nombre-autor-input");
  const apellidosAutores = document.querySelectorAll(".apellido-autor-input");
  const instituciones = document.querySelectorAll(".institucion");
  let textoBibliografia = "";
  let textoAutores = "";
  let textoInstituciones = "";
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  if (autores.length > 0)
    textoAutores = obtenerTextoAutores(autores, apellidosAutores);

  if (instituciones.length > 0) 
    textoInstituciones = obtenerTextoInstituciones(instituciones);
  

  if (textoInstituciones !== "" && textoAutores !== "") {
    textoBibliografia += textoAutores + ", " + textoInstituciones;
  } else if (textoInstituciones === "") {
    textoBibliografia += textoAutores;
  } else {
    textoBibliografia += textoInstituciones;
  }

  textoBibliografia += ` (${anioPublicacion.value}). `;
  textoBibliografia += `${tituloArticulo.value}. `;
  textoBibliografia += `${tituloRevista.value}`;

  textoBibliografia += `. Recuperado el dia ${new Date(
    fechaConsulta.value
  ).getUTCDate()} de ${
    meses[Number.parseInt(new Date(fechaConsulta.value).getMonth())]
  } de ${new Date(fechaConsulta.value).getFullYear()}`;
  textoBibliografia += ` de ${urlRevista.value}`;

  isBibliografia();
  mostrarBibliografia(textoBibliografia);
  agregarBibliografiaLocalStorage(textoBibliografia);
});

function validarCampos() {
  validarLongitud(this);

  const isAutores = existenAutores();
  const isInstitucion = existenInstituciones();

  if (
    tituloArticulo.value != "" &&
    tituloRevista.value != "" &&
    urlRevista.value != "" &&
    fechaConsulta.value != "" &&
    anioPublicacion.value !== ""
  ) {
    if (isAutores !== undefined && isInstitucion !== undefined) {
      if (isAutores !== false && isInstitucion !== false) {
        isBotonApaDisabled(false);
      } else {
        isBotonApaDisabled(true);
      }
    } else if (isAutores !== undefined) {
      if (isAutores !== false) {
        isBotonApaDisabled(false);
      } else {
        isBotonApaDisabled(true);
      }
    } else if (isInstitucion !== undefined) {
      if (isInstitucion !== false) {
        isBotonApaDisabled(false);
      } else {
        isBotonApaDisabled(true);
      }
    }
  } else {
    isBotonApaDisabled(true);
  }
}

function limpiarFormularioRevista(e) {
  e.preventDefault();
  formGenerarCitaLibro.reset();
  removerEstilosInput(nombreAutor);
  removerEstilosInput(apellidosAutor);
  removerEstilosInput(tituloArticulo);
  removerEstilosInput(tituloRevista);
  removerEstilosInput(urlRevista);
  removerEstilosInput(anioPublicacion);
  removerEstilosInput(fechaConsulta);
  removerEstilosInput(botonLimpiar);


  while (
    e.target.parentElement.parentElement.parentElement.children[0].children
      .length > 1
  ) {
    const length =
      e.target.parentElement.parentElement.parentElement.children[0].children
        .length;
    e.target.parentElement.parentElement.parentElement.children[0].children[
      length - 1
    ].remove();
  }

  const institucion = document.querySelector(".institucion-input");

  if (institucion) {
    document.querySelector(".form-check-input").checked = true;
    removerEstilosInput(institucion.children[0].children[1]);
  } 


  if (document.querySelector(".bibliografia"))
    document.querySelector(".bibliografia").remove();

  if (botonApa.disabled === false) {
    botonApa.disabled = true;
    botonApa.classList.add("btn-disabled");
  }
}
