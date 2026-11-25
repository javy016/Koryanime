// Gestiona los formularios de acceso y registro. 

document.addEventListener('DOMContentLoaded', () => {

    // Alterna entre los formularios de Login y Registro
    window.mostrarFormulario = function (tipo) {
        if (tipo === 'login') {
            document.getElementById('formulario-login').classList.remove('oculto');
            document.getElementById('formulario-register').classList.add('oculto');
        } else {
            document.getElementById('formulario-login').classList.add('oculto');
            document.getElementById('formulario-register').classList.remove('oculto');
        }
    };

    // Ver/ocultar la contraseña
    window.alternarContra = function (inputId, icon) {
        const entrada = document.getElementById(inputId);
        if (entrada.type === 'password') {
            entrada.type = 'text';
            icon.classList.remove('ph-eye');
            icon.classList.add('ph-eye-slash');
        } else {
            entrada.type = 'password';
            icon.classList.remove('ph-eye-slash');
            icon.classList.add('ph-eye');
        }
    };

    window.procesarLogin = function () {
        const correo = document.getElementById('correo-login').value;
        const contrasena = document.getElementById('contra-login').value;

        const resultado = loginUser(correo, contrasena);
        if (resultado.ok) {
            alert("¡Bienvenido " + resultado.usuario.nombre + "!");
            window.location.href = '../index.html';
        } else {
            alert(resultado.msg);
        }
    };

    window.procesarRegistro = function () {
        const nombre = document.getElementById('nombre-register').value;
        const correo = document.getElementById('correo-register').value;
        const contrasena = document.getElementById('contrasena-register').value;

        if (nombre.length < 2) return alert("El nombre debe tener al menos 2 caracteres.");

        const resultado = registrarUsuario(nombre, correo, contrasena);
        if (resultado.ok) {
            alert(resultado.msg);
            mostrarFormulario('login');
        } else {
            alert(resultado.msg);
        }
    };
});