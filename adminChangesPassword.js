const URL_USERS = "https://690b50956ad3beba00f46174.mockapi.io/api/users"; 
const usuariosListEl = document.getElementById("usuarios-list");
const tpl = document.getElementById("tpl-user-row");
const formDiv = document.getElementById("form-cambiar");
const selectedUserEl = document.getElementById("selected-user");
let selectedUserId = null;

async function cargarUsuarios() {
  const res = await fetch(URL_USERS);
  const users = await res.json();
  usuariosListEl.innerHTML = "";
  users.forEach(u => {
    const node = tpl.content.cloneNode(true);
    node.querySelector(".user-name").textContent = `${u.nombre} (${u.email})`;
    const btn = node.querySelector(".btn-select");
    btn.addEventListener("click", () => seleccionarUsuario(u));
    usuariosListEl.appendChild(node);
  });
}

function seleccionarUsuario(u) {
  selectedUserId = u.id;
  selectedUserEl.textContent = `Cambiar contraseña de: ${u.nombre} (${u.email})`;
  formDiv.style.display = "block";
}

document.getElementById("btn-change").addEventListener("click", async () => {
  const nueva = document.getElementById("nueva-pass").value.trim();
  if (!nueva) return alert("Ingresá la nueva contraseña.");
  try {
    const res = await fetch(`${URL_USERS}/${selectedUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: nueva })
    });
    if (!res.ok) throw new Error("Error al actualizar");
    alert("Contraseña cambiada correctamente.");
    document.getElementById("nueva-pass").value = "";
    formDiv.style.display = "none";
    cargarUsuarios();
  } catch (e) {
    alert("Error: " + e.message);
  }
});

document.addEventListener("DOMContentLoaded", cargarUsuarios);
