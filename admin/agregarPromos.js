const URL_PROMOS = "https://691c6c133aaeed735c90c5f7.mockapi.io/promo";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-promos");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const titulo = document.getElementById("titulo").value.trim();
        const texto = document.getElementById("texto").value.trim();
        const precio = document.getElementById("precio").value.trim();
        const imagen = document.getElementById("imagen").value;
        const activa = document.getElementById("activa").checked;

        if (!titulo || !texto || !imagen || !precio) {
            mensaje.textContent = "⚠ Completa todos los campos.";
            mensaje.style.color = "orange";
            return;
        }

        const nuevaPromo = {
            titulo,
            texto,
            precio: parseFloat(precio),
            imagen,
            activa
        };

        try {
            const res = await fetch(URL_PROMOS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaPromo)
            });

            if (!res.ok) throw new Error();

            mensaje.textContent = "✅ Promoción agregada con éxito.";
            mensaje.style.color = "green";

            form.reset();
            document.getElementById("activa").checked = true;

        } catch (err) {
            mensaje.textContent = "❌ Error al agregar la promoción.";
            mensaje.style.color = "red";
        }
    });
});