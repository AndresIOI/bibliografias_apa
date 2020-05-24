const bibliografias = document.querySelector('.bibliografias');

document.addEventListener('DOMContentLoaded', () => {
    const bibliografiasLS = obtenerBibliografiasLocalStorage();
    mostarBibliografias(bibliografiasLS);

});
bibliografias.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('btn-copy')) {
        copiarBibliografia(e.target.previousElementSibling);
        e.target.innerText = "Copiado";
        e.target.style.background = "#ff427f";

        setTimeout(() => {
            e.target.innerText = "Copiar";
            e.target.style.background = "#35495e";
        }, 1000);
    } else if (e.target.classList.contains('btn-danger')) {
        borrarBibliografiaLocalStorage(e.target.parentNode.childNodes[1].value);
        e.target.parentNode.remove();
    }



});
function mostarBibliografias(bibliografias) {
    const bibliografiasDiv = document.querySelector(".bibliografias");
    let html = " ";
    bibliografias.forEach(bibliografia => {

        html += `
            <div class="cita">
                <input value="${bibliografia}" s readonly>
                <a href="#" class="btn btn-copy">Copiar</a>
                <a href="#" class="btn btn-danger">Eliminar</a>
            </div>
        `
    });
    bibliografiasDiv.innerHTML = html;
}

function copiarBibliografia(input) {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

