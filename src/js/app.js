document.addEventListener("DOMContentLoaded", function () {
    scrollNav();
    navegacionFija();
});

function navegacionFija() {

    const barra = document.querySelector(".header");

    //REGISTRAR EL INTERSECTION OBSERVER 
    const observer = new IntersectionObserver( function (entries) {//entries nos va dar la informacion del elemnto a observar
        if(entries[0].isIntersecting){
            barra.classList.remove("fijo");
        }else{
            barra.classList.add("fijo");
        }
    }); //(API) cada ve que yo haga scroll INTERSECTION OBSERVER va estar revisando  por un  elemento si esta visible en la pantalla del navegador o no 

    //ELEMENTO A OBSERVAR
    observer.observe(document.querySelector(".vocalista"));//le estamos dando informacion a esta funcion si esta siendo observadao no 
}

function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-Principal a");
    enlaces.forEach(function (enlace) {//para que escuche o aplique el addEventListener hay que  iterar los elemntos y lo hacemos con un forEach
            enlace.addEventListener("click",function (e){
                e.preventDefault();

                const seccion = document.querySelector(e.target.attributes.href.value);

                seccion.scrollIntoView({
                    behavior:"smooth"//este es para darle un scrool de una forma suave
                });
            });
        }); 
}   
