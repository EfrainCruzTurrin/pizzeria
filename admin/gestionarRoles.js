const URL_USERS = "https://690b50956ad3beba00f46174.mockapi.io/api/users";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-agregar-usuario");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const password = document.getElementById("password").value.trim();
        const rol = document.getElementById("rol").value;
        const activo = document.getElementById("activo").checked;

        if (!nombre || !password || !rol) {
            mensaje.textContent = "⚠ Completá todos los campos.";
            mensaje.style.color = "orange";
            return;
        }

       
        const nombreLimpio = nombre
            .toLowerCase()
            .normalize("NFD")                // saca acentos
            .replace(/[\u0300-\u036f]/g, "") // más limpieza de acentos
            .replace(/\s+/g, "");            // saca espacios

        const random = Math.floor(Math.random() * 10000);
        const emailGenerado = `${nombreLimpio}${random}@pizzaline.com`;

    
        const nuevoUsuario = {
            nombre,
            email: emailGenerado,
            password,
            role: rol,
            activo
        };

        try {
            const res = await fetch(URL_USERS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario)
            });

            if (!res.ok) {
                throw new Error("Error al crear el usuario");
            }

            const data = await res.json();
            console.log("Usuario creado en MockAPI:", data);

            mensaje.textContent = "✅ Usuario creado correctamente.";
            mensaje.style.color = "green";

            // limpiar formulario
            form.reset();
            document.getElementById("activo").checked = true;

        } catch (error) {
            console.error(error);
            mensaje.textContent = "❌ Hubo un error al crear el usuario.";
            mensaje.style.color = "red";
        }
    });
});
