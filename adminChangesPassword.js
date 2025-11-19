const URL_USERS = "https://690b50956ad3beba00f46174.mockapi.io/api/users"; 
const usuariosListEl = document.getElementById("usuarios-list");
const tpl = document.getElementById("tpl-user-row");

async function cargarUsuarios() {
  const res = await fetch(URL_USERS);
  const users = await res.json();
  usuariosListEl.innerHTML = "";

  users.forEach(u => {
    const node = tpl.content.cloneNode(true);
    const nombreSpan = node.querySelector(".user-name");

    // Nombre clickeable → abre perfilUsuario.html?id=<id>
    nombreSpan.textContent = `${u.nombre} (${u.email})`;
    nombreSpan.style.cursor = "pointer";
    nombreSpan.style.textDecoration = "underline";
    nombreSpan.addEventListener("click", () => {
      window.location.href = `perfilUsuario.html?id=${u.id}`;
    });

    usuariosListEl.appendChild(node);
  });
}

document.addEventListener("DOMContentLoaded", cargarUsuarios);
