function agregarBibliografiaLocalStorage(bibliografia) {
    let bibliografias;
    bibliografias = obtenerBibliografiasLocalStorage();
    bibliografias.push(bibliografia);
    localStorage.setItem("bibliografias", JSON.stringify(bibliografias));
  }

function obtenerBibliografiasLocalStorage() {
    let bibliografias;
    const bibliografiasLocalStorage = localStorage.getItem("bibliografias");
    if (bibliografiasLocalStorage === null) {
      bibliografias = [];
    } else {
      bibliografias = JSON.parse(bibliografiasLocalStorage);
    }
    return bibliografias;
  }

function borrarBibliografiaLocalStorage(bibliografia){
  
  
  const bibliografiasLocalStorage = obtenerBibliografiasLocalStorage();

  
  bibliografiasLocalStorage.forEach((bibliografiaF, index) => {
    if(bibliografia === bibliografiaF){
      bibliografiasLocalStorage.splice(index,1);
    }
  });
  localStorage.setItem('bibliografias', JSON.stringify(bibliografiasLocalStorage))
}