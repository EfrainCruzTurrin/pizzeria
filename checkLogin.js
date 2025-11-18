document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("pizzaline_user"));

    const loginBtn = document.querySelector(".login-btn");
    const authArea = document.getElementById("auth-area");

    // Ocultar botón login si hay usuario
    if (loginBtn && user) {
        loginBtn.style.display = "none";
    }

    // Mostrar usuario
    if (authArea && user) {
        authArea.innerHTML = `
            <span style="font-weight:bold;">Hola, ${user.nombre.split(" ")[0]}</span>
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
});
