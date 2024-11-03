class Carrito {
  constructor() {
    this.productos = []
    this.currency = "€"
  }

  actualizarUnidades(producto, unidades, precio) {
    let productoAModificar = this.productos.find((p) => p.producto === producto)
    // Primero verificamos si existe el producto.
    if (productoAModificar) {
      // Después, si el producto ya está en el carrito, añade unidades.
      productoAModificar.unidades += unidades;
      if (productoAModificar.unidades === 0) {
        this.productos = this.productos.filter((x)=> x !== productoAModificar)
      }
      // Si no está en el carrito, añade el producto.
    } else {
      this.productos.push({
        producto: producto,
        unidades: unidades,
        price: precio
      });
    }
  }

  obtenerCarrito() {
    let resultado = []
    
    this.productos.forEach(element => {
      resultado.push({
        producto: element.producto,
        precio: `${element.unidades} x ${element.price}`
      })
    })
    return resultado
  }

  precioTotalCarrito() {
    let Total = 0;
    this.productos.forEach(element => {
      Total += (element.price * element.unidades)
    });
    return Total.toFixed(2);
  }
}

export default Carrito;
