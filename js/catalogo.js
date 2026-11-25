// Filtra, ordena y muestra las series disponibles en el catálogo. 

document.addEventListener('DOMContentLoaded', () => {
    const celdasCatalogo = document.getElementById('celdas-catalogo');
    const tituloCatalogo = document.getElementById('titulo-catalogo');
    const escribirBusqueda = document.querySelector('.escribir-Busqueda');
    const cantidadResultados = document.getElementById('cantidad-resultados');

    const panelFiltros = document.getElementById('panel-filtros');
    const botonAlternarFiltros = document.getElementById('boton-alternar-filtros');
    const botonesLetras = document.querySelectorAll('.boton-letra');
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroGenero = document.getElementById('filtro-genero');
    const filtroAnio = document.getElementById('filtro-anio');
    const filtroEstado = document.getElementById('filtro-estado');
    const botonAplicar = document.getElementById('aplicar-filtros');
    const ordenResultados = document.getElementById('orden-resultados');

    // 1. Lee la url y carga filtros
    const parametrosUrl = new URLSearchParams(window.location.search);
    const textoBusqueda = parametrosUrl.get('buscar');
    const categoria = parametrosUrl.get('categoria');
    const abrirFiltros = parametrosUrl.get('filtros');

    // Si la URL trae ?filtros=abiertos, quita el oculto
    if (abrirFiltros === 'abiertos' && panelFiltros) {
        panelFiltros.classList.remove('oculto');
    }

    // 2. Logica boton 
    if (botonAlternarFiltros && panelFiltros) {
        botonAlternarFiltros.addEventListener('click', (e) => {
            e.preventDefault();
            panelFiltros.classList.toggle('oculto');
        });
    }

    // 3. Rellena campos si detecta parámetros
    if (textoBusqueda && escribirBusqueda) {
        escribirBusqueda.value = textoBusqueda;
        tituloCatalogo.textContent = `Resultados para: "${textoBusqueda}"`;
    } else if (categoria) {
        tituloCatalogo.textContent = `Categoría: ${categoria}`;
        if (filtroGenero) filtroGenero.value = categoria;
        // Si filtramos por categoría, también abrimos el panel
        if (panelFiltros) panelFiltros.classList.remove('oculto');
    }

    function procesarCatalogo() {
        let resultados = [...datosSeries];

        if (textoBusqueda) {
            resultados = resultados.filter(anime =>
                anime.titulo.toLowerCase().includes(textoBusqueda.toLowerCase())
            );
        }

        const letraActiva = document.querySelector('.boton-letra.activo').dataset.letra;
        if (letraActiva !== 'all') {
            resultados = resultados.filter(anime =>
                anime.titulo.toUpperCase().startsWith(letraActiva)
            );
        }

        if (filtroTipo && filtroTipo.value) {
            resultados = resultados.filter(anime => anime.tipo === filtroTipo.value);
        }
        if (filtroGenero && filtroGenero.value) {
            resultados = resultados.filter(anime => anime.generos.includes(filtroGenero.value));
        }
        if (filtroAnio && filtroAnio.value) {
            resultados = resultados.filter(anime => anime.año.includes(filtroAnio.value));
        }
        if (filtroEstado && filtroEstado.value) {
            resultados = resultados.filter(anime => anime.estado === filtroEstado.value);
        }

        if (ordenResultados) {
            if (ordenResultados.value === 'rating') {
                resultados.sort((a, b) => parseFloat(b.puntuacion) - parseFloat(a.puntuacion));
            } else if (ordenResultados.value === 'year') {
                resultados.sort((a, b) => parseInt(b.año) - parseInt(a.año));
            }
        }

        if (cantidadResultados) {
            cantidadResultados.textContent = `${resultados.length} Resultados`;
        }

        if (resultados.length === 0) {
            celdasCatalogo.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--texto-secundario); padding: 3rem;">No se encontraron animes.</p>`;
            return;
        }

        celdasCatalogo.innerHTML = resultados.map(anime => `
            <a href="serie.html?id=${anime.id}" class="tarjeta-anime" style="text-decoration: none;">
                <div class="img-tarjeta">
                    <img src="${anime.imagen}" alt="${anime.titulo}">
                </div>
                <div class="info-tarjeta">
                    <h3 class="titulo-anime">${anime.titulo}</h3>
                    <div class="puntuacion-anime"><span class="estrella">★</span> ${anime.puntuacion}</div>
                </div>
            </a>
        `).join('');
    }

    // 5. Eventos
    botonesLetras.forEach(btn => {
        btn.addEventListener('click', () => {
            botonesLetras.forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            procesarCatalogo();
        });
    });

    if (botonAplicar) botonAplicar.addEventListener('click', procesarCatalogo);
    if (ordenResultados) ordenResultados.addEventListener('change', procesarCatalogo);

    procesarCatalogo();
});