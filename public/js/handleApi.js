const apiProd = (() => {

  function getUrl(id) {
    // return 'https://615d8b5212571a00172076ba.mockapi.io/productos' + (id ? id : '')
    return 'https://615d8b5212571a00172076ba.mockapi.io/productos' + (id || '')
  }

  function get() {
    console.log('get')
    return 'get'
  }

  function post() {
    console.log('post')
  }

  function put() {
    console.log('put')
  }

  function del() {
    console.log('del')
  }

  return {
    get: () => get(),
    post: () => post(),
    put: () => put(),
    del: () => del()
  }

})() // IIFE (Función autoejecutada)
