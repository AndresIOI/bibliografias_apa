const formGenerarCitaLibro = document.getElementById("form-libro");
const nombreAutor = document.querySelector("#nombres-autor");
const apellidosAutor = document.querySelector("#apellidos-autor");
const tituloLibro = document.querySelector("#titulo-libro");
const editorialLibro = document.querySelector("#editorial-libro");
const lugarLibro = document.querySelector("#lugar-libro");
const anioLibro = document.querySelector("#anio-libro");
const edicionLibro = document.querySelector("#edicion-libro");
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
tituloLibro.addEventListener("blur", validarCampos);
lugarLibro.addEventListener("blur", validarCampos);
anioLibro.addEventListener("blur", validarCampos);

divFormAutor.addEventListener("click", (e) => {
  if (e.target.classList.contains("form-check-input")) {
    checkedInstitucion(e);
  } else if (e.target.classList.contains("borrar-autor")) {
    eliminarAutor(e);
  }
});
btnAgregarAutor.addEventListener("click", agregarAutor);

botonLimpiar.addEventListener("click", limpiarFormulario);

formGenerarCitaLibro.addEventListener("submit", generarBibliografiaAPA);

function generarBibliografiaAPA(e){
  e.preventDefault();

  const autores = document.querySelectorAll(".nombre-autor-input");
  const apellidosAutores = document.querySelectorAll(".apellido-autor-input");
  const instituciones = document.querySelectorAll(".institucion");
  let textoAutores = "";
  let textoInstituciones = "";
  
  let textoBibliografia = "";

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

  textoBibliografia += ` (${anioLibro.value}). `;
  textoBibliografia += tituloLibro.value;
  textoBibliografia +=
    edicionLibro.value !== "" ? ` (${edicionLibro.value}ª ed.). ` : " ";
  textoBibliografia += lugarLibro.value;
  textoBibliografia +=
    editorialLibro.value !== "" ? ` : ${editorialLibro.value}` : " : Autor";

  isBibliografia();
  mostrarBibliografia(textoBibliografia);
  agregarBibliografiaLocalStorage(textoBibliografia);
}

function validarCampos() {
  validarLongitud(this);

  const isAutores = existenAutores();
  const isInstituciones = existenInstituciones();

  if (
    tituloLibro.value != "" &&
    lugarLibro.value != "" &&
    anioLibro.value != ""
  ) {
    if (isAutores !== undefined && isInstituciones !== undefined) {
      if (isAutores !== false && isInstituciones !== false) {
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
    } else if (isInstituciones !== undefined) {
      if (isInstituciones !== false) {
        isBotonApaDisabled(false);
      } else {
        isBotonApaDisabled(true);
      }
    }
  } else {
    isBotonApaDisabled(true);
  }
}

function limpiarFormulario(e) {
  e.preventDefault();
  formGenerarCitaLibro.reset();

  removerEstilosInput(nombreAutor);
  removerEstilosInput(apellidosAutor);
  removerEstilosInput(tituloLibro);
  removerEstilosInput(lugarLibro);
  removerEstilosInput(anioLibro);
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

