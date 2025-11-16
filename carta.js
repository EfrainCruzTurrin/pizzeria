// CONEXION API

const urlApi = "https://690b50956ad3beba00f46174.mockapi.io/api/menu"


document.addEventListener("DOMContentLoaded", async () => {
    const listaPizzas = document.getElementById("lista-pizzas");
    const listaBebidas = document.getElementById("lista-bebidas");

    try {
        const respuesta = await fetch(urlApi);
        if (!respuesta.ok) {
            throw new Error("Error al obtener el menú");
        }

        const productos = await respuesta.json();
        console.log("Productos obtenidos para la carta:", productos);

 
        const productosDisponibles = productos.filter(p => p.disponible === true);


        productosDisponibles.forEach(prod => {
            const li = document.createElement("li");
            li.classList.add("card-producto"); 

            const h3 = document.createElement("h3");
            h3.textContent = prod.nombre;

        

            const pPrecio = document.createElement("p");
            pPrecio.classList.add("precio");
            pPrecio.textContent = `Precio: $${prod.precio}`;

            li.appendChild(h3);
         
            li.appendChild(pPrecio);

            if (prod.tipo === "Pizza") {
                listaPizzas.appendChild(li);
            } else if (prod.tipo === "Bebida") {
                listaBebidas.appendChild(li);
            }
        });

        // Mensaje si no hay productos disponibles
        if (listaPizzas.children.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No hay pizzas disponibles por el momento.";
            listaPizzas.appendChild(li);
        }

        if (listaBebidas.children.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No hay bebidas disponibles por el momento.";
            listaBebidas.appendChild(li);
        }

    } catch (error) {
        console.error(error);
      
    }
});