document.addEventListener('DOMContentLoaded', () => {
    const userBtn = document.getElementById('user-btn');
    const dropdownContent = document.getElementById('user-dropdown-content');
    const dropdownMenu = document.getElementById('user-dropdown-menu');

    // ==========================================
    // 1. LÓGICA DEL DESPLEGABLE DEL HEADER
    // ==========================================
    if (userBtn && dropdownContent && dropdownMenu) {
        const sesion = getSesion();

        if (sesion) {
            // --- USUARIO LOGUEADO ---
            const iniciales = sesion.nombre.substring(0, 2).toUpperCase();
            dropdownContent.innerHTML = `<span style="font-weight: bold; font-size: 14px;">${iniciales}</span>`;

            const enSubcarpeta = window.location.pathname.includes('/webs/');
            const rutaBase = enSubcarpeta ? '' : 'webs/';

            dropdownMenu.innerHTML = `
                <div class="user-info-header">
                    <div class="user-avatar-circle">${iniciales}</div>
                    <div class="user-info-text">
                        <strong>${sesion.nombre}</strong>
                        <a href="${rutaBase}perfil.html" style="font-size:0.75rem; color:var(--primary-color); text-decoration:none;">Mi cuenta</a>
                    </div>
                </div>
                <div class="dropdown-divider"></div>
                <a href="${rutaBase}listas.html" class="dropdown-item">
                    <i class="ph ph-list-dashes"></i> Mis Listas
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" onclick="cerrarSesion()">
                    <i class="ph ph-sign-out"></i> Cerrar sesión
                </a>
            `;
        } else {
            // --- USUARIO NO REGISTRADO ---
            dropdownContent.innerHTML = `<i class="ph ph-user" style="font-size: 20px;"></i>`;
            
            // Botón que abre el modal
            dropdownMenu.innerHTML = `
                <a href="#" class="dropdown-item" onclick="abrirModalLogin(event)" style="justify-content: center; padding: 1rem;">
                    <i class="ph ph-sign-in"></i> Iniciar Sesión / Registrarse
                </a>
            `;
        }

        // Abrir/Cerrar desplegable
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !userBtn.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // ==========================================
    // 2. CREACIÓN E INYECCIÓN DEL MODAL DE LOGIN
    // ==========================================
    if (!document.getElementById('modal-login-container')) {
        const modalHTML = `
            <div id="modal-login-container" class="modal-overlay" style="display: none;">
                <div class="login-card">
                    <!-- FORMULARIO DE LOGIN -->
                    <div id="form-login">
                        <div class="login-header">
                            <h2>Iniciar Sesión</h2>
                            <button class="btn-close" onclick="cerrarModalLogin()"><i class="ph ph-x"></i></button>
                        </div>

                        <div class="form-group">
                            <label for="login-email">Correo electrónico</label>
                            <div class="input-container">
                                <input type="email" id="login-email" placeholder="correo@gmail.com" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="login-pass">Contraseña</label>
                            <div class="input-container">
                                <input type="password" id="login-pass" placeholder="********" required>
                                <i class="ph ph-eye toggle-pass" onclick="togglePassword('login-pass', this)"></i>
                            </div>
                        </div>

                        <div class="form-options">
                            <label class="checkbox-container">
                                <input type="checkbox" id="recuerdame"> Recuérdame
                            </label>
                            <a href="#" class="forgot-pass">Olvidé mi contraseña</a>
                        </div>

                        <button class="btn-submit" onclick="procesarLogin()">Iniciar sesión</button>

                        <p class="toggle-form">
                            ¿Aún no tienes una cuenta? <span onclick="mostrarFormulario('registro')">Registrarme</span>
                        </p>
                    </div>

                    <!-- FORMULARIO DE REGISTRO (Oculto) -->
                    <div id="form-registro" class="hidden">
                        <div class="login-header">
                            <h2>Registrarme</h2>
                            <button class="btn-close" onclick="cerrarModalLogin()"><i class="ph ph-x"></i></button>
                        </div>

                        <div class="form-group">
                            <label for="reg-nombre">Nombre de usuario</label>
                            <div class="input-container">
                                <input type="text" id="reg-nombre" placeholder="Ingresa usuario" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reg-email">Correo electrónico</label>
                            <div class="input-container">
                                <input type="email" id="reg-email" placeholder="Ingresa correo" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reg-pass">Contraseña</label>
                            <div class="input-container">
                                <input type="password" id="reg-pass" placeholder="********" required>
                                <i class="ph ph-eye toggle-pass" onclick="togglePassword('reg-pass', this)"></i>
                            </div>
                        </div>

                        <button class="btn-submit" onclick="procesarRegistro()">Crear mi cuenta</button>

                        <p class="toggle-form">
                            ¿Ya tienes una cuenta? <span onclick="mostrarFormulario('login')">Iniciar Sesión</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // ==========================================
    // 3. FUNCIONES GLOBALES 
    // ==========================================
    window.abrirModalLogin = function(e) {
        if(e) e.preventDefault();
        document.getElementById('modal-login-container').style.display = 'flex';
        document.getElementById('dropdownMenu').classList.remove('show'); // Cierra el desplegable si estaba abierto
        mostrarFormulario('login'); // Resetea a login
    };

    window.cerrarModalLogin = function() {
        document.getElementById('modal-login-container').style.display = 'none';
    };

    window.mostrarFormulario = function(tipo) {
        if (tipo === 'login') {
            document.getElementById('form-login').classList.remove('hidden');
            document.getElementById('form-registro').classList.add('hidden');
        } else {
            document.getElementById('form-login').classList.add('hidden');
            document.getElementById('form-registro').classList.remove('hidden');
        }
    };

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

    window.procesarLogin = function() {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        const res = loginUsuario(email, pass);
        
        if (res.ok) {
            alert("¡Bienvenido " + res.user.nombre + "!");
            location.reload(); // Recargar para que el header se actualice
        } else {
            alert(res.msg);
        }
    };

    window.procesarRegistro = function() {
        const nombre = document.getElementById('reg-nombre').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        if (nombre.length < 2) return alert("El nombre debe tener al menos 2 caracteres.");
        
        const res = registrarUsuario(nombre, email, pass);
        if (res.ok) {
            alert(res.msg);
            mostrarFormulario('login');
        } else {
            alert(res.msg);
        }
    };
});