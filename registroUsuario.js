const API_URL = 'https://691967c59ccba073ee92d7d3.mockapi.io/users';

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();


const userData = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    role: 'user' 
};

try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (response.ok) {
        const data = await response.json();
        alert('¡Registro exitoso!');
        console.log('Usuario creado:', data);
        document.getElementById('formulario').reset();
    } else {
        alert('Error al registrar usuario');
    }
} catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
}});