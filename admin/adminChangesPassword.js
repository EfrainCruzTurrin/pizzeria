// adminChangesPassword.js

const URL_USERS = "https://690b50956ad3beba00f46174.mockapi.io/api/users";

document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios();
});

async function cargarUsuarios() {
  const lista = document.getElementById("usuarios-list");
  const tpl = document.getElementById("tpl-user-row");

  try {
    const res = await fetch(URL_USERS);
    if (!res.ok) throw new Error("Error al obtener usuarios");

    const users = await res.json();
    lista.innerHTML = "";

    users.forEach((u) => {
      const node = tpl.content.cloneNode(true);
      const nameSpan = node.querySelector(".acp-user-name");
      const roleSpan = node.querySelector(".acp-user-role");
      const btnChange = node.querySelector(".acp-btn-change");

      nameSpan.textContent = `${u.nombre} (${u.email})`;
      roleSpan.textContent = `Rol: ${u.role || "N/A"}`;

      btnChange.addEventListener("click", () => cambiarPasswordUsuario(u));

      lista.appendChild(node);
    });
  } catch (e) {
    console.error(e);
    lista.innerHTML = `<p style="color:red;">Error cargando usuarios: ${e.message}</p>`;
  }
}

async function cambiarPasswordUsuario(usuario) {
  const nuevaPass = prompt(
    `Nueva contraseña para ${usuario.nombre} (${usuario.email}):`
  );

  if (nuevaPass === null) {
    // Canceló
    return;
  }

  const passLimpia = nuevaPass.trim();
  if (!passLimpia) {
    alert("La contraseña no puede estar vacía.");
    return;
  }

  try {
    const actualizado = { ...usuario, password: passLimpia };

    const res = await fetch(`${URL_USERS}/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizado),
    });

    if (!res.ok) throw new Error("Error al actualizar contraseña");

    alert("✅ Contraseña actualizada correctamente.");
  } catch (e) {
    console.error(e);
    alert("❌ Hubo un error al cambiar la contraseña.");
  }
}
