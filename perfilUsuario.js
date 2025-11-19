const URL_USERS = "https://690b50956ad3beba00f46174.mockapi.io/api/users";
const nombreEl = document.getElementById("nombre");
const emailEl = document.getElementById("email");
const inputPass = document.getElementById("nueva-pass");
const btnChange = document.getElementById("btn-change");
const mensaje = document.getElementById("mensaje");

// Usuario logueado desde localStorage
const user = JSON.parse(localStorage.getItem("pizzaline_user"));

if (!user) {
  mensaje.textContent = "❌ No hay usuario logueado.";
  mensaje.style.color = "red";
} else {
  // Mostrar datos
  nombreEl.textContent = user.nombre;
  emailEl.textContent = user.email;

  // Cambiar contraseña
  btnChange.addEventListener("click", async () => {
    const nueva = inputPass.value.trim();
    if (!nueva) {
      mensaje.textContent = "❌ Ingresá una nueva contraseña.";
      mensaje.style.color = "red";
      return;
    }

    try {
      const resUpdate = await fetch(`${URL_USERS}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: nueva })
      });

      if (!resUpdate.ok) throw new Error("Error al actualizar contraseña");

      // Actualizamos también localStorage
      user.password = nueva;
      localStorage.setItem("pizzaline_user", JSON.stringify(user));

      mensaje.textContent = "✅ Contraseña actualizada correctamente.";
      mensaje.style.color = "green";
      inputPass.value = "";
    } catch (e) {
      mensaje.textContent = "❌ " + e.message;
      mensaje.style.color = "red";
    }
  });
}

// Header con logout
function updateAuthArea() {
  const auth = document.getElementById("auth-area");
  if (!auth) return;

  if (user) {
    auth.innerHTML = `
      <span>Hola, ${user.nombre.split(" ")[0]}</span>
      <button id="logout-btn">Cerrar sesión</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("pizzaline_user");
      window.location.href = "../../index.html";
    });
  } else {
    auth.innerHTML = `<a href="../../login.html">Login</a>`;
  }
}

updateAuthArea();
