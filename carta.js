const urlApi = "https://690b50956ad3beba00f46174.mockapi.io/api/menu";
let productosCache = [];

document.addEventListener("DOMContentLoaded", async () => {
  const listaPizzas = document.getElementById("lista-pizzas");
  const listaBebidas = document.getElementById("lista-bebidas");
  const inputSearch = document.getElementById("search-input");

  try {
    const respuesta = await fetch(urlApi);
    if (!respuesta.ok) throw new Error("Error al obtener el menú");

    const productos = await respuesta.json();
    productosCache = productos.filter(p => p.disponible === true);
    renderProductos(productosCache, listaPizzas, listaBebidas);
  } catch (error) {
    console.error(error);
  }

  if (inputSearch) {
    inputSearch.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        renderProductos(productosCache, listaPizzas, listaBebidas);
        return;
      }
      const filtrados = productosCache.filter(p =>
        p.nombre.toLowerCase().includes(q)
      );
      renderProductos(filtrados, listaPizzas, listaBebidas);
    });
  }

  actualizarBotonCarrito();
});

function renderProductos(productos, listaPizzas, listaBebidas) {
  listaPizzas.innerHTML = "";
  listaBebidas.innerHTML = "";

  productos.forEach(prod => {
    const li = document.createElement("li");
    li.classList.add("card-producto");

    const h3 = document.createElement("h3");
    h3.textContent = prod.nombre;

    const pPrecio = document.createElement("p");
    pPrecio.classList.add("precio");
    pPrecio.textContent = `Precio: $${prod.precio}`;

    const btn = document.createElement("button");
    btn.textContent = "Agregar al carrito";
    btn.onclick = () => {
      if (!prod.precio || isNaN(prod.precio)) {
        alert("Este producto no tiene precio válido.");
        return;
      }
      agregarAlCarrito(String(prod.id), prod.nombre, Number(prod.precio));
    };

    li.appendChild(h3);
    li.appendChild(pPrecio);
    li.appendChild(btn);

    const tipo = (prod.tipo || "").trim().toLowerCase();
    if (tipo === "pizza") {
      listaPizzas.appendChild(li);
    } else if (tipo === "bebida" || tipo === "bebidas") {
      listaBebidas.appendChild(li);
    }
  });

  if (listaPizzas.children.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay pizzas disponibles por el momento.";
    listaPizzas.appendChild(li);
  }

  if (listaBebidas.children.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay bebidas disponibles por el momento.";
    listaBebidas.appendChild(li);
  }
}

function agregarAlCarrito(id, nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(p => p.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarBotonCarrito();
}

function actualizarBotonCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const boton = document.getElementById("boton-carrito");
  if (boton) {
    boton.textContent = `🛒 (${total})`;
  }
}