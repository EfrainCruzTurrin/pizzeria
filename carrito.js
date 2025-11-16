let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ---------------- AGREGAR AL CARRITO ---------------- */
function agregarAlCarrito(id, nombre, precio) {
  const existe = carrito.find(item => item.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      cantidad: 1
    });
  }

  actualizarCarrito();
}

/* ---------------- ELIMINAR ITEM ---------------- */
function eliminarItem(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

/* ---------------- CAMBIAR CANTIDAD ---------------- */
function cambiarCantidad(id, cambio) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    eliminarItem(id);
  } else {
    actualizarCarrito();
  }
}

/* ---------------- CALCULAR TOTAL ---------------- */
function obtenerTotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

/* ---------------- ACTUALIZAR DOM ---------------- */
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));

  const cont = document.getElementById("carrito-container");
  const total = document.getElementById("carrito-total");

  if (!cont || !total) return;

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
}

/* ---------------- FINALIZAR PEDIDO ---------------- */
async function finalizarPedido() {
  const user = JSON.parse(localStorage.getItem("pizzaline_user"));

  if (!user) {
    alert("Debes iniciar sesión para hacer un pedido.");
    window.location.href = "login.html";
    return;
  }

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const pedido = {
    userId: user.id,
    items: carrito,
    total: obtenerTotal(),
    estado: "pendiente"
  };

  try {
    const resultado = await enviarPedido(pedido);
    alert("Pedido enviado con éxito!");
    vaciarCarrito();
    window.location.href = "index.html";
  } catch (e) {
    alert("Hubo un error al enviar el pedido.");
  }
}

document.addEventListener("DOMContentLoaded", actualizarCarrito);
