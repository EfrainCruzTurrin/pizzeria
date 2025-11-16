const API_BASE = "https://6913eb6df34a2ff1170d8dda.mockapi.io";
const ORDERS_URL = `${API_BASE}/orders`;
const USERS_URL = `${API_BASE}/users`;

/* --------------------- CARGAR LISTADO --------------------- */
async function cargarPedidos() {
  const res = await fetch(ORDERS_URL);
  const pedidos = await res.json();

  const body = document.getElementById("body-pedidos");
  body.innerHTML = "";

  for (const p of pedidos) {
    // Obtener usuario por id
    const userRes = await fetch(`${USERS_URL}/${p.userId}`);
    const user = await userRes.json();

    // Mostrar items del pedido
    const itemsTexto = p.items
      .map(i => `${i.nombre} (x${i.cantidad})`)
      .join("<br>");

    body.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${user.nombre} ${user.apellido}</td>
        <td>${itemsTexto}</td>
        <td>$${p.total}</td>
        <td>${p.estado}</td>

        <td>
          <select onchange="cambiarEstado('${p.id}', this.value)">
            <option value="pendiente" ${p.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
            <option value="en preparación" ${p.estado === "en preparación" ? "selected" : ""}>En preparación</option>
            <option value="entregado" ${p.estado === "entregado" ? "selected" : ""}>Entregado</option>
          </select>
        </td>
      </tr>
    `;
  }
}

/* --------------------- ACTUALIZAR ESTADO --------------------- */
async function cambiarEstado(id, nuevoEstado) {
  await fetch(`${ORDERS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });

  alert("Estado actualizado");
  cargarPedidos();
}

document.addEventListener("DOMContentLoaded", cargarPedidos);
