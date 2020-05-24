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
const checkboxInstitucion = document.querySelector('#institucion');
const btnAgregarAutor = document.querySelector('#btn-agregar-autor');
const divFormAutor = document.querySelector('.autores');

document.addEventListener("DOMContentLoaded", () => {
  isBotonApaDisabled(true);
});

nombreAutor.addEventListener("blur", validarCampo);
apellidosAutor.addEventListener("blur", validarCampo);
tituloLibro.addEventListener("blur", validarCampo);
lugarLibro.addEventListener("blur", validarCampo);
anioLibro.addEventListener("blur", validarCampo);
divFormAutor.addEventListener('click',isInstitucion);
btnAgregarAutor.addEventListener('click', agregarAutor);
formGenerarCitaLibro.addEventListener("submit", (e) => {
  e.preventDefault();
  let textoBibliografia = "";
  isBibliografia();
  const nombreAutorArray = nombreAutor.value.split(" ");
  eliminarEspacio(nombreAutorArray);

  let inicialesNombre = "";
  nombreAutorArray.forEach((nombre) => {
    inicialesNombre += nombre.slice(0, 1) + ".";
  });
  const textoAnio = `(${anioLibro.value}).`;
  textoBibliografia = `${apellidosAutor.value}, ${inicialesNombre} ${textoAnio} ${tituloLibro.value}. (${edicionLibro.value}ª ed.) ${lugarLibro.value} : ${editorialLibro.value}`;
  mostrarBibliografia(textoBibliografia);
  agregarBibliografiaLocalStorage(textoBibliografia);
});
function validarCampo() {
  validarLongitud(this);
  if (
    nombreAutor.value != "" &&
    apellidosAutor.value != "" &&
    tituloLibro.value != "" &&
    lugarLibro.value != "" &&
    anioLibro.value != ""
  ) {
    isBotonApaDisabled(false);
  } else {
    isBotonApaDisabled(true);
  }
}

function isInstitucion(e){

  if(e.target.classList.contains('form-check-input')){
        
    if(e.target.checked){
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].style.display = "none";      
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].style.display = "none";      
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[5].style.display = "block";      

    }else {
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].style.display = "block";      
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].style.display = "block";      
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[5].style.display = "none";  
    }
  }



}

function agregarAutor(e){
  e.preventDefault();
  const autores = document.querySelector('.autores');
  const autor = document.querySelector('.autor');

  
  
    
  autores.appendChild(autor.cloneNode('.autor'));
  
  
}
