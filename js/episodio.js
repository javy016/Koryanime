// Carga el episodio seleccionado y controles de reproducción.

document.addEventListener('DOMContentLoaded', () => {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idAnime = parametrosUrl.get('id');
    const numEpisodio = parseInt(parametrosUrl.get('ep')) || 1;
    const numTemporada = parseInt(parametrosUrl.get('temp')) || 1;

    const anime = buscarSeriesId(idAnime);
    if (!anime) {
        window.location.href = 'catalogo';
        return;
    }

    let temporadaActual = anime.temporadas.find(t => t.numero === numTemporada) || anime.temporadas[0];
    let episodioActual = temporadaActual.episodios.find(e => e.id === numEpisodio);

    if (!episodioActual) {
        window.location.href = `serie?id=${anime.id}`;
        return;
    }

    document.title = `${anime.titulo} - E${numEpisodio}`;

    let vistos = JSON.parse(localStorage.getItem(`vistos_${anime.id}`)) || [];
    const yaVisto = vistos.includes(numEpisodio);

    const marcoVideo = document.getElementById('reproductor-video');
    if (marcoVideo) {
        marcoVideo.src = episodioActual.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"; // Cambiar video
    }

    const tituloLateral = document.getElementById('tit-ep-lateral');
    if (tituloLateral) tituloLateral.textContent = `Episodio ${numEpisodio}`;

    const botonAnterior = document.getElementById('boton-episodio-anterior');
    const botonSiguiente = document.getElementById('boton-episodio-siguiente');

    if (botonAnterior) {
        if (numEpisodio > 1) {
            botonAnterior.href = `episodio?id=${anime.id}&temp=${temporadaActual.numero}&ep=${numEpisodio - 1}`;
        } else {
            botonAnterior.style.display = 'none';
        }
    }

    if (botonSiguiente) {
        if (numEpisodio < temporadaActual.episodios.length) {
            botonSiguiente.href = `episodio?id=${anime.id}&temp=${temporadaActual.numero}&ep=${numEpisodio + 1}`;
        } else {
            botonSiguiente.style.display = 'none';
        }
    }

    const celda = document.getElementById('celdas-ep-lateral');
    if (celda) {
        temporadaActual.episodios.forEach(ep => {
            const estaActivo = ep.id === numEpisodio ? 'activo' : '';
            celda.innerHTML =  celda.innerHTML+ `
                <a href="episodio?id=${anime.id}&temp=${temporadaActual.numero}&ep=${ep.id}" class="boton-numero-episodio ${estaActivo}">
                    ${ep.id}
                </a>
            `;
        });
    }

    const infoEpisodio = document.getElementById('info-episodio');
    if (infoEpisodio) {
        let mostrarTitulo = "";

        if (anime.tipo === "Película") {
            mostrarTitulo = "Película Completa";
        } else {
            mostrarTitulo = `Episodio ${numEpisodio}`;
        }

        infoEpisodio.innerHTML = `
            <div class="info-cabecera-ep">
                <a href="serie?id=${anime.id}" class="enlace-anime">${anime.titulo}</a>
                <h1>${mostrarTitulo}</h1>
                
                <div class="datos-episodio">
                    <span>${anime.tipo || 'TV Anime'}</span> &bull; 
                    <span>${anime.año}</span> &bull; 
                    <span>${anime.estado}</span>
                </div>
                
                <div class="generos-episodio">
                    ${anime.generos.map(etiqueta => `<a href="catalogo?categoria=${etiqueta}" class="etiqueta-episodio">${etiqueta}</a>`).join('')}
                </div>
                
                <p class="sinopsis-episodio">${anime.sinopsis}</p>
                
                <div class="acciones-serie" style="margin-top: 1.5rem;">
                    <button class="boton-accion ${yaVisto ? 'esta-visto' : ''}" id="boton-marcar-episodio-visto">
                        <i class="ph ${yaVisto ? 'ph-check-circle' : 'ph-eye'}"></i> 
                        ${yaVisto ? 'Visto' : 'Marcar como visto'}
                    </button>

                    <button class="boton-accion" id="btn-share"><i class="ph ph-share-network"></i></button>
                    <button class="boton-accion"><i class="ph ph-flag"></i></button>
                </div>
            </div>

            <div class="seccion-comentarios">
                <div class="cabecera-seccion">
                    <h2>Comentarios del Episodio</h2>
                    <div class="contenedor-ordenacion">
                        <span>Ordenar por: <strong>Populares ⌄</strong></span>
                    </div>
                </div>
                
                <div class="escribir-comentario">
                    <div class="avatar-usuario">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsYYYmIOuieWvw2LUapfA7Catq3e-NyzpWMPjVoZ32pQ&s=10">
                    </div>
                    <div class="zona-entrada">
                        <textarea placeholder="Escribe algo..."></textarea>
                        <div class="barra-herramientas-entrada">
                            <button class="boton-principal">Publicar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const botonVisto = document.getElementById('boton-marcar-episodio-visto');
        if (botonVisto) {
            botonVisto.addEventListener('click', function () {
                if (vistos.includes(numEpisodio)) {
                    vistos = vistos.filter(id => id !== numEpisodio);
                    this.classList.remove('esta-visto');
                    this.innerHTML = `<i class="ph ph-eye"></i> Marcar como visto`;
                } else {
                    vistos.push(numEpisodio);
                    this.classList.add('esta-visto');
                    this.innerHTML = `<i class="ph ph-check-circle"></i> Visto`;
                }
                localStorage.setItem(`vistos_${anime.id}`, JSON.stringify(vistos));
            });
        }

        const botonCompartir = document.getElementById('btn-share');
        if (botonCompartir) {
            botonCompartir.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({ title: `${anime.titulo} - Episodio ${numEpisodio}`, url: window.location.href });
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("¡Enlace copiado al portapapeles!");
                }
            });
        }
    }
});