// === Obtener usuario logueado ===
const user = JSON.parse(localStorage.getItem("pizzaline_user"));

// === Ocultar botón Login si hay usuario ===
const loginBtn = document.querySelector(".login-btn");
if (loginBtn && user) {
  loginBtn.style.display = "none";
}

// === Mostrar saludo + cerrar sesión ===
const authArea = document.getElementById("auth-area");

if (authArea && user && user.nombre) {
  const nombreCorto = user.nombre.split(" ")[0];
  authArea.innerHTML = `
    <span style="font-weight:bold;">Hola, ${nombreCorto}</span>
    <button id="logout-btn"
            style="margin-left:10px; padding:5px 10px; cursor:pointer;">
        Cerrar sesión
    </button>
  `;

  document.getElementById("logout-btn").onclick = () => {
    localStorage.removeItem("pizzaline_user");
    window.location.href = "index.html";
  };
}

// === PÁGINAS QUE REQUIEREN LOGIN ===
const paginasProtegidas = ["carrito.html", "pedidos.html"];
const actual = window.location.pathname.split("/").pop();

// === Advertencia si NO hay usuario ===
const loginWarning = document.getElementById("login-warning");

if (paginasProtegidas.includes(actual) && !user) {
  if (loginWarning) loginWarning.style.display = "block";

  // Deshabilitar botón finalizar (solo en carrito)
  const finalizar = document.querySelector(".btn-finalizar");
  if (finalizar) {
    finalizar.disabled = true;
    finalizar.style.opacity = "0.4";
    finalizar.style.cursor = "not-allowed";
  }

  // Redirigir a login automáticamente
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}