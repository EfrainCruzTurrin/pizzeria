// logueoAdmin.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login-admin");
    const userInput = document.getElementById("usuarioAdmin");
    const passInput = document.getElementById("passwordAdmin");
    const mensaje = document.getElementById("la-mensaje");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = userInput.value.trim();
        const password = passInput.value.trim();

        // Credenciales esperadas
        const ADMIN_USER = "admin";
        const ADMIN_PASS = "admin";

        if (usuario === ADMIN_USER && password === ADMIN_PASS) {
            // Guardamos que el admin está logueado
            localStorage.setItem(
                "pizzaline_admin",
                JSON.stringify({ usuario: ADMIN_USER, rol: "ADMIN" })
            );

            mensaje.textContent = "Acceso concedido. Redirigiendo...";
            mensaje.classList.remove("error");
            mensaje.classList.add("ok");
            setTimeout(() => {
                window.location.href = "administracion.html";
            }, 800);
        } else {
            mensaje.textContent = "Usuario o contraseña incorrectos.";
            mensaje.classList.remove("ok");
            mensaje.classList.add("error");
        }
    });
});
