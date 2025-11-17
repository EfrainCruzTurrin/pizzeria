document.addEventListener("DOMContentLoaded", () => {
  console.log("PizzaLine - Sitio cargado correctamente 🍕");

  // botón flotante carrito → ahora abre carrito.html
  const btn = document.getElementById("btn-flotante");
  if (btn) btn.addEventListener("click", () => window.location.href = "carrito.html");

  // actualizar área auth
  updateAuthArea();
});

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("pizzaline_user"));
  } catch { 
    return null; 
  }
}

function updateAuthArea() {
  const auth = document.getElementById("auth-area");
  const linkPedidos = document.getElementById("link-pedidos");
  if (!auth) return;

  const user = getStoredUser();

  if (user) {
    // usuario logueado
    auth.innerHTML = `
      <span class="user-name">Hola, ${user.nombre.split(" ")[0]}</span>
      <button id="logout-btn" class="small">Cerrar sesión</button>
    `;

    if (linkPedidos) linkPedidos.style.display = "inline-block";

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("pizzaline_user");
      updateAuthArea();
      window.location.href = "index.html";
    });

  } else {
    // usuario NO logueado
    auth.innerHTML = `<a href="login.html">Login</a>`;
    if (linkPedidos) linkPedidos.style.display = "none";
  }
}
