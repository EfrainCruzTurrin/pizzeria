// CONEXION API

const urlApi = "https://690b50956ad3beba00f46174.mockapi.io/api/menu";


document.addEventListener("DOMContentLoaded", async () => {

    const contenedor = document.getElementById("lista-items");
    const mensaje = document.getElementById("mensaje");

    try {
        // 1. Traer productos
        const res = await fetch(urlApi);
        const productos = await res.json();

        // 2. Renderizar cards
        productos.forEach(prod => {
            const card = document.createElement("div");
            card.classList.add("card-admin");

            card.innerHTML = `
                <h3>${prod.nombre}</h3>
                <p><strong>Tipo:</strong> ${prod.tipo}</p>
                <p><strong>Precio:</strong> $${prod.precio}</p>
                <p><strong>Visible en carta:</strong> ${prod.disponible ? "Sí" : "No"}</p>

                <button class="btn-toggle" data-id="${prod.id}">
                    ${prod.disponible ? "Ocultar" : "Mostrar"}
                </button>
            `;

            contenedor.appendChild(card);
        });

        // 3. Delegación de eventos
        contenedor.addEventListener("click", async (e) => {
            if (!e.target.classList.contains("btn-toggle")) return;

            const id = e.target.dataset.id;

            // buscar el producto actual
            const producto = productos.find(p => p.id == id);

            const nuevoEstado = !producto.disponible;

            try {
                const respuesta = await fetch(`${urlApi}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ disponible: nuevoEstado })
                });

                if (!respuesta.ok) throw new Error("Error actualizando");

                // actualizar visualmente
                e.target.textContent = nuevoEstado ? "Ocultar" : "Mostrar";

                mensaje.textContent = nuevoEstado
                    ? "✔️ Producto mostrado nuevamente."
                    : "✔️ Producto ocultado correctamente.";

                mensaje.style.color = "green";

            } catch (err) {
                console.error(err);
                mensaje.textContent = "❌ Error al actualizar el producto.";
                mensaje.style.color = "red";
            }
        });

    } catch (error) {
        console.error(error);
        mensaje.textContent = "❌ Error cargando productos.";
        mensaje.style.color = "red";
    }
});