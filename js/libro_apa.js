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
  isBotonApaDisabled(false);
});


/*tituloLibro.addEventListener("blur", validarCampo);
lugarLibro.addEventListener("blur", validarCampo);
anioLibro.addEventListener("blur", validarCampo);*/

divFormAutor.addEventListener('click', e => {


  if (e.target.classList.contains('form-check-input')) {
    isInstitucion(e);
  } else if (e.target.classList.contains('borrar-autor')) {
    eliminarAutor(e);
  } else if (e.target.classList.contains('nombre-autor-input') || e.target.classList.contains('apellido-autor-input') || e.target.classList.contains('institucion')) {
    // e.target.addEventListener('blur', validarCampo);

  }
});
btnAgregarAutor.addEventListener('click', agregarAutor);

botonLimpiar.addEventListener('click', limpiarFormulario);

formGenerarCitaLibro.addEventListener("submit", e => {
  e.preventDefault();

  const autores = document.querySelectorAll('.nombre-autor-input');
  const apellidosAutores = document.querySelectorAll('.apellido-autor-input');
  const instituciones = document.querySelectorAll('.institucion');
  const autoresArray = [];
  const institucionesArray = [];
  let textoBibliografia = "";
  let textoAutores = "";
  let textoInstituciones = "";


  if (autores.length > 0) {
    autores.forEach((autor, index) => {
      let inicialesNombre = "";
      const nombreArray = autor.value.split(" ");
      eliminarEspacio(nombreArray);
      nombreArray.forEach((nombre) => {
        inicialesNombre += nombre.slice(0, 1) + ".";
      });
      autoresArray.push(apellidosAutores[index].value + ", " + inicialesNombre);
    });
    textoAutores = `${autoresArray.map(autor => { return `${autor}` }).join(', ')}`;
  }

  if (instituciones.length > 0) {
    instituciones.forEach(institucion => {
      institucionesArray.push(institucion.value);
    });
    textoInstituciones = `${institucionesArray.map(institucion => { return `${institucion}` }).join(', ')}`;
  }
  if(textoInstituciones !== '' && textoAutores !== ''){
    textoBibliografia +=  textoAutores + ", " +  textoInstituciones;
  }else if(textoInstituciones === '') {
    textoBibliografia += textoAutores;
  } else{
    textoBibliografia += textoInstituciones
  }
  
  textoBibliografia += ` (${anioLibro.value}). `;
  textoBibliografia += tituloLibro.value;
  textoBibliografia += edicionLibro.value !== '' ? ` (${edicionLibro.value}ª ed.). ` : '';
  textoBibliografia += lugarLibro.value;
  textoBibliografia += editorialLibro.value !== '' ? ` : ${editorialLibro.value}` : '';

  isBibliografia();
  mostrarBibliografia(textoBibliografia);
  agregarBibliografiaLocalStorage(textoBibliografia);
});



function validarCampo() {
  validarLongitud(this);
  if (
    (nombreAutor.value != "" &&
      apellidosAutor.value != "") ||
    tituloLibro.value != "" &&
    lugarLibro.value != "" &&
    anioLibro.value != ""
  ) {
    isBotonApaDisabled(false);
  } else {
    isBotonApaDisabled(true);
  }
}

function isInstitucion(e) {
  let html = " ";
  if (e.target.checked) {
    html = `                
    <div class="col-10 institucion-input">
      <div class="form-group">
        <label for="">Institucion <span class="requerido">*</span></label>
        <input type="text" class="form-control institucion" />
      </div>
    </div>
  `;

    const domHmtl = document.createRange().createContextualFragment(html);
    e.target.parentNode.parentNode.parentNode.childNodes[1].children[0].remove();
    e.target.parentNode.parentNode.parentNode.childNodes[1].children[0].remove();
    e.target.parentNode.parentNode.previousElementSibling.insertBefore(domHmtl.childNodes[1], e.target.parentNode.parentNode.parentNode.childNodes[1].children[0]);


  } else {
    html = `
      <div class="col-6 autor-nombre-input">
        <div class="form-group">
          <label for="">Nombre(s) del Autor
          <span class="requerido">*</span></label>
          <input type="text" class="form-control nombre-autor-input" id="nombres-autor" />
        </div>
      </div>
      <div class="col-4 autor-apellido-input">
        <div class="form-group">
          <label for="">Apellido Autor <span class="requerido">*</span></label>
          <input type="text" class="form-control apellido-autor-input" id="apellidos-autor" />
        </div>
      </div>
      `;

    const domHmtl = document.createRange().createContextualFragment(html);
    e.target.parentNode.parentNode.parentNode.childNodes[1].children[0].remove();
    e.target.parentNode.parentNode.previousElementSibling.insertBefore(domHmtl.childNodes[1], e.target.parentNode.parentNode.parentNode.childNodes[1].children[0]);
    e.target.parentNode.parentNode.previousElementSibling.insertBefore(domHmtl.childNodes[2], e.target.parentNode.parentNode.parentNode.childNodes[1].children[1]);




  }
}

function agregarAutor(e) {
  e.preventDefault();
  const autores = document.querySelector('.autores');
  const autor = document.querySelector('.autor');
  const autorClone = autor.cloneNode('.autor');
  const div = document.createElement('div');
  const button = document.createElement('a');

  button.classList.add('btn');
  button.classList.add('btn-danger');
  button.classList.add('borrar-autor');
  button.style.marginTop = "30px";
  button.innerText = "X";
  div.classList.add('col-2');
  div.appendChild(button)

  autorClone.childNodes[1].insertBefore(div, autorClone.childNodes[1].childNodes[7]);

  autores.appendChild(autorClone);

}

function eliminarAutor(e) {
  e.target.parentNode.parentNode.parentNode.remove();
}
