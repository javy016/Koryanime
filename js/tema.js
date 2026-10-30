document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. LÓGICA DEL CAMBIO DE TEMA (Original)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logoKoryanime = document.getElementById('logo-koryanime'); 
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    if (themeToggle) {
        // Detectamos si estamos en la subcarpeta /webs/
        const enSubcarpeta = window.location.pathname.includes('/webs/');
        const rutaLogos = enSubcarpeta ? '../Imagenes/logos/' : './Imagenes/logos/';

        function updateLogo(isLightTheme) {
            if (logoKoryanime) {
                logoKoryanime.src = isLightTheme
                    ? rutaLogos + 'logo_oscuro.png'
                    : rutaLogos + 'logo_claro.png';
            }
        }

        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark') {
            body.classList.add('dark-theme');
            updateLogo(false);
            if (iconSun) iconSun.classList.remove('active');
            if (iconMoon) iconMoon.classList.add('active');
        } else {
            body.classList.remove('dark-theme');
            updateLogo(true);
            if (iconSun) iconSun.classList.add('active');
            if (iconMoon) iconMoon.classList.remove('active');
            if (!currentTheme) localStorage.setItem('theme', 'light');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            const isLight = !isDark;

            updateLogo(isLight);

            if (isDark) {
                if (iconSun) iconSun.classList.remove('active');
                if (iconMoon) iconMoon.classList.add('active');
                localStorage.setItem('theme', 'dark');
            } else {
                if (iconSun) iconSun.classList.add('active');
                if (iconMoon) iconMoon.classList.remove('active');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ==========================================
    // 2. LÓGICA DEL MENÚ DESPLEGABLE DE USUARIO
    // ==========================================
    const userBtn = document.getElementById('user-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userBtn && userDropdown) {
        // Al hacer clic en la foto de perfil
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague y cierre el menú de inmediato
            userDropdown.classList.toggle('show');
        });

        // Al hacer clic en cualquier otra parte de la pantalla, se cierra el menú
        document.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
});