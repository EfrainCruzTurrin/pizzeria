document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("pizzaline_user"));
    const loginBtnContainer = document.querySelector(".login-btn");

    if (!loginBtnContainer) return;

    // Limpiamos siempre el contenido del botón
    loginBtnContainer.innerHTML = "";

    if (user) {
        // Crear saludo + botón logout
        const saludo = document.createElement("span");
        saludo.textContent = `Hola, ${user.nombre}`;
        saludo.style.color = "white";
        saludo.style.marginRight = "10px";
        saludo.style.fontWeight = "bold";

        const logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.textContent = "Cerrar sesión";

        logoutBtn.onclick = () => {
            localStorage.removeItem("pizzaline_user");
            window.location.reload();
        };

        loginBtnContainer.appendChild(saludo);
        loginBtnContainer.appendChild(logoutBtn);

    } else {
        // Usuario NO logeado → mostrar solo Login
        const loginLink = document.createElement("a");
        loginLink.href = "login.html";
        loginLink.textContent = "Login";

        loginBtnContainer.appendChild(loginLink);
    }
});
