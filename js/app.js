document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. RENDERIZAR CARRUSEL ---
    const heroCarousel = document.getElementById('hero-carousel');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    let currentIndex = 0;

    function renderHero(index) {
        if (carruselDB.length === 0) return; 
        const anime = carruselDB[index];
        heroCarousel.innerHTML = `
            <div class="hero-background" style="background-image: url('${anime.imagenCarrusel}');">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <div class="hero-tags">
                        ${anime.etiquetas.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <h1 class="hero-title">${anime.titulo}</h1>
                    <div class="hero-rating"><span class="star">★</span> ${anime.puntuacion}</div>
                    <p class="hero-synopsis">${anime.sinopsis}</p>
                    <!-- RUTA SIN .html -->
                    <a href="webs/serie?id=${anime.id}" class="btn-primary">Ver detalles</a>
                </div>
            </div>
        `;
    }

    if(carruselDB.length > 0) {
        renderHero(currentIndex);
        if (carruselDB.length > 1) {
            btnNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carruselDB.length;
                renderHero(currentIndex);
            });
            btnPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carruselDB.length) % carruselDB.length;
                renderHero(currentIndex);
            });
        } else {
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
        }
    }

    // --- 2. RENDERIZAR TENDENCIAS ---
    const trendingGrid = document.getElementById('trending-grid');
    
    let todosLosEpisodios = [];
    animesDB.forEach(anime => {
        anime.temporadas.forEach(temp => {
            temp.episodios.forEach(ep => {
                todosLosEpisodios.push({
                    animeId: anime.id,
                    tituloAnime: anime.titulo,
                    imagenAnime: anime.imagen,
                    puntuacion: anime.puntuacion,
                    fechaSubida: ep.fechaSubida || "2000-01-01T00:00:00",
                    epId: ep.id
                });
            });
        });
    });

    todosLosEpisodios.sort((a, b) => new Date(b.fechaSubida) - new Date(a.fechaSubida));

    let seriesEnTendencias = [];
    let idsVistos = new Set();

    todosLosEpisodios.forEach(ep => {
        if (!idsVistos.has(ep.animeId) && seriesEnTendencias.length < 6) {
            idsVistos.add(ep.animeId);
            seriesEnTendencias.push(ep);
        }
    });

    seriesEnTendencias.forEach(serie => {
        trendingGrid.innerHTML += `
            <!-- RUTA SIN .html -->
            <a href="webs/serie?id=${serie.animeId}" class="anime-card" style="text-decoration: none;">
                <div class="card-image">
                    <img src="${serie.imagenAnime}" alt="${serie.tituloAnime}">
                </div>
                <div class="card-info">
                    <h3 class="anime-title">${serie.tituloAnime}</h3>
                    <div class="anime-rating"><span class="star">★</span> ${serie.puntuacion}</div>
                </div>
            </a>
        `;
    });

    // --- 3. RENDERIZAR EPISODIOS RECIENTES ---
    const episodesGrid = document.getElementById('recent-episodes-grid');
    
    todosLosEpisodios.slice(0, 4).forEach(ep => {
        episodesGrid.innerHTML += `
            <!-- RUTA SIN .html -->
            <a href="webs/serie?id=${ep.animeId}#episodios" class="episode-card" style="text-decoration: none;">
                <div class="episode-thumbnail">
                    <img src="${ep.imagen || ep.imagenAnime}" alt="${ep.tituloAnime}">
                    <div class="play-overlay">
                        <div class="play-btn">▶</div>
                    </div>
                    <div class="ep-badge">Episodio ${ep.epId}</div>
                </div>
                <div class="episode-info">
                    <h3 class="ep-title">${ep.tituloAnime}</h3>
                </div>
            </a>
        `;
    });
});