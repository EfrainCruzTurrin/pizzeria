/* Se encarga del header, logout, login y botón flotante.
   NO maneja restricciones de acceso (eso lo hace checkLogin.js) */

document.addEventListener("DOMContentLoaded", () => {
  console.log("PizzaLine - Sitio cargado correctamente 🍕");

  // Botón flotante → ir al carrito
  const btn = document.getElementById("btn-flotante");
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "carrito.html";
    });
  }

  updateAuthArea();
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
    /* Usuario logueado */
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
    /* Usuario no logueado */
    auth.innerHTML = `<a href="login.html">Login</a>`;
    if (linkPedidos) linkPedidos.style.display = "none";
  }
}
