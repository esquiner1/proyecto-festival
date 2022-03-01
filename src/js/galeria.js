document.addEventListener("DOMContentLoaded",function () {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("IMG");
        imagen.src =`build/img/thumb/${i}.webp`;

        imagen.dataset.imagenId = i;//le estamos dando una propiedad para identificar que imagen estamos dando click.
        //le puedes dar el nocmbre que quieras en este caso fue imagenId en el html se ve como (data-imagen-id)
        //añadir la funcion mostrar imagen 
        imagen.onclick = mostrarImagen;

        const lista = document.createElement("LI");//crea la lista <li> </li>
        lista.appendChild(imagen);// pone la imagen como child (hijo) de lista
        galeria.appendChild(lista);//pone la lista como child de galeria 
    }

}
function mostrarImagen(e) {
    // e.target se refiere elemento clickado <li>
    // Esto es diferente de e.currentTarget, que se referiría al padre <ul> en este contexto
    const id = parseInt(e.target.dataset.imagenId);
   

     //AQUI me va a generar la imagen
     const imagen = document.createElement("IMG");
    imagen.src = `build/img/grande/${id}.webp`;
    
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    //Cuando se da click en el overlay (pantalla negra), cerra imagen 
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove("fijar-body");
    }

    //boton para cerrar una imagen 
     const cerrarImg = document.createElement("P");
     cerrarImg.textContent = "X"
     cerrarImg.classList.add("btn-cerrar");

     //CUANDO SE PRECIONA SE CIERRA LA IMAGEN
     cerrarImg.onclick = function () {
         overlay.remove();
         body.classList.remove("fijar-body");
     }

     overlay.appendChild(cerrarImg);

   //mostrar en el HTML
   const body = document.querySelector("body");
   body.appendChild(overlay);
   body.classList.add("fijar-body");
}
