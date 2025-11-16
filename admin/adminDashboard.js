const API_BASE = "https://6913eb6df34a2ff1170d8dda.mockapi.io";
const ORDERS_URL = `${API_BASE}/orders`;

/* ------------ Obtener datos de MockAPI ------------ */
async function obtenerDatosPedidos() {
  const res = await fetch(ORDERS_URL);
  const pedidos = await res.json();

  let pendientes = 0;
  let preparando = 0;
  let entregados = 0;

  pedidos.forEach(p => {
    if (p.estado === "pendiente") pendientes++;
    if (p.estado === "en preparación") preparando++;
    if (p.estado === "entregado") entregados++;
  });

  return { pendientes, preparando, entregados };
}

/* ------------ Renderizar gráfico ------------ */
async function generarGrafico() {
  const ctx = document.getElementById("graficoPedidos");

  const datos = await obtenerDatosPedidos();

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Pendientes", "En preparación", "Entregados"],
      datasets: [{
        data: [datos.pendientes, datos.preparando, datos.entregados],
        backgroundColor: [
          "rgb(255, 205, 86)",   // amarillo
          "rgb(54, 162, 235)",   // azul
          "rgb(75, 192, 75)"     // verde
        ]
      }]
    },
    options: {
      responsive: true
    }
  });
}

document.addEventListener("DOMContentLoaded", generarGrafico);
