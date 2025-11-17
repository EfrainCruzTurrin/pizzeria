const urlApi = "https://690b50956ad3beba00f46174.mockapi.io/api/menu";
let productosCache = []; // guardamos los productos para filtrar sin pedir otra vez

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

  // evento de búsqueda
  inputSearch && inputSearch.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      renderProductos(productosCache, listaPizzas, listaBebidas);
    } else {
      const filtrados = productosCache.filter(p => p.nombre.toLowerCase().includes(q));
      renderProductos(filtrados, listaPizzas, listaBebidas);
    }
  });
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

    // botón agregar 
    const btn = document.createElement("button");
    btn.textContent = "Agregar al carrito";
    btn.onclick = () => agregarAlCarrito(String(prod.id), prod.nombre, Number(prod.precio));

    li.appendChild(h3);
    li.appendChild(pPrecio);
    li.appendChild(btn);

    if (prod.tipo.toLowerCase() === "pizza") listaPizzas.appendChild(li);
    else listaBebidas.appendChild(li);
  });

    // mensaje 
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
