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

function limpiarFormulario(e) {
  e.preventDefault();
  formGenerarCitaLibro.reset();
  removerEstilosInput(nombreAutor);
  removerEstilosInput(apellidosAutor);
  removerEstilosInput(tituloLibro);
  removerEstilosInput(lugarLibro);
  removerEstilosInput(anioLibro);
  removerEstilosInput(botonLimpiar);

  if (document.querySelector(".bibliografia"))
    document.querySelector(".bibliografia").remove();

  if (botonApa.disabled === false) {
    botonApa.disabled = true;
    botonApa.classList.add("btn-disabled");
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
    botonLimpiar.addEventListener("click", limpiarFormulario);
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

function insertAfter(e, i) {
  if (e.nextSibling) {
      e.parentNode.insertBefore(i, e.nextSibling);
  } else {
      e.parentNode.appendChild(i);
  }
}
