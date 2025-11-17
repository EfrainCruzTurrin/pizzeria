let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ---------------- MENSAJES ---------------- */
function mostrarMensaje(msg, tipo = "info") {
  const box = document.getElementById("msg-box");
  box.innerText = msg;

  box.style.background = tipo === "error" ? "#ffdddd" : "#fff3cd";
  box.style.border = tipo === "error" ? "1px solid #d9534f" : "1px solid #ffcc00";
  box.style.display = "block";

  setTimeout(() => box.style.display = "none", 3000);
}

/* ---------------- AGREGAR ---------------- */
function agregarAlCarrito(id, nombre, precio) {
  const existe = carrito.find(item => item.id === id);

  if (existe) existe.cantidad++;
  else carrito.push({ id, nombre, precio, cantidad: 1 });

  actualizarCarrito();
}

/* ---------------- ELIMINAR ---------------- */
function eliminarItem(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

/* ---------------- CAMBIAR CANTIDAD ---------------- */
function cambiarCantidad(id, cambio) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad <= 0) eliminarItem(id);
  else actualizarCarrito();
}

/* ---------------- TOTAL ---------------- */
function obtenerTotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

/* ---------------- ACTUALIZAR DOM ---------------- */
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));

  const cont = document.getElementById("carrito-container");
  const total = document.getElementById("carrito-total");

  cont.innerHTML = "";

  carrito.forEach(item => {
    cont.innerHTML += `
      <div class="carrito-item">
        <span>${item.nombre}</span>
        <span>$${item.precio}</span>

        <div class="carrito-controles">
          <button onclick="cambiarCantidad('${item.id}', -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad('${item.id}', 1)">+</button>
        </div>

        <button class="eliminar" onclick="eliminarItem('${item.id}')">X</button>
      </div>
    `;
  });

  total.innerText = "Total: $" + obtenerTotal();
}

/* ---------------- VACIAR ---------------- */
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  mostrarMensaje("Carrito vaciado");
}

/* ---------------- FINALIZAR PEDIDO ---------------- */
async function finalizarPedido() {
  const user = JSON.parse(localStorage.getItem("pizzaline_user"));

  if (!user) {
    mostrarMensaje("Debes iniciar sesión para hacer un pedido", "error");
    setTimeout(() => window.location.href = "login.html", 1300);
    return;
  }

  if (carrito.length === 0) {
    mostrarMensaje("El carrito está vacío", "error");
    return;
  }

  const pedido = {
    userId: user.id,
    usuario: user.nombre,
    fecha: new Date().toISOString(),
    items: carrito,
    total: obtenerTotal(),
    estado: "pendiente"
  };

  try {
    await enviarPedido(pedido);

    mostrarMensaje("Pedido enviado con éxito!");
    vaciarCarrito();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);

  } catch (e) {
    console.error(e);
    mostrarMensaje("Hubo un error al enviar el pedido", "error");
  }
}

document.addEventListener("DOMContentLoaded", actualizarCarrito);
