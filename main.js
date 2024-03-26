import './style.css'

/* VARIABLES GLOBALES */

let listaProductos = [
    { nombre: 'Carne', cantidad: 2, precio: 12.34 }, // 0
    { nombre: 'Pan', cantidad: 1, precio: 20.45 }, // 1
    { nombre: 'Fideos', cantidad: 3, precio: 45.87 },
    { nombre: 'Leche', cantidad: 5, precio: 31.86 },
    { nombre: 'Yogurt', cantidad: 1, precio: 16.45 },
]

function renderLista() {
    console.log('Render Lista...')

    let ul = document.createElement('ul') /* Creo un ul dinamicamente */
    ul.classList.add('demo-list-icon', 'mdl-list', 'w-100') // Agrego las clases
    console.log(ul)

    ul.innerHTML = ''

    listaProductos.forEach((prod, index) => {
        console.log(prod)
        console.log(index)
        ul.innerHTML += `
        
            <li class="mdl-list__item">

                <!-- Icono de producto -->
                <span class="mdl-list__item-primary-content w-10">
                <i class="material-icons mdl-list__item-icon">person</i>
                </span>
            
                <!-- Nombre de producto -->
                <span class="mdl-list__item-primary-content w-30">
                ${prod.nombre}
                </span>

                <!-- Cantidad del producto -->
                <span class="mdl-list__item-primary-content w-20">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="sample3" value="${prod.cantidad}">
                    <label class="mdl-textfield__label" for="sample3">Cantidad</label>
                </div>
                </span>


                <!-- Precio del producto -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="sample3" value="${prod.precio}">
                    <label class="mdl-textfield__label" for="sample3">Precio</label>
                </div>
                </span>

                <!-- Acción (borrar producto) -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                    <i class="material-icons">remove_shopping_cart</i>
                </button>
                </span>
            </li>
        `
    })

    document.getElementById('lista').appendChild(ul)

}

renderLista()