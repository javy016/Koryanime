// Gestion del registro, inicio y el cierre de sesión de los usuarios. 

const db_Usuarios = 'koryanime_usuarios';
const password_sesion = 'koryanime_sesion';

// Roles
function iniciarBD() {
    if (!localStorage.getItem(db_Usuarios)) {
        const usuarios = [
            { id: 1, nombre: 'admin', correo: 'admin@koryanime.com', contrasena: '0T{&yrHlh0XZj7GwO8DI', rol: 'Administrador' },
            { id: 2, nombre: 'editor', correo: 'editor@koryanime.com', contrasena: 'W$4EWm@wV7ZchpQ$', rol: 'Editor' },
            { id: 3, nombre: 'usuario', correo: 'usuario@koryanime.com', contrasena: 'usuario', rol: 'Usuario' }
        ];
        localStorage.setItem(db_Usuarios, JSON.stringify(usuarios));
    }
}
iniciarBD();

// Obtener la sesión actual
function obtenerSesion() {
    return JSON.parse(localStorage.getItem(password_sesion));
}


function cerrarSesion() {
    localStorage.removeItem(password_sesion);
    window.location.reload(); // Recargar para que se actualice el header
}


function loginUser(correo, contrasena) {
    const usuarios = JSON.parse(localStorage.getItem(db_Usuarios));
    const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

    if (!usuario) return { ok: false, msg: 'Correo o contraseña incorrectos.' };
    if (usuario.ban) return { ok: false, msg: 'Tu cuenta está baneada temporalmente.' };

    // Guarda sesión 
    const sesion = { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
    localStorage.setItem(password_sesion, JSON.stringify(sesion));
    return { ok: true, usuario: sesion };
}

function registrarUsuario(nombre, correo, contrasena) {
    const usuarios = JSON.parse(localStorage.getItem(db_Usuarios));

    // Comprobrueba si el correo ya existe
    if (usuarios.some(u => u.correo === correo)) {
        return { ok: false, msg: 'Este correo ya está registrado.' };
    }

    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const nuevoUsuario = { id: nuevoId, nombre, correo, contrasena, rol: 'Usuario', ban: false };

    usuarios.push(nuevoUsuario);
    localStorage.setItem(db_Usuarios, JSON.stringify(usuarios));
    return { ok: true, msg: 'Registro exitoso. Ahora puedes iniciar sesión.' };
}