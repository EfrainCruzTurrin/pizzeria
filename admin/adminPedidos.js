// adminPedidos.js
// Usa las funciones de orders.js: obtenerPedidos() y actualizarEstadoPedido()

/* --------------------- CARGAR LISTADO --------------------- */
async function cargarPedidos() {
  const body = document.getElementById("body-pedidos");
  body.innerHTML = "";

  try {
    const pedidos = await obtenerPedidos(); // definida en orders.js

    console.log("Pedidos obtenidos:", pedidos); // debug

    if (!pedidos || pedidos.length === 0) {
      body.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;">
            No hay pedidos registrados.
          </td>
        </tr>
      `;
      return;
    }

    for (const p of pedidos) {
      const items = Array.isArray(p.items) ? p.items : [];
      const itemsTexto = items
        .map(i => `${i.nombre} (x${i.cantidad})`)
        .join("<br>");

      body.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.usuario || ("ID " + (p.userId ?? "-"))}</td>
          <td>${itemsTexto || "Sin items"}</td>
          <td>$${p.total ?? 0}</td>
          <td>${p.estado || "pendiente"}</td>

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

  } catch (e) {
    console.error("Error al cargar pedidos:", e);
    body.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; color:red;">
          Error al cargar los pedidos.
        </td>
      </tr>
    `;
  }
}

/* --------------------- ACTUALIZAR ESTADO --------------------- */
async function cambiarEstado(id, nuevoEstado) {
  try {
    await actualizarEstadoPedido(id, nuevoEstado); // definida en orders.js
    alert("Estado actualizado");
    cargarPedidos();
  } catch (e) {
    console.error("Error al actualizar estado:", e);
    alert("Error al actualizar el estado del pedido");
  }
}

document.addEventListener("DOMContentLoaded", cargarPedidos);
