// Construye el menú de usuario y el formulario de acceso. 

document.addEventListener('DOMContentLoaded', () => {
    const botonUsuario = document.getElementById('boton-usuario');
    const contenidoDesplegable = document.getElementById('contenido-desplegable-usuario');
    const menuDesplegable = document.getElementById('desplegable-usuario');


    // 1. Desplegable header
    if (botonUsuario && contenidoDesplegable && menuDesplegable) {
        const sesion = obtenerSesion();

        if (sesion) {
            // Usuario registrado
            const iniciales = sesion.nombre.substring(0, 2).toUpperCase();
            contenidoDesplegable.innerHTML = `<span style="font-weight: bold; font-size: 14px;">${iniciales}</span>`;

            const enSubcarpeta = window.location.pathname.includes('/webs/');
            const rutaBase = enSubcarpeta ? '' : 'webs/';

            menuDesplegable.innerHTML = `
                <div class="info-user">
                    <div class="avatar-usuario">${iniciales}</div>
                    <div class="txt-info-user">
                        <strong>${sesion.nombre}</strong>
                        <a href="${rutaBase}perfil.html" style="font-size:0.75rem; color:var(--color-principal); text-decoration:none;">Mi cuenta</a>
                    </div>
                </div>
                <div class="separador-desplegable"></div>
                <a href="${rutaBase}listas.html" class="elemento-desplegable">
                    <i class="ph ph-list-dashes"></i> Mis Listas
                </a>
                <div class="separador-desplegable"></div>
                <a href="#" class="elemento-desplegable" onclick="cerrarSesion()">
                    <i class="ph ph-sign-out"></i> Cerrar sesión
                </a>
            `;
        } else {
            // No registrado el usuario
            contenidoDesplegable.innerHTML = `<i class="ph ph-user" style="font-size: 20px;"></i>`;

            menuDesplegable.innerHTML = `
                <a href="#" class="elemento-desplegable" onclick="modalLogin(event)" style="justify-content: center; padding: 1rem;">
                    <i class="ph ph-sign-in"></i> Iniciar Sesión / Registrarse
                </a>
            `;
        }

        // Abrir/Cerrar desplegable
        botonUsuario.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDesplegable.classList.toggle('visible');
        });

        document.addEventListener('click', (e) => {
            if (!menuDesplegable.contains(e.target) && !botonUsuario.contains(e.target)) {
                menuDesplegable.classList.remove('visible');
            }
        });
    }

    // 2. Creación modal login
    if (!document.getElementById('contenedor-login')) {
        const htmlModal = `
            <div id="contenedor-login" class="superposicion-modal" style="display: none;">
                <div class="tarjeta-inicio-sesion">
                    <!-- FORMULARIO DE LOGIN -->
                    <div id="formulario-login">
                        <div class="cabecera-inicio-sesion">
                            <h2>Iniciar Sesión</h2>
                            <button class="boton-cerrar" onclick="cerrarModalLogin()"><i class="ph ph-x"></i></button>
                        </div>

                        <div class="grupo-formulario">
                            <label for="correo-login">Correo electrónico</label>
                            <div class="contenedor-entrada">
                                <input type="email" id="correo-login" placeholder="correo@gmail.com" required>
                            </div>
                        </div>

                        <div class="grupo-formulario">
                            <label for="contra-login">Contraseña</label>
                            <div class="contenedor-entrada">
                                <input type="password" id="contra-login" placeholder="********" required>
                                <i class="ph ph-eye alternar-contrasena" onclick="alternarContra('contra-login', this)"></i>
                            </div>
                        </div>

                        <div class="opciones-formulario">
                            <label class="contenedor-casilla">
                                <input type="checkbox" id="recordarme"> Recuérdame
                            </label>
                            <a href="#" class="enlace-recuperar-contrasena">Olvidé mi contraseña</a>
                        </div>

                        <button class="boton-enviar" onclick="procesarLogin()">Iniciar sesión</button>

                        <p class="alternar-formulario">
                            ¿Aún no tienes una cuenta? <span onclick="mostrarFormulario('registro')">Registrarme</span>
                        </p>
                    </div>

                    <!-- FORMULARIO DE REGISTRO-->
                    <div id="formulario-register" class="oculto">
                        <div class="cabecera-inicio-sesion">
                            <h2>Registrarme</h2>
                            <button class="boton-cerrar" onclick="cerrarModalLogin()"><i class="ph ph-x"></i></button>
                        </div>

                        <div class="grupo-formulario">
                            <label for="nombre-register">Nombre de usuario</label>
                            <div class="contenedor-entrada">
                                <input type="text" id="nombre-register" placeholder="Ingresa usuario" required>
                            </div>
                        </div>

                        <div class="grupo-formulario">
                            <label for="correo-register">Correo electrónico</label>
                            <div class="contenedor-entrada">
                                <input type="email" id="correo-register" placeholder="Ingresa correo" required>
                            </div>
                        </div>

                        <div class="grupo-formulario">
                            <label for="contrasena-register">Contraseña</label>
                            <div class="contenedor-entrada">
                                <input type="password" id="contrasena-register" placeholder="********" required>
                                <i class="ph ph-eye alternar-contrasena" onclick="alternarContra('contrasena-register', this)"></i>
                            </div>
                        </div>

                        <button class="boton-enviar" onclick="procesarRegistro()">Crear mi cuenta</button>

                        <p class="alternar-formulario">
                            ¿Ya tienes una cuenta? <span onclick="mostrarFormulario('login')">Iniciar Sesión</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', htmlModal);
    }


    // 3. Funciones
    window.modalLogin = function (e) {
        if (e) e.preventDefault();
        document.getElementById('contenedor-login').style.display = 'flex';
        document.getElementById('desplegable-usuario').classList.remove('visible');
        mostrarFormulario('login');
    };

    window.cerrarModalLogin = function () {
        document.getElementById('contenedor-login').style.display = 'none';
    };

    window.mostrarFormulario = function (tipo) {
        if (tipo === 'login') {
            document.getElementById('formulario-login').classList.remove('oculto');
            document.getElementById('formulario-register').classList.add('oculto');
        } else {
            document.getElementById('formulario-login').classList.add('oculto');
            document.getElementById('formulario-register').classList.remove('oculto');
        }
    };

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
            location.reload();
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