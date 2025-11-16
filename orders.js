const API_BASE = "https://6913eb6df34a2ff1170d8dda.mockapi.io";
const ORDERS_URL = `${API_BASE}/orders`;

/**
 * CREA un pedido (POST)
 * pedido: {
 *   userId: string,
 *   items: array,
 *   total: number,
 *   estado: "pendiente"
 * }
 */
async function enviarPedido(pedido) {
  const res = await fetch(ORDERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
  });

  if (!res.ok) throw new Error("No se pudo enviar el pedido");
  return await res.json();
}

/**
 * OBTIENE todos los pedidos (GET)
 */
async function obtenerPedidos() {
  const res = await fetch(ORDERS_URL);
  return await res.json();
}

/**
 * ACTUALIZA estado del pedido (PUT)
 */
async function actualizarEstadoPedido(id, nuevoEstado) {
  const res = await fetch(`${ORDERS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });

  return await res.json();
}
