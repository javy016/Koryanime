document.addEventListener('DOMContentLoaded', () => {

    // Función para alternar entre los formularios de Login y Registro
    window.mostrarFormulario = function(tipo) {
        if (tipo === 'login') {
            document.getElementById('form-login').classList.remove('hidden');
            document.getElementById('form-registro').classList.add('hidden');
        } else {
            document.getElementById('form-login').classList.add('hidden');
            document.getElementById('form-registro').classList.remove('hidden');
        }
    };

    // Función para ver/ocultar la contraseña
    window.togglePassword = function(inputId, icon) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('ph-eye');
            icon.classList.add('ph-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('ph-eye-slash');
            icon.classList.add('ph-eye');
        }
    };

    // Lógica para procesar el Login
    window.procesarLogin = function() {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        
        const res = loginUsuario(email, pass);
        if (res.ok) {
            alert("¡Bienvenido " + res.user.nombre + "!");
            window.location.href = '../index.html'; 
        } else {
            alert(res.msg);
        }
    };

    // Lógica para procesar el Registro
    window.procesarRegistro = function() {
        const nombre = document.getElementById('reg-nombre').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        if (nombre.length < 2) return alert("El nombre debe tener al menos 2 caracteres.");
        
        const res = registrarUsuario(nombre, email, pass);
        if (res.ok) {
            alert(res.msg);
            mostrarFormulario('login'); // Volver al formulario de login tras registrarse
        } else {
            alert(res.msg);
        }
    };
});