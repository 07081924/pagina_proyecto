document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.querySelector('#userSelect');
    const eliminarUserForm = document.querySelector('#eliminarUserForm');
    const resultado = document.querySelector('#resultado');

    const cargarUsuarios = () => {
        const usuarios = JSON.parse(localStorage.getItem('users')) || [];
        userSelect.innerHTML = '';

        usuarios.forEach((usuario, index) => {
            const option = document.createElement('option');
            option.value = index; 
            option.textContent = usuario.name; 
            userSelect.appendChild(option);
        });
    };

    eliminarUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedIndex = userSelect.value;
        const usuarios = JSON.parse(localStorage.getItem('users')) || [];

        if (selectedIndex === '') {
            resultado.textContent = 'Por favor, selecciona un usuario.';
            return;
        }
        usuarios.splice(selectedIndex, 1);
        localStorage.setItem('users', JSON.stringify(usuarios));

        resultado.textContent = 'Usuario eliminado exitosamente!';
        cargarUsuarios(); s
    });
    cargarUsuarios();
});