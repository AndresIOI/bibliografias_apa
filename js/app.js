function isBibliografia() {
  if (document.querySelector(".bibliografia-apa .bibliografia")) {
    document.querySelector(".bibliografia-apa .bibliografia").remove();
  }
}
function isBotonApaDisabled(bool) {
  if (bool) {
    botonApa.disabled = bool;
    botonApa.classList.add("btn-disabled");
  } else {
    botonApa.disabled = bool;
    botonApa.classList.remove("btn-disabled");
  }
}

function validarLongitud(campo) {
  if (campo.value.length > 0) {
    campo.classList.remove("is-invalid");
    campo.parentElement.childNodes[1].childNodes[1].classList.remove(
      "requerido-error"
    );
    campo.parentElement.childNodes[1].childNodes[1].classList.add("requerido");
    campo.classList.add("is-valid");
  } else {
    campo.parentElement.childNodes[1].childNodes[1].classList.remove(
      "requerido"
    );
    campo.parentElement.childNodes[1].childNodes[1].classList.add(
      "requerido-error"
    );
    campo.classList.add("is-invalid");
  }
}

function removerEstilosInput(input) {
  input.classList.remove("is-valid");
}

function eliminarEspacio(array) {
  let i = array.indexOf("");

  while (i !== -1) {
    array.splice(i, 1);

    i = array.indexOf("");
  }
}

function copiarBibliografia() {
  const botonCopiar = document.querySelector(".btn-copy");
  botonCopiar.addEventListener("click", (e) => {
    e.preventDefault();

    const bibliografia = document.querySelector(".p-b");
    bibliografia.select();
    bibliografia.setSelectionRange(0, 99999);
    document.execCommand("copy");
    e.target.innerText = "Copiado";
    e.target.style.background = "#ff427f";

    setTimeout(() => {
      e.target.innerText = "Copiar";
      e.target.style.background = "#35495e";
    }, 1000);
  });
}

function mostrarBibliografia(textoBibliografia) {
  const divBibliografiaApa = document.querySelector(".bibliografia-apa");
  bibliografiaApa = `
    <div class='bibliografia'>
        <div class="form-group">
            <label for="">Bibliografia APA</label>
            <div class="parrafo-bibliografia">
                <input class="p-b" value="${textoBibliografia}" readonly/>
            </div>
        </div>
            <a href="#" class="btn btn-copy">Copiar</a>

        </div>
    `;
  showSpinner(true);
  setTimeout(() => {
    showSpinner(false);

    divBibliografiaApa.innerHTML = bibliografiaApa;
    copiarBibliografia();
  }, 500);
}

function showSpinner(bool) {
  const spinner = document.querySelector(".sk-chase");

  if (bool) {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
}

function existenAutores() {

  const autores = document.querySelectorAll('.nombre-autor-input');
  const apellidosAutores = document.querySelectorAll('.apellido-autor-input');

  const isEmpty = (valor) => valor === '';
  const valoresAutores = Array();
  const valoresApellidos = Array();
  if (autores.length > 0) {
    autores.forEach((autor, index) => {
      valoresAutores.push(autor.value);
      valoresApellidos.push(apellidosAutores[index].value);
    });
    return autoresValor = !valoresAutores.some(isEmpty) === true && !valoresApellidos.some(isEmpty) === true ? true : false;
  }
}

function existenInstituciones() {
  const instituciones = document.querySelectorAll('.institucion');

  const isEmpty = (valor) => valor === '';

  const valoresInstituciones = Array();
  if (instituciones.length > 0) {
    instituciones.forEach(institucion => {
      valoresInstituciones.push(institucion.value);
    });
    return institucionesValor = !valoresInstituciones.some(isEmpty);
  }
}

function checkedInstitucion(e) {
  if (e.target.checked) {
    const inputInstitucion = crearInputInstitucion();
    isBotonApaDisabled(true);
    eliminarInputsAutores(e);
    insertarInputInstitucion(inputInstitucion, e);
  } else {
    const inputsAutores = crearInputsAutores();
    isBotonApaDisabled(true);
    eliminarInputInstitucion(e);
    insertarInputsAutores(inputsAutores, e);
  }
}

function agregarAutor(e) {
  e.preventDefault();
  const autores = document.querySelector(".autores");
  const autor = document.querySelector(".autor");
  const autorClone = autor.cloneNode(".autor");
  const div = document.createElement("div");
  const button = document.createElement("a");

  button.classList.add("btn");
  button.classList.add("btn-danger");
  button.classList.add("borrar-autor");
  button.style.marginTop = "30px";
  button.innerText = "X";
  div.classList.add("col-2");
  div.appendChild(button);

  autorClone.childNodes[1].insertBefore(
    div,
    autorClone.childNodes[1].childNodes[7]
  );

  autores.appendChild(autorClone);
  autorClone.children[0].children[0].children[0].children[1].addEventListener(
    "blur",
    validarCampos
  );
  if (autorClone.children[0].children.length === 4)
    autorClone.children[0].children[1].children[0].children[1].addEventListener(
      "blur",
      validarCampos
    );
}

function crearInputInstitucion() {
  const html = `                
  <div class="col-10 institucion-input">
    <div class="form-group">
      <label for="">Institucion <span class="requerido">*</span></label>
      <input type="text" class="form-control institucion" />
    </div>
  </div>
`;

  return document.createRange().createContextualFragment(html);
}

function eliminarInputsAutores(e) {
  e.target.parentNode.parentNode.parentNode.childNodes[1].children[0].remove();
  e.target.parentNode.parentNode.parentNode.childNodes[1].children[0].remove();
}

function insertarInputInstitucion(inputInstitucion, e) {
  inputInstitucion.childNodes[1].children[0].children[1].addEventListener(
    "blur",
    validarCampos
  );
  e.target.parentNode.parentNode.previousElementSibling.insertBefore(
    inputInstitucion.childNodes[1],
    e.target.parentNode.parentNode.parentNode.childNodes[1].children[0]
  );
}

function crearInputsAutores() {
  const html = `
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

  return document.createRange().createContextualFragment(html);
}

function eliminarInputInstitucion(e) {
  e.target.parentNode.parentNode.parentNode.children[0].children[0].remove();
}

function insertarInputsAutores(inputAutores, e) {
  e.target.parentNode.parentNode.previousElementSibling.insertBefore(
    inputAutores.children[0],
    e.target.parentNode.parentNode.parentNode.children[0].children[0]
  );
  e.target.parentNode.parentNode.previousElementSibling.insertBefore(
    inputAutores.children[0],
    e.target.parentNode.parentNode.parentNode.children[0].children[1]
  );
  e.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[1].addEventListener(
    "blur",
    validarCampos
  );
  e.target.parentNode.parentNode.parentNode.children[0].children[1].children[0].children[1].addEventListener(
    "blur",
    validarCampos
  );
}

function eliminarAutor(e) {
  e.target.parentNode.parentNode.parentNode.remove();
}

function obtenerTextoAutores(autores, apellidosAutores) {
  const autoresArray = obtenerAutores(autores, apellidosAutores);
  return (textoAutores = `${autoresArray
    .map((autor) => {
      return `${autor}`;
    })
    .join(", ")}`);
}

function obtenerAutores(autores, apellidosAutores) {
  const autoresArray = [];
  autores.forEach((autor, index) => {
    let inicialesNombre = "";
    const nombreArray = autor.value.split(" ");
    eliminarEspacio(nombreArray);
    nombreArray.forEach((nombre) => {
      inicialesNombre += nombre.slice(0, 1) + ".";
    });
    autoresArray.push(apellidosAutores[index].value + ", " + inicialesNombre);
  });
  return autoresArray;
}

function obtenerTextoInstituciones(instituciones){
  const institucionesArray = obtenerInstituciones(instituciones);

  return textoInstituciones = `${institucionesArray
    .map((institucion) => {
      return `${institucion}`;
    })
    .join(", ")}`;
}

function obtenerInstituciones(instituciones){
  const institucionesArray = [];
  instituciones.forEach((institucion) => {
    institucionesArray.push(institucion.value);
  });
  return institucionesArray;
}
