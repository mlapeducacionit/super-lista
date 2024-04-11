const apiProd = (() => {

  function getUrl(id) {
    // return 'https://615d8b5212571a00172076ba.mockapi.io/productos/' + (id ? id : '')
    return 'https://615d8b5212571a00172076ba.mockapi.io/productos/' + (id || '')
  }

  /* CRUD -> C:CREATE - R:READ - U:UPDATE - D:DELETE */

  /* CRUD -> R:READ */
  async function get() {

    try {
      let productos = await $.ajax({url: getUrl()}) // Método GET
      //console.log(productos)
      return productos
    } catch (error) {
      console.log('Error get', error)
      return {}
    }

  }

  /* CRUD -> C:CREATE */
  async function post(prod) {

    try {
      return await $.ajax({url: getUrl(), method: 'post', data: prod })  
    } catch (error) {
      console.error('Error post', error)
      return {}
    }

  }

  /* CRUD -> U:UPDATE */
  async function put(prod, id) {
    
    try {
      return await $.ajax({url: getUrl(id), method: 'put', data: prod})
    } catch (error) {
      console.error('Error put', error)
      return {}
    }

  }

  /* CRUD -> D:DELETE */
  async function del(id) {
    try {
      return await $.ajax({url: getUrl(id), method: 'delete'})
    } catch (error) {
      console.error('Error delete', error)
      return {}
    }
  }

  function deleteAll(listaProd) {
    console.log('del')
  }

  return {
    get: () => get(),
    post: producto => post(producto),
    put: (producto, id) => put(producto, id),
    del: (id) => del(id),
    deleteAll: listaProductos => deleteAll(listaProductos)
  }

})() // IIFE (Función autoejecutada)