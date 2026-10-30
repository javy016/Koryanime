document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('serie-container');
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');
    
    const anime = getAnimeById(animeId);
    if (!anime) {
        container.innerHTML = `<h2 style="text-align:center; padding: 4rem;">Serie no encontrada</h2>`;
        return;
    }

    document.title = `${anime.titulo} ${anime.subtitulo ? '- ' + anime.subtitulo : ''} - Koryanime`;

    let vistos = JSON.parse(localStorage.getItem(`vistos_${anime.id}`)) || [];
    let epsInvertidos = false;
    let textoBusqueda = "";
    
    const listasUsuario = JSON.parse(localStorage.getItem('listasKoryanime')) || { favoritos: [] };
    const estaEnFavoritos = listasUsuario.favoritos.includes(anime.id);

    function crearCabeceraHTML() {
        const etiquetasHTML = anime.etiquetas.map(tag => 
            `<a href="catalogo?categoria=${tag}" class="tag-new">${tag}</a>`
        ).join('');

        return `
            <div class="serie-hero-container">
                <div class="serie-hero-bg" style="background-image: url('${anime.imagen}');"></div>
                <div class="serie-hero-gradient"></div>
                
                <div class="serie-main-info">
                    <div class="serie-poster-new">
                        <img src="${anime.imagen}" alt="${anime.titulo}">
                    </div>
                    <div class="serie-details-new">
                        <h1>${anime.titulo} <span style="font-size: 1.5rem; color: var(--text-muted); font-weight: 500;">${anime.subtitulo || ''}</span></h1>
                        <div class="serie-meta">
                            <span>${anime.tipo || 'TV Anime'}</span> &bull; 
                            <span>${anime.año}</span> &bull; 
                            <span>${anime.estado}</span>
                        </div>
                        <div class="serie-tags-new">${etiquetasHTML}</div>
                        <p class="serie-synopsis-new">${anime.sinopsis}</p>

                        <div class="serie-action-bar">
                            <div class="rating-box">
                                <span class="star">★</span>
                                <div class="rating-text">
                                    <strong>${anime.puntuacion}</strong>
                                    <span>MAL RATING<br>${anime.votos} Votos</span>
                                </div>
                            </div>
                            
                            <a href="${anime.trailer || '#'}" target="_blank" class="btn-action btn-trailer">
                                <i class="ph ph-play"></i> Tráiler
                            </a>
                            
                            <select id="lista-select" class="btn-action select-lista">
                                <option value="">+ Agregar a lista</option>
                                <option value="viendo">Viendo</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="pausado">Pausado</option>
                                <option value="completado">Completado</option>
                                <option value="descartado">Descartado</option>
                                <option value="eliminar">Eliminar de la lista</option>
                            </select>

                            <button id="btn-fav" class="btn-action btn-icon-only ${estaEnFavoritos ? 'active-fav' : ''}">
                                <i class="ph ${estaEnFavoritos ? 'ph-heart-fill' : 'ph-heart'}"></i>
                            </button>
                            
                            <button id="btn-share" class="btn-action btn-icon-only">
                                <i class="ph ph-share-network"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function crearRelacionadosHTML() {
        if (!anime.relacionados || anime.relacionados.length === 0) return '';

        let listaRelacionados = [...anime.relacionados];
        const ordenTipos = { "Precuela": 1, "Secuela": 2, "Película": 3, "Alternativa": 4, "Otro": 5 };
        listaRelacionados.sort((a, b) => (ordenTipos[a.tipo] || 99) - (ordenTipos[b.tipo] || 99));

        let html = `<section class="related-section">
                        <h2>Relacionados</h2>
                        <div class="related-timeline">`;

        listaRelacionados.forEach(rel => {
            html += `
                <div class="timeline-item">
                    <div class="timeline-year">${rel.año}</div>
                    <a href="serie?id=${rel.id}" class="related-card-horizontal">
                        <img src="${rel.imagen}" alt="${rel.titulo}">
                        <div class="rel-info-horizontal">
                            <h4>${rel.titulo}</h4>
                            <span>${rel.tipo}</span>
                        </div>
                    </a>
                </div>
            `;
        });

        html += `</div></section>`;
        return html;
    }

    function crearEpisodiosHTML() {
        if (!anime.temporadas || anime.temporadas.length === 0) return '<p>No hay episodios disponibles.</p>';

        let todosLosEps = anime.temporadas[0].episodios;
        let epsFiltrados = todosLosEps.filter(ep => 
            ep.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()) || 
            ep.id.toString() === textoBusqueda
        );

        if (epsInvertidos) epsFiltrados.reverse();

        let html = `
            <div class="episodes-header">
                <h2>Episodios</h2>
                <div class="ep-filters">
                    <div class="search-ep-box">
                        <i class="ph ph-magnifying-glass"></i>
                        <input type="text" id="search-ep-input" placeholder="Episodios" value="${textoBusqueda}">
                        ${textoBusqueda ? `<button id="clear-search" style="background:none; border:none; color:var(--text-muted); cursor:pointer;"><i class="ph ph-x"></i></button>` : ''}
                    </div>
                    <button id="btn-order-eps" class="btn-filter" title="Invertir orden">
                        <i class="ph ph-arrows-down-up"></i>
                    </button>
                </div>
            </div>
            <div class="episodes-grid">
        `;

        if (epsFiltrados.length === 0) {
            html += `<p style="grid-column: 1/-1; color: var(--text-muted); padding: 1rem 0;">No se encontraron episodios.</p>`;
        } else {
            epsFiltrados.forEach(ep => {
                const isVisto = vistos.includes(ep.id);
                // Usamos 'is-watched' que es lo que lee el nuevo CSS
                const checkClass = isVisto ? 'is-watched' : '';

                html += `
                    <div class="episode-modern-card-wrapper">
                        <a href="episodio?id=${anime.id}&ep=${ep.id}" class="episode-card">
                            <div class="episode-thumbnail">
                                <img src="${ep.imagen || anime.imagen}" alt="${ep.titulo}">
                                <div class="play-overlay">
                                    <div class="play-btn">▶</div>
                                </div>
                                <div class="ep-badge">Episodio ${ep.id}</div>
                            </div>
                            <div class="episode-info">
                                <h3 class="ep-title">${ep.titulo}</h3>
                            </div>
                        </a>
                        <button class="btn-mark-watched ${checkClass}" data-ep-id="${ep.id}" title="Marcar como visto">
                            <i class="ph ph-check-circle"></i>
                            <i class="ph ph-eye"></i>
                        </button>
                    </div>
                `;
            });
        }
        
        html += `</div>`;
        return html;
    }

    function renderizarTodo() {
        container.innerHTML = `
            ${crearCabeceraHTML()}
            ${crearRelacionadosHTML()}
            
            <div class="serie-tabs">
                <button class="tab-btn active" data-tab="episodios">Episodios</button>
                <button class="tab-btn" data-tab="comentarios">Comentarios</button>
            </div>
            
            <div id="tab-content">
                ${crearEpisodiosHTML()}
            </div>
        `;
        
        bindEvents();
    }

    function bindEvents() {
        document.getElementById('btn-order-eps')?.addEventListener('click', () => {
            epsInvertidos = !epsInvertidos;
            document.getElementById('tab-content').innerHTML = crearEpisodiosHTML();
            bindEvents();
        });

        document.getElementById('search-ep-input')?.addEventListener('input', (e) => {
            textoBusqueda = e.target.value;
            document.getElementById('tab-content').innerHTML = crearEpisodiosHTML();
            bindEvents();
            const input = document.getElementById('search-ep-input');
            if(input) {
                input.focus();
                input.setSelectionRange(textoBusqueda.length, textoBusqueda.length);
            }
        });

        document.getElementById('clear-search')?.addEventListener('click', () => {
            textoBusqueda = "";
            document.getElementById('tab-content').innerHTML = crearEpisodiosHTML();
            bindEvents();
        });

        // Lógica del botón de la tarjeta (Ojo/Tick)
        document.querySelectorAll('.btn-mark-watched').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const epId = parseInt(btn.dataset.epId);
                
                if (vistos.includes(epId)) {
                    vistos = vistos.filter(id => id !== epId);
                    btn.classList.remove('is-watched');
                } else {
                    vistos.push(epId);
                    btn.classList.add('is-watched');
                }
                
                localStorage.setItem(`vistos_${anime.id}`, JSON.stringify(vistos));
            });
        });

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (btn.dataset.tab === 'episodios') {
                    document.getElementById('tab-content').innerHTML = crearEpisodiosHTML();
                    bindEvents();
                } else {
                    document.getElementById('tab-content').innerHTML = `
                        <div class="comments-placeholder">
                            <h3>Comentarios de la serie</h3>
                            <p>Aquí aparecerán los comentarios generales.</p>
                        </div>
                    `;
                }
            });
        });
    }

    // Sincronización al volver del reproductor (con un pequeño delay de 100ms para asegurar)
    window.addEventListener('focus', () => {
        setTimeout(() => {
            vistos = JSON.parse(localStorage.getItem(`vistos_${anime.id}`)) || [];
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab && activeTab.dataset.tab === 'episodios') {
                document.getElementById('tab-content').innerHTML = crearEpisodiosHTML();
                bindEvents();
            }
        }, 100);
    });

    renderizarTodo();

    // Botones de la cabecera
    document.getElementById('btn-fav').addEventListener('click', function() {
        const favs = JSON.parse(localStorage.getItem('listasKoryanime'))?.favoritos || [];
        const index = favs.indexOf(anime.id);
        if (index > -1) {
            favs.splice(index, 1);
            this.classList.remove('active-fav');
            this.innerHTML = `<i class="ph ph-heart"></i>`;
        } else {
            favs.push(anime.id);
            this.classList.add('active-fav');
            this.innerHTML = `<i class="ph ph-heart-fill"></i>`;
        }
        localStorage.setItem('listasKoryanime', JSON.stringify({ favoritos: favs }));
    });

    document.getElementById('lista-select').addEventListener('change', function() {
        if (this.value === 'eliminar') {
            alert("Eliminado de todas las listas");
            this.value = "";
            return;
        }
        if (this.value) alert(`Guardado en la lista: ${this.value}`);
    });

    document.getElementById('btn-share').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({ title: anime.titulo, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("¡Enlace copiado al portapapeles!");
        }
    });
});