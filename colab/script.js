const buttonsDelete = document.querySelectorAll('.btn-delete')
  buttonsDelete.forEach(function(element) {
    element.addEventListener('click', function() {
      borrarProducto(element.dataset.id)
    });
  });