const URL_CLIENTES = "https://691967c59ccba073ee92d7d3.mockapi.io/users"; 
const URL_ADMINS   = "https://690b50956ad3beba00f46174.mockapi.io/api/users";

document.addEventListener("DOMContentLoaded", () => {

  const form    = document.getElementById("form-agregar-usuario");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre   = document.getElementById("nombre").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rol      = document.getElementById("rol").value;
    const activo   = document.getElementById("activo").checked;

    if (!nombre || !email || !password || !rol) {
      mensaje.textContent = "⚠ Completá todos los campos.";
      mensaje.style.color = "orange";
      return;
    }

    try {
      let res;

      // ======================================
      // USUARIO NORMAL (CLIENTE)
      // ======================================
      if (rol === "USER") {

        const nuevoCliente = {
          nombre,
          email,
          password
        };

        res = await fetch(URL_CLIENTES, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoCliente)
        });

      } 
      // ======================================
      // USUARIO ADMINISTRATIVO
      // ======================================
      else {

        const nuevoAdmin = {
          nombre,
          email,
          password,
          role: rol,
          activo: activo
        };

        res = await fetch(URL_ADMINS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoAdmin)
        });
      }

      if (!res.ok) throw new Error("Error al crear el usuario");
      const data = await res.json();
      console.log("Usuario creado:", data);

      mensaje.textContent = "✅ Usuario creado correctamente.";
      mensaje.style.color = "green";

      form.reset();
      document.getElementById("activo").checked = true;

    } catch (error) {
      console.error(error);
      mensaje.textContent = "❌ Hubo un error al crear el usuario.";
      mensaje.style.color = "red";
    }
  });
});
