document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    const res = await fetch(`https://691967c59ccba073ee92d7d3.mockapi.io/users?email=${encodeURIComponent(email)}`);
    const data = await res.json();

    if (data.length === 0) {
        alert("Usuario no registrado.");
        return;
    }

    const usuario = data[0];
    if (usuario.password === password) {
        alert("¡Login exitoso!");
        localStorage.setItem("pizzaline_user", JSON.stringify(usuario));
        window.location.href = "index.html";
    } else {
        alert("Contraseña incorrecta.");
    }
});