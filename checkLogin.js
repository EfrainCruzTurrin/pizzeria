// Verificar usuario logueado
const user = JSON.parse(localStorage.getItem("pizzaline_user"));

// Ocultar botón Login si hay usuario
const loginBtn = document.querySelector(".login-btn");
if (loginBtn && user) {
    loginBtn.style.display = "none";
}

// Verificar acceso a páginas que requieren login (carrito / pedidos)
const loginWarning = document.getElementById("login-warning");

if (!user) {
    if (loginWarning) {
        loginWarning.style.display = "block";
    }

    // Bloquear botones de pedido
    const finalizar = document.querySelector(".btn-finalizar");
    if (finalizar) {
        finalizar.disabled = true;
        finalizar.style.opacity = "0.4";
    }
}