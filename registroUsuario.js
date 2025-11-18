document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const nuevoUsuario = {
        nombre,
        telefono,
        email,
        password
    };

    const res = await fetch("https://691967c59ccba073ee92d7d3.mockapi.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
    });

    if (res.ok) {
        const data = await res.json();   //  ✅ ESTA ES LA LÍNEA QUE FALTABA

        alert("Usuario registrado con éxito");

        localStorage.setItem("pizzaline_user", JSON.stringify(data));

        window.location.href = "index.html";
    } else {
        alert("Hubo un error al registrar el usuario.");
    }
});
