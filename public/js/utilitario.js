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
    await apiProd.del(id);
    renderLista();
  } catch (error) {
    console.log('[borrarProd]', error);
  }
}

async function cambiarValor(tipo, id, elemento) {
  try {
    let index = listaProductos.findIndex((prod) => Number(prod.id) === id);
    let valor =
      tipo === 'precio' ? Number(elemento.value) : parseInt(elemento.value);
    console.log('cambiarValor', tipo, index, valor);

    listaProductos[index][tipo] = valor;

    let prod = listaProductos[index];

    await apiProd.put(prod, id);
  } catch (error) {
    console.log('[cambiarValor]', error);
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
      listaProductos = await apiProd.get();

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
      await apiProd.post(objProdu)
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
        await apiProd.deleteAll(listaProductos)
        renderLista();
      } catch (error) {
        console.log('Borrado total de productos', error)
      }
      
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
