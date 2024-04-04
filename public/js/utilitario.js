/* ------------------ */
/* VARIABLES GLOBALES */
/* ------------------ */

let listaProductos = [
    { nombre: 'Carne', cantidad: 2, precio: 12.34 }, // 0
    { nombre: 'Pan', cantidad: 1, precio: 20.45 }, // 1
    { nombre: 'Fideos', cantidad: 3, precio: 45.87 },
    { nombre: 'Leche', cantidad: 5, precio: 31.86 },
    { nombre: 'Yogurt', cantidad: 1, precio: 16.45 },
]

let crearLista = true // bandera
let ul


/* ------------------ */
/* FUNCIONES GLOBALES */
/* ------------------ */


function borrarProd(indice) {
    console.log('borrarProd', indice)
    listaProductos.splice(indice, 1)
    renderLista()
}

function cambiarCantidad(indice, elemento) {
    console.log(indice)
    console.dir(elemento)
    let cantidad = parseInt(elemento.value)
    console.log('cambiarCantidad', indice, cantidad)
    listaProductos[indice].cantidad = cantidad
    console.log(listaProductos)
}

function cambiarPrecio(indice, elemento) {
    console.log(indice)
    console.dir(elemento)
    let precio = Number(elemento.value)
    console.log('cambiarCantidad', indice, precio)
    listaProductos[indice].precio = precio
    console.log(listaProductos)
}

function renderLista() {
    console.log('Render Lista...')

    if(crearLista) {
        ul = document.createElement('ul') /* Creo un ul dinamicamente */
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100') // Agrego las clases
        console.log(ul)
    }


    ul.innerHTML = ''

    listaProductos.forEach((prod, index) => {
        console.log(prod)
        console.log(index)
        ul.innerHTML += `
        
            <li class="mdl-list__item">

                <!-- Icono de producto -->
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                </span>
            
                <!-- Nombre de producto -->
                <span class="mdl-list__item-primary-content w-30">
                ${prod.nombre}
                </span>

                <!-- Cantidad del producto -->
                <span class="mdl-list__item-primary-content w-20">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onchange="cambiarCantidad(${index}, this)" class="mdl-textfield__input" type="text" id="cantidad-${index}" value="${prod.cantidad}">
                    <label class="mdl-textfield__label" for="cantidad-${index}">Cantidad</label>
                </div>
                </span>


                <!-- Precio del producto -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onchange="cambiarPrecio(${index}, this)" class="mdl-textfield__input" type="text" id="precio-${index}" value="${prod.precio}">
                    <label class="mdl-textfield__label" for="precio-${index}">Precio</label>
                </div>
                </span>

                <!-- Acción (borrar producto) -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                <button onclick="borrarProd(${index})" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                    <i class="material-icons">remove_shopping_cart</i>
                </button>
                </span>
            </li>
        `
    })

    if(crearLista) {
        document.getElementById('lista').appendChild(ul)
    } else {
        componentHandler.upgradeElements(ul)
    }

    crearLista = false

}

/* --------- */
/* LISTENERS */
/* --------- */

function configurarListener() {

    /* Ingreso del producto nuevo */
    const entradaProducto = document.getElementById('btn-entrada-producto')
    //console.log(entradaProducto)

    entradaProducto.addEventListener('click', () => {
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')

        let producto = input.value /* value -> lo que escribió el usuario */
        console.log(producto)

        if ( producto ) {
            const objProdu = {
                nombre: producto,
                cantidad: 1,
                precio: 0
            }
            listaProductos.push(objProdu)
            renderLista()
            input.value = null
        }

    })

    /* Borrado total de productos */

    const btnBorrarProductos = document.getElementById('btn-borrar-productos')
    console.log(btnBorrarProductos)

    btnBorrarProductos.addEventListener('click', () => {
        console.log('btn-borrar-productos')

        const resultado = confirm('¿Desea borrar todos los productos?')
        if ( resultado ) {
            listaProductos = []
            renderLista()
        } else {
            console.log('No borró ningún producto')
        }
    })

}

/* -------------------------- */
/* Registro de Service Worker */
/* -------------------------- */

function registrarServiceWorker() {
    if ( 'serviceWorker' in navigator ) {
        console.log('Puedo utilizar el service worker')

        // this.navigator.serviceWorker.register('../sw.js') // petición asincronica (Devuelve promesa)
        window.navigator.serviceWorker.register('../sw.js') // petición asincronica (Devuelve promesa)
            .then( reg => {
                console.log('El service worker se registró correcatmente', reg)
            })
            .catch( error => {
                console.log('Error al registrar el service worker', error)
            })

    } else {
        console.error('serviceWorker no está disponible en el navegador')
    }
}

function start() {
    console.log('Arracando la aplicación')

    registrarServiceWorker()
    configurarListener()
    renderLista()
}

start()
