// Muestra la ficha de cada serie y gestiona sus episodios y listas.

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-serie');
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idAnime = parametrosUrl.get('id');

    const anime = buscarSeriesId(idAnime);
    if (!anime) {
        contenedor.innerHTML = `<h2 style="text-align:center; padding: 4rem;">Serie no encontrada</h2>`;
        return;
    }

    document.title = `${anime.titulo} ${anime.subtitulo ? '- ' + anime.subtitulo : ''} `;

    let vistos = JSON.parse(localStorage.getItem(`vistos_${anime.id}`)) || [];
    let episodiosInvertidos = false;
    let textoBusqueda = "";

    const listasUsuario = JSON.parse(localStorage.getItem('listasKoryanime')) || { favoritos: [] };
    const listaFavoritos = listasUsuario.favoritos.includes(anime.id);

    function crearCabecera() {
        const generosHTML = anime.generos.map(etiqueta =>
            `<a href="catalogo?categoria=${etiqueta}" class="etiqueta-nueva">${etiqueta}</a>`
        ).join('');

        return `
            <div class="contenedor-portada-serie">
                <div class="fondo-portada-serie" style="background-image: url('${anime.imagen}');"></div>
                <div class="degradado-portada-serie"></div>
                
                <div class="informacion-principal-serie">
                    <div class="poster-serie">
                        <img src="${anime.imagen}" alt="${anime.titulo}">
                    </div>
                    <div class="detalles-serie">
                        <h1>${anime.titulo} <span style="font-size: 1.5rem; color: var(--texto-secundario); font-weight: 500;">${anime.subtitulo || ''}</span></h1>
                        <div class="datos-serie">
                            <span>${anime.tipo || 'TV Anime'}</span> &bull; 
                            <span>${anime.año}</span> &bull; 
                            <span>${anime.estado}</span>
                        </div>
                        <div class="generos-serie">${generosHTML}</div>
                        <p class="sinopsis-serie">${anime.sinopsis}</p>

                        <div class="acciones-serie">        
                            <a href="${anime.trailer || '#'}" target="_blank" class="btn-trailer">
                                <i class="ph ph-play"></i> Tráiler
                            </a>
                            
                            <select id="lista-select" class="boton-accion selector-lista">
                                <option value="">+ Agregar a lista</option>
                                <option value="viendo">Viendo</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="pausado">Pausado</option>
                                <option value="completado">Completado</option>
                                <option value="descartado">Descartado</option>
                                <option value="eliminar">Eliminar de la lista</option>
                            </select>

                            <button id="btn-fav" class="boton-accion boton-solo-icono ${listaFavoritos ? 'favorito-activo' : ''}">
                                <i class="ph ${listaFavoritos ? 'ph-heart-fill' : 'ph-heart'}"></i>
                            </button>
                            
                            <button id="btn-share" class="boton-accion boton-solo-icono">
                                <i class="ph ph-share-network"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function crearRelaciones() {
        if (!anime.relacionados || anime.relacionados.length === 0) return '';

        let listaRelacionados = [...anime.relacionados];
        const ordenTipos = { "Precuela": 1, "Secuela": 2, "Película": 3, "Alternativa": 4, "Otro": 5 };
        listaRelacionados.sort((a, b) => (ordenTipos[a.tipo] || 99) - (ordenTipos[b.tipo] || 99));

        let html = `<section class="seccion-relacionados">
                        <h2>Relacionados</h2>
                        <div class="tiempo-relaciones">`;

        listaRelacionados.forEach(rel => {
            html = html + `
                <div class="linea-tiempo">
                    <div class="anio-tiempo">${rel.año}</div>
                    <a href="serie?id=${rel.id}" class="relacion-horizontal">
                        <img src="${rel.imagen}" alt="${rel.titulo}">
                        <div class="info-relacion">
                            <h4>${rel.titulo}</h4>
                            <span>${rel.tipo}</span>
                        </div>
                    </a>
                </div>
            `;
        });

        html = html +  `</div></section>`;
        return html;
    }

    function crearEpisodios() {
        if (!anime.temporadas || anime.temporadas.length === 0) return '<p>No hay episodios disponibles.</p>';

        let allEpisodios = anime.temporadas[0].episodios;
        let episodiosFiltrados = allEpisodios.filter(ep =>
            ep.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
            ep.id.toString() === textoBusqueda
        );

        if (episodiosInvertidos) episodiosFiltrados.reverse();

        let html = `
            <div class="cabecera-episodios">
                <h2>Episodios</h2>
                <div class="filtros-episodio">
                    <div class="caja-busqueda-episodios">
                        <i class="ph ph-magnifying-glass"></i>
                        <input type="text" id="busqueda-ep" placeholder="Episodios" value="${textoBusqueda}">
                        ${textoBusqueda ? `<button id="cerrar-busqueda" style="background:none; border:none; color:var(--texto-secundario); cursor:pointer;"><i class="ph ph-x"></i></button>` : ''}
                    </div>
                    <button id="btn-ordenar-ep" class="btn-filter" title="Invertir orden">
                        <i class="ph ph-arrows-down-up"></i>
                    </button>
                </div>
            </div>
            <div class="celda-episodios">
        `;

        if (episodiosFiltrados.length === 0) {
            html = html + `<p style="grid-column: 1/-1; color: var(--texto-secundario); padding: 1rem 0;">No se encontraron episodios.</p>`;
        } else {
            episodiosFiltrados.forEach(ep => {
                const estaVisto = vistos.includes(ep.id);
                const claseVerificado = estaVisto ? 'esta-visto' : '';

                html = html+ `
                    <div class="contenedor-tarjeta-moderna-episodio">
                        <a href="episodio?id=${anime.id}&ep=${ep.id}" class="tarjeta-episodio">
                            <div class="miniatura-episodio">
                                <img src="${ep.imagen || anime.imagen}" alt="${ep.titulo}">
                                <div class="superposicion-reproduccion">
                                    <div class="btn-play">▶</div>
                                </div>
                                <div class="insg-ep">Episodio ${ep.id}</div>
                            </div>
                            <div class="info-ep">
                                <h3 class="titulo-episodio">${ep.titulo}</h3>
                            </div>
                        </a>
                        <button class="boton-marcar-visto ${claseVerificado}" data-id-episodio="${ep.id}" title="Marcar como visto">
                            <i class="ph ph-check-circle"></i>
                            <i class="ph ph-eye"></i>
                        </button>
                    </div>
                `;
            });
        }

        html = html + `</div>`;
        return html;
    }

    function procesarTodo() {
        contenedor.innerHTML = `
            ${crearCabecera()}
            ${crearRelaciones()}
            
            <div class="pestanas-serie">
                <button class="boton-pestana activo" data-pestana="episodios">Episodios</button>
                <button class="boton-pestana" data-pestana="comentarios">Comentarios</button>
            </div>
            
            <div id="tab-content">
                ${crearEpisodios()}
            </div>
        `;

        asociarEventos();
    }

    function asociarEventos() {
        document.getElementById('btn-ordenar-ep')?.addEventListener('click', () => {
            episodiosInvertidos = !episodiosInvertidos;
            document.getElementById('tab-content').innerHTML = crearEpisodios();
            asociarEventos();
        });

        document.getElementById('busqueda-ep')?.addEventListener('input', (e) => {
            textoBusqueda = e.target.value;
            document.getElementById('tab-content').innerHTML = crearEpisodios();
            asociarEventos();
            const entrada = document.getElementById('busqueda-ep');
            if (entrada) {
                entrada.focus();
                entrada.setSelectionRange(textoBusqueda.length, textoBusqueda.length);
            }
        });

        document.getElementById('cerrar-busqueda')?.addEventListener('click', () => {
            textoBusqueda = "";
            document.getElementById('tab-content').innerHTML = crearEpisodios();
            asociarEventos();
        });

        document.querySelectorAll('.boton-marcar-visto').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const idEpisodio = parseInt(btn.dataset.idEpisodio);

                if (vistos.includes(idEpisodio)) {
                    vistos = vistos.filter(id => id !== idEpisodio);
                    btn.classList.remove('esta-visto');
                } else {
                    vistos.push(idEpisodio);
                    btn.classList.add('esta-visto');
                }

                localStorage.setItem(`vistos_${anime.id}`, JSON.stringify(vistos));
            });
        });

        document.querySelectorAll('.boton-pestana').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.boton-pestana').forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');

                if (btn.dataset.pestana === 'episodios') {
                    document.getElementById('tab-content').innerHTML = crearEpisodios();
                    asociarEventos();
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

    window.addEventListener('focus', () => {
        setTimeout(() => {
            vistos = JSON.parse(localStorage.getItem(`vistos_${anime.id}`)) || [];
            const pestanaActiva = document.querySelector('.boton-pestana.activo');
            if (pestanaActiva && pestanaActiva.dataset.pestana === 'episodios') {
                document.getElementById('tab-content').innerHTML = crearEpisodios();
                asociarEventos();
            }
        }, 100);
    });

    procesarTodo();

    document.getElementById('btn-fav').addEventListener('click', function () {
        const favoritos = JSON.parse(localStorage.getItem('listasKoryanime'))?.favoritos || [];
        const indice = favoritos.indexOf(anime.id);
        if (indice > -1) {
            favoritos.splice(indice, 1);
            this.classList.remove('favorito-activo');
            this.innerHTML = `<i class="ph ph-heart"></i>`;
        } else {
            favoritos.push(anime.id);
            this.classList.add('favorito-activo');
            this.innerHTML = `<i class="ph ph-heart-fill"></i>`;
        }
        localStorage.setItem('listasKoryanime', JSON.stringify({ favoritos: favoritos }));
    });

    document.getElementById('lista-select').addEventListener('change', function () {
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