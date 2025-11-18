// ================== URLs de MockAPI ==================
const URL_MENU = "https://690b50956ad3beba00f46174.mockapi.io/api/menu";
const URL_PROMOS = "https://691c6c133aaeed735c90c5f7.mockapi.io/promo";

// caches en memoria para no perder los objetos originales
let productosCache = [];
let promosCache = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarItems();
    cargarPromos();

   
    document.body.addEventListener("click", manejarClickGlobal);
});

// ================== CARGA Y RENDER DE ITEMS ==================
async function cargarItems() {
    const contVisibles = document.getElementById("items-visibles");
    const contNoVisibles = document.getElementById("items-no-visibles");
    const mensaje = document.getElementById("mensaje");

    contVisibles.innerHTML = "";
    contNoVisibles.innerHTML = "";
    mensaje.textContent = "";

    try {
        const res = await fetch(URL_MENU);
        if (!res.ok) throw new Error("Error al obtener items");

        const productos = await res.json();
        productosCache = productos; 

        productos.forEach(prod => {
            const card = document.createElement("div");
            card.classList.add("card-item");
            const disponible = prod.disponible !== false;

            card.innerHTML = `
                <h4>${prod.nombre}</h4>
                <p><strong>Tipo:</strong> ${prod.tipo}</p>
                <p><strong>Precio:</strong> $${prod.precio}</p>
                <p><strong>Visible:</strong> ${disponible ? "Sí" : "No"}</p>

                <button 
                    class="btn-toggle-item" 
                    data-id="${prod.id}">
                    ${disponible ? "Ocultar" : "Mostrar"}
                </button>

                <button 
                    class="btn-delete-item" 
                    data-id="${prod.id}">
                    Eliminar
                </button>
            `;

            if (disponible) {
                contVisibles.appendChild(card);
            } else {
                contNoVisibles.appendChild(card);
            }
        });

    } catch (err) {
        console.error(err);
        mensaje.textContent = "❌ Error cargando items.";
    }
}

// ================== CARGA Y RENDER DE PROMOS ==================
async function cargarPromos() {
    const contVisibles = document.getElementById("promos-visibles");
    const contNoVisibles = document.getElementById("promos-no-visibles");
    const mensaje = document.getElementById("mensaje");

    contVisibles.innerHTML = "";
    contNoVisibles.innerHTML = "";
    

    try {
        const res = await fetch(URL_PROMOS);
        if (!res.ok) throw new Error("Error al obtener promos");

        const promos = await res.json();
        promosCache = promos; 

        promos.forEach(promo => {
            const card = document.createElement("div");
            card.classList.add("card-promo");
            const disponible = promo.disponible !== false;

            card.innerHTML = `
                <h4>${promo.titulo}</h4>
                <p><strong>Precio:</strong> $${promo.precio}</p>
                <p><strong>Visible:</strong> ${disponible ? "Sí" : "No"}</p>

                <button 
                    class="btn-toggle-promo" 
                    data-id="${promo.id}">
                    ${disponible ? "Ocultar" : "Mostrar"}
                </button>

                <button 
                    class="btn-delete-promo" 
                    data-id="${promo.id}">
                    Eliminar
                </button>
            `;

            if (disponible) {
                contVisibles.appendChild(card);
            } else {
                contNoVisibles.appendChild(card);
            }
        });

    } catch (err) {
        console.error(err);
        mensaje.textContent = "❌ Error cargando promociones.";
    }
}

// ================== MANEJO GLOBAL DE CLICS ==================
async function manejarClickGlobal(e) {
    const mensaje = document.getElementById("mensaje");

    
    if (e.target.classList.contains("btn-toggle-item")) {
        const id = e.target.dataset.id;
        const prod = productosCache.find(p => p.id == id);
        if (!prod) return;

        const nuevoEstado = !(prod.disponible !== false); // invierto visible

        try {
            const res = await fetch(`${URL_MENU}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...prod, disponible: nuevoEstado })
            });

            if (!res.ok) throw new Error("Error al actualizar item");

            mensaje.textContent = nuevoEstado
                ? "✔️ Item marcado como visible."
                : "✔️ Item ocultado correctamente.";

            
            cargarItems();

        } catch (err) {
            console.error(err);
            mensaje.textContent = "❌ Error al cambiar la visibilidad del item.";
        }
    }

    // ------ ELIMINAR ITEM ------
    if (e.target.classList.contains("btn-delete-item")) {
        const id = e.target.dataset.id;
        const confirmar = confirm("¿Eliminar este item definitivamente?");
        if (!confirmar) return;

        try {
            const res = await fetch(`${URL_MENU}/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Error al eliminar item");

            mensaje.textContent = "🗑️ Item eliminado correctamente.";
            cargarItems();

        } catch (err) {
            console.error(err);
            mensaje.textContent = "❌ Error al eliminar el item.";
        }
    }

    
    if (e.target.classList.contains("btn-toggle-promo")) {
        const id = e.target.dataset.id;
        const promo = promosCache.find(p => p.id == id);
        if (!promo) return;

        const nuevoEstado = !(promo.disponible !== false);

        try {
            const res = await fetch(`${URL_PROMOS}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...promo, disponible: nuevoEstado })
            });

            if (!res.ok) throw new Error("Error al actualizar promo");

            mensaje.textContent = nuevoEstado
                ? "✔️ Promo marcada como visible."
                : "✔️ Promo ocultada correctamente.";

            cargarPromos();

        } catch (err) {
            console.error(err);
            mensaje.textContent = "❌ Error al cambiar la visibilidad de la promo.";
        }
    }

    // ------ ELIMINAR PROMO ------
    if (e.target.classList.contains("btn-delete-promo")) {
        const id = e.target.dataset.id;
        const confirmar = confirm("¿Eliminar esta promo definitivamente?");
        if (!confirmar) return;

        try {
            const res = await fetch(`${URL_PROMOS}/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Error al eliminar promo");

            mensaje.textContent = "🗑️ Promo eliminada correctamente.";
            cargarPromos();

        } catch (err) {
            console.error(err);
            mensaje.textContent = "❌ Error al eliminar la promo.";
        }
    }
}
