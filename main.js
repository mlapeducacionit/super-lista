import './style.css'
import Handlebars from 'handlebars'
import $ from 'jquery'

import { del, deleteAll, get, post, put } from './src/handleApi';

/* ------------------ */
/* VARIABLES GLOBALES */
/* ------------------ */

let listaProductos = [
  /* { id: 1, nombre: 'Carne', cantidad: 2, precio: 12.34}, // 0
  { id: 2, nombre: 'Pan', cantidad: 1, precio: 20.45}, // 1
  { id: 3, nombre: 'Fideos', cantidad: 3, precio: 45.87},
  { id: 4, nombre: 'Leche', cantidad: 5, precio: 31.86},
  { id: 5, nombre: 'Yogurt', cantidad: 1, precio: 16.45}, */
];

/* ------------------ */
/* FUNCIONES GLOBALES */
/* ------------------ */

async function borrarProd(id) {
  try {
    // console.log('borrarProd', id);
    await del(id);
    renderLista();
  } catch (error) {
    console.log('[borrarProd]', error);
  }
}

function renderLista() {
  console.log('Render Lista...');

  /* petición asincronica a la plantilla-lista.hbs */

  let data = fetch('plantilla-lista.hbs');
  // console.log(data)

  data
    .then((res) => {
      // console.log(res) // Objeto Response
      return res.text();
    })
    .then(async (plantilla) => {
      // console.log(plantilla) // el string del contenido del archivo

      /* --------------- compilar la plantilla --------------- */
      let template = Handlebars.compile(plantilla);
      console.log(template);

      /* --------------------------------------------- */
      /* Obtener la lista de productos del back        */
      /* --------------------------------------------- */
      listaProductos = await get();

      /* ------ Ejecuto el template */
      let html = template({
        listaProductos,
      }); /* Necesito pasarle al template un objeto */

      //console.log(html)

      /* ------ Inyecto el string generado dentro del DOM. ------ */
      document.getElementById('lista').innerHTML = html;

      /* Me refresca las librería materia lite */
      //let ul = document.querySelector('#contenedor-lista')
      let ul = $('#contenedor-lista');
      componentHandler.upgradeElements(ul);
    })
    .catch((error) => {
      console.error(error);
    });
}

/* --------- */
/* LISTENERS */
/* --------- */

function configurarListener() {

  // ! Ingreso del producto nuevo 

  const entradaProducto = document.getElementById('btn-entrada-producto');
  //console.log(entradaProducto)

  entradaProducto.addEventListener('click', async () => {
    console.log('btn-entrada-producto');

    let input = document.getElementById('ingreso-producto');

    let producto = input.value; /* value -> lo que escribió el usuario */
    console.log(producto);

   try {
    if (producto) {
      const objProdu = {
        nombre: producto,
        cantidad: 1,
        precio: 0,
      };
      await post(objProdu)
      // listaProductos.push(objProdu);
      renderLista();
      input.value = null;
    }
   } catch (error) {
    console.error('Ingreso del producto nuevo', error)
   }
  });

  // ! Borrado total de productos 

  const btnBorrarProductos = document.getElementById('btn-borrar-productos');
  console.log(btnBorrarProductos);

  btnBorrarProductos.addEventListener('click', async () => {
    console.log('btn-borrar-productos');

    const resultado = confirm('¿Desea borrar todos los productos?');
    if (resultado) {
      // listaProductos = [];
      try {
        await deleteAll(listaProductos)
        renderLista();
      } catch (error) {
        console.log('Borrado total de productos', error)
      }
      
    } else {
      console.log('No borró ningún producto');
    }
  });

  // ! Borrado de un producto
  const lista = document.querySelector('#lista')
  console.log(lista)

  lista.addEventListener('click', e => { // e, evt, evento, event
    //console.log(e.target) // <- a que elemento le hice click
    if (e.target.classList.contains('btn-delete')) {
      //console.log('BTN')
      borrarProd(e.target.dataset.id)
    }

    if (e.target.classList.contains('material-icons')) {
      //console.log('Icono')
      borrarProd(e.target.parentElement.dataset.id)
    }
  })

  // ! Cambiar Valor
  lista.addEventListener('change', async e => {
    // console.log('change')
    const elemento = e.target
    // console.log(elemento)

    if ( elemento.classList.contains('cambiar-cantidad') || elemento.classList.contains('cambiar-precio')) {
      const id = elemento.dataset.id
      const valor = elemento.dataset.valor
      // console.log(valor) // 'cantidad' o 'precio'
      // console.log(elemento.value)
      let dato = valor === 'cantidad' ? parseInt(elemento.value) : Number(elemento.value)
      // console.log(dato)
      const index = listaProductos.findIndex(prod => prod.id == id)

      listaProductos[index][valor] = dato 

      let productoEditado = listaProductos[index]
      // console.log(productoEditado)

      await put(productoEditado, id)
    }

  })  

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

/* ----------------------------------------------------------- */
/* TEST CACHE (Service Worker)                                 */
/* ----------------------------------------------------------- */
// https://developer.mozilla.org/en-US/docs/Web/API/Cache

function testCache() {
  console.warn('Test CACHE');

  if ( window.caches ) {
    console.log('El navegador actual soporta CACHES')

    // ! Creo un espacio de cache open()
    caches.open('prueba-1')
    caches.open('prueba-2')
    caches.open('prueba-3')
    caches.open('prueba-4')

    // ! Comprobamos si un espacio de cache existe -> has() | Devuelve una promesa 

    console.log(caches.has('prueba-2')) // devuelve una promesa

    caches.has('prueba-2').then(resultado => console.log('prueba-2:', resultado)) // si existe -> true de lo contrario false
    caches.has('prueba-5').then(resultado => console.log('prueba-5:', resultado)) // si existe -> true de lo contrario false
    
    // ! Borrado de un espacio de cache 
    caches.delete('prueba-2')
    caches.has('prueba-2').then(resultado => console.log('prueba-2:', resultado)) // si existe -> true de lo contrario false

    // ! Listo todos los espacios de caches -> keys()

    // caches.keys().then(espacios => console.log(espacios)).catch(error => console.error(error))
    caches.keys().then(console.log).catch(console.error)

    /* ---------------------------------------------------------- */
    /* Abro un espacio de cache y trabajo con ese espacio         */
    /* ---------------------------------------------------------- */

    caches.open('cache-v1.1').then( cache => {
      console.log(cache) // CACHE DISPONIBLE
      //console.log(caches) // CACHES STORAGE

      // ! Agrego un recurso a la cache -> add()

      cache.add('./index.html')

      // ! Agrego varios recurso a la cache -> addAll()
      /* Al addAll le tengo que pasar un array de archivos ['archivo1.js', 'archivo2.html'] */

      cache.addAll([
        './src/handleApi.js',
        './style.css',
        './images/icon-72x72.png'
      ]).then(() => {
        console.log('Recursos agregados')
      }).catch((err) => {
        console.error('No hay espacio en disco')
      })

      // ! Borrar un recurso de la cache -> delete()

      cache.delete('./style.css').then(console.warn)

      // ! Buscar un recurso dentro de la cache -> match()

      cache.match('./style.css').then(respuesta => {
        if ( respuesta ) {
          console.log('Recurso encontrado')
          //console.log(respuesta)
        } else {
          console.error('Recurso inexistente')
        }
      })

      // ! Crear o modificar el contenido de un recurso

      cache.put('./index.html', new Response('Hola mundo!'))

      // ! Listar todos los recursos que contiene la cache

      



    })
    

  } else {
    console.error('El navegador no soporta CACHES')
  }
}

function start() {
  console.log('Arracando la aplicación');

  registrarServiceWorker();
  configurarListener();
  testCache();
  renderLista();
}

start();





