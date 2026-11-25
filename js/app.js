// Renderiza el contenido dinamico
document.addEventListener('DOMContentLoaded', () => {

    // 1. Carrusel
    const carruselPortada = document.getElementById('carrusel-portada');
    const botonAnterior = document.getElementById('btn-prev');
    const botonSiguiente = document.getElementById('btn-next');
    let indiceActual = 0;

    function procesarPortada(indice) {
        if (datosCarrusel.length === 0) return;
        const anime = datosCarrusel[indice];
        carruselPortada.innerHTML = `
            <div class="fondo-portada" style="background-image: url('${anime.imagenCarrusel}');">
                <div class="superposicion-portada"></div>
                <div class="contenido-portada">
                    <div class="generos-portada">
                        ${anime.generos.map(etiqueta => `<span class="etiqueta">${etiqueta}</span>`).join('')}
                    </div>
                    <h1 class="titulo-portada">${anime.titulo}</h1>
                    <div class="puntuacion-portada"><span class="estrella">★</span> ${anime.puntuacion}</div>
                    <p class="sinopsis-portada">${anime.sinopsis}</p>
                    <a href="webs/serie?id=${anime.id}" class="boton-principal">Ver detalles</a>
                </div>
            </div>
        `;
    }

    if (datosCarrusel.length > 0) {
        procesarPortada(indiceActual);
        if (datosCarrusel.length > 1) {
            botonSiguiente.addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % datosCarrusel.length;
                procesarPortada(indiceActual);
            });
            botonAnterior.addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + datosCarrusel.length) % datosCarrusel.length;
                procesarPortada(indiceActual);
            });
        } else {
            botonAnterior.style.display = 'none';
            botonSiguiente.style.display = 'none';
        }
    }

    // 2. Tendencias
    const celdasTendencias = document.getElementById('trending-grid');

    let allEpisodios = [];
    datosSeries.forEach(anime => {
        anime.temporadas.forEach(temp => {
            temp.episodios.forEach(ep => {
                allEpisodios.push({
                    idAnime: anime.id,
                    tituloAnime: anime.titulo,
                    imgAnime: anime.imagen,
                    puntuacion: anime.puntuacion,
                    fechaSubida: ep.fechaSubida || "2000-01-01T00:00:00",
                    idEpisodio: ep.id
                });
            });
        });
    });

    allEpisodios.sort((a, b) => new Date(b.fechaSubida) - new Date(a.fechaSubida));

    let seriesTendencias = [];
    let idVistos = new Set();

    allEpisodios.forEach(ep => {
        if (!idVistos.has(ep.idAnime) && seriesTendencias.length < 6) {
            idVistos.add(ep.idAnime);
            seriesTendencias.push(ep);
        }
    });

    seriesTendencias.forEach(serie => {
        celdasTendencias.innerHTML =celdasTendencias.innerHTML+  `
            <a href="webs/serie?id=${serie.idAnime}" class="tarjeta-anime" style="text-decoration: none;">
                <div class="img-tarjeta">
                    <img src="${serie.imgAnime}" alt="${serie.tituloAnime}">
                </div>
                <div class="info-tarjeta">
                    <h3 class="titulo-anime">${serie.tituloAnime}</h3>
                    <div class="puntuacion-anime"><span class="estrella">★</span> ${serie.puntuacion}</div>
                </div>
            </a>
        `;
    });

    // 3. Episodios recientes
    const celdasEpisodios = document.getElementById('recent-episodes-grid');

    allEpisodios.slice(0, 4).forEach(ep => {
        celdasEpisodios.innerHTML =  celdasEpisodios.innerHTML+ `
            <a href="webs/serie?id=${ep.idAnime}#episodios" class="tarjeta-episodio" style="text-decoration: none;">
                <div class="miniatura-episodio">
                    <img src="${ep.imagen || ep.imgAnime}" alt="${ep.tituloAnime}">
                    <div class="superposicion-reproduccion">
                        <div class="btn-play">▶</div>
                    </div>
                    <div class="insg-ep">Episodio ${ep.idEpisodio}</div>
                </div>
                <div class="info-ep">
                    <h3 class="titulo-episodio">${ep.tituloAnime}</h3>
                </div>
            </a>
        `;
    });
});