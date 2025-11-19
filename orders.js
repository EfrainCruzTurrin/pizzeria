// orders.js

const ORDERS_URL = "https://691d0488d58e64bf0d34bb72.mockapi.io/orders"

/**
 * CREA un pedido (POST)
 */
async function enviarPedido(pedido) {
  console.log("Enviando pedido a:", ORDERS_URL, pedido); // DEBUG

  const res = await fetch(ORDERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
  });

  if (!res.ok) {
    const texto = await res.text();
    console.error("Error al enviar pedido. Status:", res.status, texto);
    throw new Error("No se pudo enviar el pedido");
  }

  const data = await res.json();
  console.log("Pedido creado en MockAPI:", data); // DEBUG
  return data;
}

/**
 * OBTIENE todos los pedidos (GET)
 */
async function obtenerPedidos() {
  const res = await fetch(ORDERS_URL);
  if (!res.ok) throw new Error("No se pudo obtener los pedidos");
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

  if (!res.ok) throw new Error("No se pudo actualizar el estado del pedido");
  return await res.json();
}
