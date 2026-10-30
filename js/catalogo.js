document.addEventListener('DOMContentLoaded', () => {
    const catalogoGrid = document.getElementById('catalogo-grid');
    const tituloCatalogo = document.getElementById('titulo-catalogo');
    const searchInput = document.querySelector('.search-input');
    const resultsCount = document.getElementById('results-count');
    
    const panelFiltros = document.getElementById('panel-filtros');
    const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
    const alphaBtns = document.querySelectorAll('.alpha-btn');
    const filterType = document.getElementById('filter-type');
    const filterGenre = document.getElementById('filter-genre');
    const filterYear = document.getElementById('filter-year');
    const filterStatus = document.getElementById('filter-status');
    const applyBtn = document.getElementById('apply-filters');
    const sortOrder = document.getElementById('sort-order');

    // 1. LEER LA URL PARA VER SI DEBEMOS ABRIR LOS FILTROS
    const urlParams = new URLSearchParams(window.location.search);
    const textoBusqueda = urlParams.get('buscar');
    const categoria = urlParams.get('categoria');
    const abrirFiltros = urlParams.get('filtros');

    // Si la URL trae ?filtros=abiertos, quitamos el hidden
    if (abrirFiltros === 'abiertos' && panelFiltros) {
        panelFiltros.classList.remove('hidden');
    }

    // 2. LÓGICA DEL BOTÓN (Toggle)
    if (toggleFiltersBtn && panelFiltros) {
        toggleFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            panelFiltros.classList.toggle('hidden');
        });
    }

    // 3. RELLENAR CAMPOS SI VENIMOS CON PARÁMETROS
    if (textoBusqueda && searchInput) {
        searchInput.value = textoBusqueda;
        tituloCatalogo.textContent = `Resultados para: "${textoBusqueda}"`;
    } else if (categoria) {
        tituloCatalogo.textContent = `Categoría: ${categoria}`;
        if (filterGenre) filterGenre.value = categoria;
        // Si filtramos por categoría, también abrimos el panel
        if (panelFiltros) panelFiltros.classList.remove('hidden');
    }

    // 4. FUNCIÓN DE RENDERIZADO
    function renderizarCatalogo() {
        let resultados = [...animesDB];

        if (textoBusqueda) {
            resultados = resultados.filter(anime => 
                anime.titulo.toLowerCase().includes(textoBusqueda.toLowerCase())
            );
        }

        const activeLetter = document.querySelector('.alpha-btn.active').dataset.letter;
        if (activeLetter !== 'all') {
            resultados = resultados.filter(anime => 
                anime.titulo.toUpperCase().startsWith(activeLetter)
            );
        }

        if (filterType && filterType.value) {
            resultados = resultados.filter(anime => anime.tipo === filterType.value);
        }
        if (filterGenre && filterGenre.value) {
            resultados = resultados.filter(anime => anime.etiquetas.includes(filterGenre.value));
        }
        if (filterYear && filterYear.value) {
            resultados = resultados.filter(anime => anime.año.includes(filterYear.value));
        }
        if (filterStatus && filterStatus.value) {
            resultados = resultados.filter(anime => anime.estado === filterStatus.value);
        }

        if (sortOrder) {
            if (sortOrder.value === 'rating') {
                resultados.sort((a, b) => parseFloat(b.puntuacion) - parseFloat(a.puntuacion));
            } else if (sortOrder.value === 'year') {
                resultados.sort((a, b) => parseInt(b.año) - parseInt(a.año));
            }
        }

        if (resultsCount) {
            resultsCount.textContent = `${resultados.length} Resultados`;
        }

        if (resultados.length === 0) {
            catalogoGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem;">No se encontraron animes.</p>`;
            return;
        }

        catalogoGrid.innerHTML = resultados.map(anime => `
            <a href="serie?id=${anime.id}" class="anime-card" style="text-decoration: none;">
                <div class="card-image">
                    <img src="${anime.imagen}" alt="${anime.titulo}">
                </div>
                <div class="card-info">
                    <h3 class="anime-title">${anime.titulo}</h3>
                    <div class="anime-rating"><span class="star">★</span> ${anime.puntuacion}</div>
                </div>
            </a>
        `).join('');
    }

    // 5. EVENTOS
    alphaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alphaBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderizarCatalogo();
        });
    });

    if (applyBtn) applyBtn.addEventListener('click', renderizarCatalogo);
    if (sortOrder) sortOrder.addEventListener('change', renderizarCatalogo);

    renderizarCatalogo();
});