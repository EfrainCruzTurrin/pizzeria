// CONEXION API

const urlApi = "https://690b50956ad3beba00f46174.mockapi.io/api/menu"

// Agregar items al menu

const form = document.getElementById("form-agregar");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // evita que recargue la página

    // 1. Leer los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const disponible = document.getElementById("disponible").checked;
    const tipoSeleccionado = document.querySelector('input[name="tipo"]:checked');

    if (!tipoSeleccionado) {
        mensaje.textContent = "Tenés que elegir si es Pizza o Bebida.";
        mensaje.style.color = "red";
        return;
    }

    const tipo = tipoSeleccionado.value;


    const nuevoProducto = {
        nombre,
        tipo,
        precio,
        disponible
    };

    // 3. Enviar a MockAPI 
    try {
        const respuesta = await fetch(urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (!respuesta.ok) {
            throw new Error("Error al guardar el producto");
        }

        const data = await respuesta.json();
        console.log("Producto guardado en MockAPI:", data);

    
        mensaje.textContent = "✅ Producto agregado correctamente.";
        mensaje.style.color = "green";


        form.reset();
        document.getElementById("disponible").checked = true;

    } catch (error) {
        console.error(error);
        mensaje.textContent = "❌ Hubo un error al agregar el producto.";
        mensaje.style.color = "red";
    }
});

