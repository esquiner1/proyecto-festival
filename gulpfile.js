 //este requiere de llaves porque gulp tiene muchas funciones 
const{ src,dest, watch, series} = require("gulp");//este requiere lo que hace es traer esas dependencias que hemos instaladp
//DEST: ESTA FUNCION ES PAREA DEFINIR DONDE SE VA ALMACENAR UN ARCHIVO 
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");//en la consola se intelo de la siguiente forma "npm install --save-dev gulp-imagemin"
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");
// sass.compiler = require("dart-sass");//tiene mas performance

//    UTILIDADES CSS (ultimo paso es para minificar)
const autoprefixer = require("autoprefixer");//nos va permitir agregar prefijos
const postcss = require("gulp-postcss");// nos va agregar cierto procesamiento en nuestro css
const cssnano = require("cssnano");// para obtimisar mi codigo css (junta todo el codigo)
const sourcemaps = require("gulp-sourcemaps");

//    UTILIDADES JS (ultimo paso es para minificar)
const terser = require("gulp-terser-js");
const rename = require("gulp-rename");


const paths = {//esto es reducur mas el codigo y poner todas las carpetas en un solo lugar 
    imagenes: "src/img/**/*",
    scss:"./src/scss/**/*.scss",
    lugar:"./build/css",//encuntra el ar4chivo y le aplica sass y ese ultimo pipe es para almacenar el archivo
    js:"src/js/**/*.js"
}



function css() {
    return src(paths.scss)//para que finalice la ejecucion de esta funcion utilizamos return
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe( postcss([ autoprefixer(), cssnano()]))//ultimo paso para minificar
    .pipe(sourcemaps.write("."))//gracias a este mapa tener la referencia en donde esta el estilo de cada cosa en la consola 
    .pipe(dest(paths.lugar));//encuntra el archivo y le aplica sass y ese ultimo pipe es para almacenar el archivo (que es creado en este momento)
}

function minificarcss() {
    return src(paths.scss)
    .pipe(sass({
        outputStyle:"compressed"//para quitar los espacios en el codigo
    }))
    .pipe(dest(paths.lugar));
}
function JavaScript() {
    return src(paths.js)
         .pipe( sourcemaps.init())//aqui se inicializa el uso de source mamp
         .pipe( concat("bundle.js"))
         .pipe( terser())//esto nos va ayudar a que el codigo mejore mucho es para minificar js (ultimo paso)
         .pipe(sourcemaps.write("."))
         .pipe( rename({suffix: ".min"}))
         .pipe( dest("./build/js"))
}
function imagenes( ) {
    return src(paths.imagenes)//este codigo lo que dice es que entre a esta carpeta y lea todas las imagenes qque tenemos ahi y el ultimo asterisco lo que hace es que entra a las otras carpetas que contenga 
            .pipe( imagemin() )
            .pipe( dest("./build/img"))
            .pipe(notify({message: "Imagen Minificada"}));
}

function versionWebP() {
    return src(paths.imagenes)
            .pipe(webp())
            .pipe(dest("./build/img"))
            .pipe(notify({message: "version webP lista"}));
        }

function watchArchivos() {// con sto le decimos al programa que este pendiente que eñ archivo puede cambiar
    watch(paths.scss,css);//* escucha todas la extenciomes que terminen en .scss -- **busca en todas las carpetas archivos terminados con esa extencion 
    watch(paths.js, JavaScript);
}                                  
        //este va ser 
        //el nombre de la tarea
exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.JavaScript = JavaScript;

exports.default = series(css,JavaScript,imagenes,versionWebP,watchArchivos);