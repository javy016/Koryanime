
// Gestiona el tema visual 

document.addEventListener('DOMContentLoaded', () => {

    const alternarTema = document.getElementById('alternar-tema');
    const cuerpoPagina = document.body;
    const logoWeb = document.getElementById('logotipo-koryanime');
    const iconoSol = document.getElementById('icono-sol');
    const iconoLuna = document.getElementById('icono-luna');

    if (alternarTema) {
        // Detecta si estamos en la subcarpeta 
        const enSubcarpeta = window.location.pathname.includes('/webs/');
        const rutaLogos = enSubcarpeta ? '../Imagenes/logos/' : './Imagenes/logos/';

        function actualizarLogotipo(esTemaClaro) {
            if (logoWeb) {
                logoWeb.src = esTemaClaro
                    ? rutaLogos + 'logo_oscuro.png'
                    : rutaLogos + 'logo_claro.png';
            }
        }

        const temaActual = localStorage.getItem('theme');

        if (temaActual === 'dark') {
            cuerpoPagina.classList.add('tema-oscuro');
            actualizarLogotipo(false);
            if (iconoSol) iconoSol.classList.remove('activo');
            if (iconoLuna) iconoLuna.classList.add('activo');
        } else {
            cuerpoPagina.classList.remove('tema-oscuro');
            actualizarLogotipo(true);
            if (iconoSol) iconoSol.classList.add('activo');
            if (iconoLuna) iconoLuna.classList.remove('activo');
            if (!temaActual) localStorage.setItem('theme', 'light');
        }

        alternarTema.addEventListener('click', () => {
            cuerpoPagina.classList.toggle('tema-oscuro');
            const esOscuro = cuerpoPagina.classList.contains('tema-oscuro');
            const esClaro = !esOscuro;

            actualizarLogotipo(esClaro);

            if (esOscuro) {
                if (iconoSol) iconoSol.classList.remove('activo');
                if (iconoLuna) iconoLuna.classList.add('activo');
                localStorage.setItem('theme', 'dark');
            } else {
                if (iconoSol) iconoSol.classList.add('activo');
                if (iconoLuna) iconoLuna.classList.remove('activo');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
