/* ------------------ */
/* VARIABLES GLOBALES */
/* ------------------ */

let listaProductos = [
  { id: 1, nombre: 'Carne', cantidad: 2, precio: 12.34}, // 0
  { id: 2, nombre: 'Pan', cantidad: 1, precio: 20.45}, // 1
  { id: 3, nombre: 'Fideos', cantidad: 3, precio: 45.87},
  { id: 4, nombre: 'Leche', cantidad: 5, precio: 31.86},
  { id: 5, nombre: 'Yogurt', cantidad: 1, precio: 16.45},
];

/* ------------------ */
/* FUNCIONES GLOBALES */
/* ------------------ */

function borrarProd(indice) {
  console.log('borrarProd', indice);
  let posicion = listaProductos.findIndex((producto) => producto.id === indice)
  // console.log(posicion)
  listaProductos.splice(posicion, 1);
  renderLista();
}

function cambiarCantidad(indice, elemento) {
  console.log(indice);
  console.dir(elemento);
  let cantidad = parseInt(elemento.value);
  console.log('cambiarCantidad', indice, cantidad);
  listaProductos[indice].cantidad = cantidad;
  console.log(listaProductos);
}

function cambiarPrecio(indice, elemento) {
  console.log(indice);
  console.dir(elemento);
  let precio = Number(elemento.value);
  console.log('cambiarCantidad', indice, precio);
  listaProductos[indice].precio = precio;
  console.log(listaProductos);
}

function renderLista() {
  console.log('Render Lista...');

  /* petición asincronica a la plantilla-lista.hbs */

  let data = fetch('plantilla-lista.hbs')
  // console.log(data)

  data
    .then( res => {
      // console.log(res) // Objeto Response
      return res.text()
    })
    .then( plantilla => {
      // console.log(plantilla) // el string del contenido del archivo

      /* --------------- compilar la plantilla --------------- */
      let template = Handlebars.compile(plantilla)
      console.log(template)

      /* ------ Ejecuto el template */
      let html = template({listaProductos}) /* Necesito pasarle al template un objeto */

      //console.log(html)

      /* ------ Inyecto el string generado dentro del DOM. ------ */
      document.getElementById('lista').innerHTML = html

      /* Me refresca las librería materia lite */
      let ul = document.querySelector('#contenedor-lista')
      componentHandler.upgradeElements(ul);

    })
    .catch( (error) => {
      console.error(error)
    })


  /* if (crearLista) {
    document.getElementById('lista').appendChild(ul);
  } else {
    
  } */

  crearLista = false;
}

/* --------- */
/* LISTENERS */
/* --------- */

function configurarListener() {
  /* Ingreso del producto nuevo */
  const entradaProducto = document.getElementById('btn-entrada-producto');
  //console.log(entradaProducto)

  entradaProducto.addEventListener('click', () => {
    console.log('btn-entrada-producto');

    let input = document.getElementById('ingreso-producto');

    let producto = input.value; /* value -> lo que escribió el usuario */
    console.log(producto);

    if (producto) {
      const objProdu = {
        nombre: producto,
        cantidad: 1,
        precio: 0,
      };
      listaProductos.push(objProdu);
      renderLista();
      input.value = null;
    }
  });

  /* Borrado total de productos */

  const btnBorrarProductos = document.getElementById('btn-borrar-productos');
  console.log(btnBorrarProductos);

  btnBorrarProductos.addEventListener('click', () => {
    console.log('btn-borrar-productos');

    const resultado = confirm('¿Desea borrar todos los productos?');
    if (resultado) {
      listaProductos = [];
      renderLista();
    } else {
      console.log('No borró ningún producto');
    }
  });
}

/* -------------------------- */
/* Registro de Service Worker */
/* -------------------------- */

function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {
    console.log('Puedo utilizar el service worker');

    // this.navigator.serviceWorker.register('../sw.js') // petición asincronica (Devuelve promesa)
    window.navigator.serviceWorker
      .register('../sw.js') // petición asincronica (Devuelve promesa)
      .then((reg) => {
        console.log('El service worker se registró correcatmente', reg);
      })
      .catch((error) => {
        console.log('Error al registrar el service worker', error);
      });
  } else {
    console.error('serviceWorker no está disponible en el navegador');
  }
}

function start() {
  console.log('Arracando la aplicación');

  registrarServiceWorker();
  configurarListener();
  renderLista();
}

start();
