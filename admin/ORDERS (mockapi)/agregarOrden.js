// CONEXIÓN API ORDERS
const urlOrders = "https://690b50956ad3beba00f46174.mockapi.io/api/orders";

// FORMULARIO
const formOrder = document.getElementById("form-orders");
const mensajeOrder = document.getElementById("mensaje-orders");

// EVENTO SUBMIT
formOrder.addEventListener("submit", async (event) => {
    event.preventDefault();

    // 1. Leer valores del formulario
    const userId = Number(document.getElementById("order-userId").value);
    const itemsText = document.getElementById("order-items").value.trim();
    const total = Number(document.getElementById("order-total").value);
    const estado = document.getElementById("order-estado").value.trim();

    // Convertir items (ej: "1,2,3" → [1,2,3])
    const items = itemsText
        .split(",")
        .map(x => x.trim())
        .filter(x => x !== "")
        .map(Number);

    // Validación básica
    if (!userId || items.length === 0 || !total || !estado) {
        mensajeOrder.textContent = "❌ Todos los campos son obligatorios.";
        mensajeOrder.style.color = "red";
        return;
    }

    const nuevaOrden = {
        userId,
        items,
        total,
        estado
    };

    try {
        // 2. Enviar a MockAPI
        const respuesta = await fetch(urlOrders, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaOrden)
        });

        if (!respuesta.ok) {
            throw new Error("Error al guardar la orden");
        }

        const data = await respuesta.json();
        console.log("Orden creada:", data);

        // 3. Notificar éxito
        mensajeOrder.textContent = "✅ Orden creada correctamente.";
        mensajeOrder.style.color = "green";

        // 4. Reiniciar formulario
        formOrder.reset();

    } catch (error) {
        console.error(error);
        mensajeOrder.textContent = "❌ Hubo un error al crear la orden.";
        mensajeOrder.style.color = "red";
    }
});
