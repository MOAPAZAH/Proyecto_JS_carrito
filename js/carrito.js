// creando variables que seran utilizadas posteriomente.
const ListaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];


// cargando eventos 
cargarEventosListeners();
// primero vamos ver como agregar al curso
function cargarEventosListeners() {
   // console.log("Cargando...");
   ListaCursos.addEventListener("click", agregarCurso) // para agregar un curso

   carrito.addEventListener("click", eliminarCurso); // para eliminar un curso

   vaciarCarrito.addEventListener("click", () => {   // para vaciar un curso
      // console.log('vaciando..');
      articulosCarrito = []; // reseteamos el arreglo
      limpiarHTML();// limpiar el html

   })
   // localStorage
   document.addEventListener("DOMContentLoaded", () => {
      articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carritoHTML();
   })
  

}

function agregarCurso(e) {
   e.preventDefault();
   // console.log("click en agregar");
   // console.log(e.target);
   // console.log(e.target.classList);
   if (e.target.classList.contains("agregar-carrito")) { // contains verifica si el usuario ya preciono 
      // console.log("Agregando al carrito");
     const cursoSeleccionado = e.target.parentElement.parentElement;
   //   console.log(cursoSeleccionado); 
      leerDatosCurso(cursoSeleccionado);
   }
}

function eliminarCurso(e) {
   // console.log("Desde eliminar curso");
   // console.log(e.target.classList);
   if (e.target.classList.contains("borrar-curso")) {
      // console.log(e.target.getAttribute('data-id'));
      const cursoId = e.target.getAttribute('data-id');
      // console.log(cursoId);
      // Elimina el arreglo del articuloCarrito por el data-id
      articulosCarrito = articulosCarrito.filter(cursoSeleccionado => cursoSeleccionado.id !== cursoId)
      // El método .filter() es una función de los arrays en JavaScript que crea un nuevo array con todos los elementos que pasan (proporcionada como una función)
      // console.log(articulosCarrito);
      carritoHTML();
   }
}

function leerDatosCurso(cursoSeleccionado){
   // console.log(cursoSeleccionado);
  // crear un objeto del curso 
   const infoCurso = {
      imagen: cursoSeleccionado.querySelector('img').src,
      titulo: cursoSeleccionado.querySelector('h4').textContent,
      precio: cursoSeleccionado.querySelector('.precio span').textContent.replace('Bs', ''),
      id: cursoSeleccionado.querySelector('.agregar-carrito').getAttribute('data-id'),
      cantidad: 1
   }
   const existe = articulosCarrito.some(cursoSeleccionado => cursoSeleccionado.id === infoCurso.id);
   // El método some() en JS se utiliza para verificar si al menos un elemento de un array cumple con una determinada condición
   // console.log(existe);
   if (existe) {
      // actualizamos la cantidad
      const cursos = articulosCarrito.map(cursoSeleccionado => {
         if (cursoSeleccionado.id === infoCurso.id) {
            cursoSeleccionado.cantidad++;
            cursoSeleccionado.total = cursoSeleccionado.precio * cursoSeleccionado.cantidad;
            return cursoSeleccionado; // RETONA EL OBJETO ACTUALIZADO
         } else {
            return cursoSeleccionado; //  RETORNA LOS OBJ QUE NO SON DUPLICADOS.
         }
      })
      articulosCarrito = [...cursos];
   } else{
      // agregamos elementos al carrito
      infoCurso.total = infoCurso.precio;
      articulosCarrito = [...articulosCarrito, infoCurso];
   }
   // console.log(articulosCarrito);
   // console.log(infoCurso);
   carritoHTML();
}
// Mostrar el carrito de compras en el html, la parte de la tabla tbody
function carritoHTML() {
   limpiarHTML();
articulosCarrito.forEach(cursoSeleccionado => {
   const row = document.createElement("tr");
row.innerHTML = `
   <td>
     <img src="${cursoSeleccionado.imagen}" width="70">
   </td>
   <td>
      ${cursoSeleccionado.titulo}
   </td>
   <td>
      ${cursoSeleccionado.precio}
   </td>
   <td>
      ${cursoSeleccionado.cantidad}
   </td>
    <td>
      ${cursoSeleccionado.total}
   </td>
   <td>
     <a href="#" class="borrar-curso" data-id="${cursoSeleccionado.id}">Borrar</a>
   </td>
`;
   contenedorCarrito.appendChild(row);
});
   sincronizarStorage(); // con localStorage
}
//========================================================================
//========================================================================
//========================================================================
// creando funciona para el localStorage
function sincronizarStorage() {
     localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}

function limpiarHTML() {
   contenedorCarrito.innerHTML = '';
}
/// Modificar el logo por uno de Dismac
document.addEventListener("DOMContentLoaded", () => {
   articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
   carritoHTML();

   // Seleccionar el logo y cambiar su src div="logo"
   const logo = document.getElementById("logo");
   logo.setAttribute("src", "img_2/nuevo_logo.png");
   // div hero
   const hero = document.getElementById("hero");
   hero.style.backgroundImage = "url('img_2/nuevo_fondo_hero.jpg')";
   //div barra
   const barra = document.querySelector(".barra");
   barra.style.backgroundColor = "red";
   // Modificar el contenido de los elementos con las clases icono1, icono2 e icono3
   const icono1 = document.querySelector(".icono1 p");
   const icono2 = document.querySelector(".icono2 p");
   const icono3 = document.querySelector(".icono3 p");
   /// modificamos el contenido de el div=row 
   icono1.innerHTML = "Los mejores equipos<br>Para tu Hogar";
   icono2.innerHTML = "Busca la mejor Rebaja<br>Aqui en nuestrar sucursales";
   icono3.innerHTML = "Compras de Manera Online<br>Ahorra mucho Tiempo";

});


document.addEventListener('DOMContentLoaded', () => {
    // Obtener todas las tarjetas de curso
    const cursos = document.querySelectorAll('.card');

    cursos.forEach((curso) => {
        // Obtener el data-id del curso
        const cursoId = curso.querySelector('.agregar-carrito').getAttribute('data-id');

        // Cambiar el contenido basado en el data-id
        switch (cursoId) {
            case '1':
                curso.querySelector('h4').textContent = 'Refrigerador LG Side by Side inverter smart 637 litros frio seco';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 800.0';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs 15,999.00 <span class="u-pull-right">Bs 15,199.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_1.jpg';
                break;
            case '2':
                curso.querySelector('h4').textContent = 'Cava Kernig 34 botellas 1 puerta negro';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 2,800.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 4,399.00 <span class="u-pull-right">Bs 1,599.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_143.jpg';
                break;
            case '3':
                curso.querySelector('h4').textContent = 'Combo Refrigerador LG Top Freezer inverter 254 litros frio seco';
                curso.querySelector('p').textContent = 'Bs 199.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 4,547.00<span class="u-pull-right">Bs 4,348.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_3.jpg';
                break;
            case '4':
                curso.querySelector('h4').textContent = 'Computadora portátil Samsung Galaxy Book2 Pro (15.6", i7, 16GB)';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 3,000.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 13,999.00 <span class="u-pull-right">Bs 10,999.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_4.jpg';
                break;
            case '5':
                curso.querySelector('h4').textContent = 'Computadora portátil Samsung Galaxy Book2 Pro (13.3", Corei5, 8GB)';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 3,040.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 12,239.00 <span class="u-pull-right">Bs 9,199.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_5.jpg';
                break;
            case '6':
                curso.querySelector('h4').textContent = 'Base Xtech con ventilador para laptop';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 30.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 120.00 <span class="u-pull-right">Bs 90.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_6.jpg';
                break;
            case '7':
                curso.querySelector('h4').textContent = 'Televisor Sony 55" LED 4K UHD Smart TV Android';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 479.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 7,478.00 <span class="u-pull-right">Bs 6,999.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_7.jpg';
                break;
            case '8':
                curso.querySelector('h4').textContent = 'Televisor Kernig 50" LED 4K UHD Smart TV Vidaa';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 700.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 2,999.00 <span class="u-pull-right">Bs 2,299.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_8.jpg';
                break;
            case '9':
                curso.querySelector('h4').textContent = 'Televisor Toshiba 43" LED FULL HD Smart TV Vidaa';
                curso.querySelector('p').textContent = 'Ahorras: Bs. 480.00';
                curso.querySelector('.precio').innerHTML = 'Antes: Bs. 2,679.00 <span class="u-pull-right">Bs 2,199.00</span>';
                curso.querySelector('.imagen-curso').src = 'img_2/Screenshot_9.jpg';
                break;
           
            default:
                break;
        }
    });
});

