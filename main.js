/* Se encarga del header, logout, login y botón flotante.
   NO maneja restricciones de acceso (eso lo hace checkLogin.js) */

document.addEventListener("DOMContentLoaded", () => {
  console.log("PizzaLine - Sitio cargado correctamente 🍕");

  updateAuthArea();
  actualizarBotonFlotante();
});

/* ========= obtener usuario guardado ========= */
function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("pizzaline_user"));
  } catch {
    return null;
  }
}

/* ========= actualizar header (Hola usuario / Login) ========= */
function updateAuthArea() {
  const auth = document.getElementById("auth-area");
  const linkPedidos = document.getElementById("link-pedidos");

  if (!auth) return;

  const user = getStoredUser();

  if (user) {
    const loginBtn = document.querySelector(".login-btn");
    if (loginBtn) loginBtn.style.display = "none";
    auth.innerHTML = `
      <span class="user-name">Hola, ${user.nombre.split(" ")[0]}</span>
      <button id="logout-btn" class="small">Cerrar sesión</button>
    `;

    if (linkPedidos) linkPedidos.style.display = "inline-block";

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("pizzaline_user");
      window.location.href = "index.html";
    });
  } else {
    // Ya existe el botón de login en el HTML, no se necesita duplicar
    if (linkPedidos) linkPedidos.style.display = "none";
  }
}

/* ========= actualizar botón flotante con contador ========= */
function actualizarBotonFlotante() {
  const btn = document.getElementById("btn-flotante");
  if (!btn) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  btn.textContent = total > 0 ? `🛒 (${total})` : "🛒";

  btn.addEventListener("click", () => {
    window.location.href = "carrito.html";
  });
}