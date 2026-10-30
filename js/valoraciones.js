document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.anime-card');

    // Función simulada que haría la petición a tu base de datos/API
    const obtenerMediaDeBD = async (animeId) => {
        // Aquí iría tu fetch real: 
        // const res = await fetch(`/api/valoraciones/${animeId}`);
        // const data = await res.json();
        
        // Datos de prueba simulados (luego los borras)
        const notasSimuladas = {
            1: 8.7, 2: 8.5, 3: 8.6, 
            4: 9.0, 5: 8.6, 6: 7.8
        };
        return notasSimuladas[animeId] || 'N/A';
    };

    // Recorremos cada tarjeta
    tarjetas.forEach(async (tarjeta) => {
        const animeId = tarjeta.getAttribute('data-anime-id');
        const contenedorNota = tarjeta.querySelector('.anime-rating-container');
        
        // Obtenemos la media
        const media = await obtenerMediaDeBD(animeId);
        
        // Inyectamos el HTML de la estrella dinámicamente
        if (media !== 'N/A') {
            contenedorNota.innerHTML = `<div class="anime-rating"><span class="star">★</span> ${media}</div>`;
        } else {
            contenedorNota.innerHTML = `<div class="anime-rating sin-votos">Sin valoraciones</div>`;
        }
    });
});