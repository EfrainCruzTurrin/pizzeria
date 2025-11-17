// Lee usuario desde el localStorage
const user = JSON.parse(localStorage.getItem("pizzaline_user"));
const warningBox = document.getElementById("login-warning");

// Si NO hay usuario 
if (!user) {
    if (warningBox) warningBox.style.display = "block";

    // Oculta el contenido verdadero de la página
    const mainContent = document.querySelector("main, .mainPrincipal, #containerCarta, #bodyInfo");
    if (mainContent) mainContent.style.display = "none";

} else {
    // Si HAY usuario 
    if (warningBox) warningBox.style.display = "none";

    const mainContent = document.querySelector("main, .mainPrincipal, #containerCarta, #bodyInfo");
    if (mainContent) mainContent.style.display = "block";
}
