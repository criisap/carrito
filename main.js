import Carrito from "./Carrito.js";

document.addEventListener("DOMContentLoaded", async () => {
  //
  const request = new Request(
    "https://jsonblob.com/api/jsonBlob/1294691350120095744"
  );

  async function getProducts() {
    try {
      const response = await fetch(request);
      if (response.status !== 200) {
        throw new Error("Something went wrong on API server!");
      }
      return response.json();
      // Return the fetched data
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to handle it where the function is called
    }
  }
  const carrito = new Carrito();
  const products = await getProducts();

  const tabla = document.getElementById("productosDisponibles");
  products.products.forEach((producto) => {
    function actualizarCarrito(sumatario) {
      unidadesSumatorio += sumatario;
      unidades.innerText = unidadesSumatorio;
      total = (producto.price * unidadesSumatorio).toFixed(2);
      columnaPrecioTotal.innerText = `${total} ${carrito.currency}`;
      carrito.actualizarUnidades(producto.title, sumatario, producto.price);
      const tablaTotales = document.getElementById("tabla2");
      tablaTotales.innerHTML = "";
      tablaTotales.textContent = "";

      const thProducto = document.createElement("th");
      const thPrecio = document.createElement("th");
      thProducto.innerText = "Producto"
      thPrecio.innerText = "Total"
      tablaTotales.appendChild(thProducto)
      tablaTotales.appendChild(thPrecio)
      carrito.obtenerCarrito().forEach((producto) => {
        const filaTotales = document.createElement("tr");
        const totalProducto = document.createElement("td");
        const totalPrecio = document.createElement("td");
        totalProducto.innerText = producto.producto;
        totalPrecio.innerText = `${producto.precio} ${carrito.currency}`;
        filaTotales.appendChild(totalProducto);
        filaTotales.appendChild(totalPrecio);
        tablaTotales.appendChild(filaTotales)
      });
      const precioTotal = document.getElementById("precioTotal")
      precioTotal.innerText = `Total ${carrito.precioTotalCarrito()} ${carrito.currency}`
    }

    const fila = document.createElement("tr");
    var unidadesSumatorio = 0;
    var total = 0;
    const columnaProducto = document.createElement("td");
    const columnaUnidades = document.createElement("td");
    const columnaPrecioUnidad = document.createElement("td");
    const columnaPrecioTotal = document.createElement("td");
    const botonSumar = document.createElement("button");
    const botonrestar = document.createElement("button");
    botonSumar.innerText = "+";
    botonSumar.addEventListener("click", () => {
      actualizarCarrito(+1);
    });
    botonrestar.addEventListener("click", () => {
      if (unidadesSumatorio - 1 >= 0) {
        actualizarCarrito(-1);
      }
    });
    botonrestar.innerText = "-";
    const unidades = document.createElement("span");
    unidades.innerText = unidadesSumatorio;
    columnaProducto.innerText = producto.title;

    columnaUnidades.appendChild(botonSumar);
    columnaUnidades.appendChild(unidades);
    columnaUnidades.appendChild(botonrestar);

    columnaPrecioUnidad.innerText = `${producto.price} ${carrito.currency}`;
    columnaPrecioTotal.innerText = 0;

    fila.appendChild(columnaProducto);
    fila.appendChild(columnaUnidades);
    fila.appendChild(columnaPrecioUnidad);
    fila.appendChild(columnaPrecioTotal);

    tabla.append(fila);
  });

  console.log(getProducts());
});
