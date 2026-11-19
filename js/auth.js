const DB_USERS = 'koryanime_usuarios';
const SESSION_KEY = 'koryanime_sesion';

// Inicializar base de datos con un usuario admin por defecto si no existe
function initDB() {
    if (!localStorage.getItem(DB_USERS)) {
        const usuarios = [
            { id: 1, nombre: 'admin', email: 'admin@koryanime.com', pass: 'Admin123!', rol: 'admin' },
            { id: 2, nombre: 'editor', email: 'editor@koryanime.com', pass: 'Editor123!', rol: 'editor' },
            { id: 3, nombre: 'user', email: 'user@koryanime.com', pass: 'User123!', rol: 'estandar' }
        ];
        localStorage.setItem(DB_USERS, JSON.stringify(usuarios));
    }
}
initDB();

// Obtener la sesión actual
function getSesion() {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem(SESSION_KEY);
    window.location.reload(); // Recargar para que se actualice el header
}

// Iniciar sesión
function loginUsuario(email, pass) {
    const users = JSON.parse(localStorage.getItem(DB_USERS));
    const user = users.find(u => u.email === email && u.pass === pass);

    if (!user) return { ok: false, msg: 'Correo o contraseña incorrectos.' };
    if (user.baneado) return { ok: false, msg: 'Tu cuenta está baneada temporalmente.' };

    // Guardar sesión (sin la contraseña)
    const sesion = { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
    return { ok: true, user: sesion };
}

// Registrar nuevo usuario
function registrarUsuario(nombre, email, pass) {
    const users = JSON.parse(localStorage.getItem(DB_USERS));
    
    // Comprobar si el email ya existe
    if (users.some(u => u.email === email)) {
        return { ok: false, msg: 'Este correo ya está registrado.' };
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const nuevoUsuario = { id: newId, nombre, email, pass, rol: 'estandar', baneado: false };
    
    users.push(nuevoUsuario);
    localStorage.setItem(DB_USERS, JSON.stringify(users));
    return { ok: true, msg: 'Registro exitoso. Ahora puedes iniciar sesión.' };
}