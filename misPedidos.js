const ORDERS_URL = "https://691d0488d58e64bf0d34bb72.mockapi.io/orders"

const user = JSON.parse(localStorage.getItem("pizzaline_user"));
const cont = document.getElementById("mis-pedidos-container");
const noPedidos = document.getElementById("no-pedidos");

// Si NO hay usuario → checkLogin.js muestra el warning
if (!user) return;

/* ============================
   TRAER LOS PEDIDOS DEL USUARIO
   ============================ */
async function cargarMisPedidos() {
  try {
    const res = await fetch(`${ORDERS_URL}?userId=${user.id}`);
    if (!res.ok) throw new Error("Error al obtener pedidos");

    const pedidos = await res.json();

    if (!pedidos.length) {
      noPedidos.style.display = "block";
      return;
    }

    pedidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    pedidos.forEach(pedido => {
      const div = document.createElement("div");
      div.classList.add("pedido-card");

      div.style = `
        background:#fff;
        border-radius:10px;
        padding:20px;
        border:1px solid #ddd;
        box-shadow:0 2px 4px rgba(0,0,0,0.1);
      `;

      div.innerHTML = `
        <h3>Pedido #${pedido.id}</h3>
        <p><strong>Fecha:</strong> ${new Date(pedido.fecha).toLocaleString()}</p>
        <p><strong>Estado:</strong> 
          <span style="color:${
            pedido.estado === "pendiente" ? "orange" :
            pedido.estado === "en preparación" ? "blue" :
            "green"
          }">
            ${pedido.estado.toUpperCase()}
          </span>
        </p>

        <h4>Items:</h4>
        <ul style="margin-left:20px;">
          ${pedido.items
            .map(i => `<li>${i.nombre} x${i.cantidad} — $${i.precio * i.cantidad}</li>`)
            .join("")}
        </ul>

        <p style="margin-top:10px; font-size:18px;">
          <strong>Total:</strong> $${pedido.total}
        </p>
      `;

      cont.appendChild(div);
    });

  } catch (err) {
    console.error("Error cargando pedidos:", err);
    noPedidos.innerText = "No se pudieron cargar los pedidos.";
    noPedidos.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", cargarMisPedidos);