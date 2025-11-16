// CONEXIÓN API USERS
const urlUsers = "https://690b50956ad3beba00f46174.mockapi.io/api/users";

// FORMULARIO
const formUser = document.getElementById("form-users");
const mensajeUser = document.getElementById("mensaje-user");

// EVENTO SUBMIT
formUser.addEventListener("submit", async (event) => {
    event.preventDefault();

    // 1. Leer valores del formulario
    const nombre = document.getElementById("user-nombre").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const password = document.getElementById("user-password").value.trim();
    const role = document.getElementById("user-role").value.trim();

    // Validaciones simples
    if (!nombre || !email || !password || !role) {
        mensajeUser.textContent = "❌ Todos los campos son obligatorios.";
        mensajeUser.style.color = "red";
        return;
    }

    const nuevoUser = {
        nombre,
        email,
        password,
        role
    };

    try {
        // 2. Enviar a MockAPI
        const respuesta = await fetch(urlUsers, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoUser)
        });

        if (!respuesta.ok) {
            throw new Error("Error al guardar el usuario");
        }

        const data = await respuesta.json();
        console.log("Usuario guardado:", data);

        // 3. Notificar éxito
        mensajeUser.textContent = "✅ Usuario creado correctamente.";
        mensajeUser.style.color = "green";

        // 4. Reiniciar formulario
        formUser.reset();

    } catch (error) {
        console.error(error);
        mensajeUser.textContent = "❌ Hubo un error al crear el usuario.";
        mensajeUser.style.color = "red";
    }
});
