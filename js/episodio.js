document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');
    const epNum = parseInt(urlParams.get('ep')) || 1;
    const tempNum = parseInt(urlParams.get('temp')) || 1; 
    
    const anime = getAnimeById(animeId);
    if (!anime) {
        window.location.href = 'catalogo';
        return;
    }

    let currentTemp = anime.temporadas.find(t => t.numero === tempNum) || anime.temporadas[0];
    let currentEp = currentTemp.episodios.find(e => e.id === epNum);

    if (!currentEp) {
        window.location.href = `serie?id=${anime.id}`;
        return;
    }

    document.title = `${anime.titulo} - E${epNum}`;

    let vistos = JSON.parse(localStorage.getItem(`vistos_${anime.id}`)) || [];
    const yaVisto = vistos.includes(epNum);

    const videoIframe = document.getElementById('video-player');
    if (videoIframe) {
        videoIframe.src = currentEp.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"; 
    }

    const sidebarTitle = document.getElementById('sidebar-ep-title');
    if (sidebarTitle) sidebarTitle.textContent = `Episodio ${epNum}`;
    
    const btnPrev = document.getElementById('btn-prev-ep');
    const btnNext = document.getElementById('btn-next-ep');
    
    if (btnPrev) {
        if (epNum > 1) {
            btnPrev.href = `episodio?id=${anime.id}&temp=${currentTemp.numero}&ep=${epNum - 1}`;
        } else {
            btnPrev.style.display = 'none';
        }
    }

    if (btnNext) {
        if (epNum < currentTemp.episodios.length) {
            btnNext.href = `episodio?id=${anime.id}&temp=${currentTemp.numero}&ep=${epNum + 1}`;
        } else {
            btnNext.style.display = 'none';
        }
    }

    const grid = document.getElementById('sidebar-episodes-grid');
    if (grid) {
        currentTemp.episodios.forEach(ep => {
            const isActive = ep.id === epNum ? 'active' : '';
            grid.innerHTML += `
                <a href="episodio?id=${anime.id}&temp=${currentTemp.numero}&ep=${ep.id}" class="ep-num-btn ${isActive}">
                    ${ep.id}
                </a>
            `;
        });
    }

    const infoBottom = document.getElementById('episode-info-bottom');
    if (infoBottom) {
        let tituloMostrar = "";
        
        if (anime.tipo === "Película") {
            tituloMostrar = "Película Completa";
        } else {
            tituloMostrar = `Episodio ${epNum}`;
        }

        infoBottom.innerHTML = `
            <div class="ep-header-info">
                <a href="serie?id=${anime.id}" class="anime-link">${anime.titulo}</a>
                <!-- AQUÍ APLICAMOS EL CAMBIO -->
                <h1>${tituloMostrar}</h1>
                
                <div class="ep-meta">
                    <span>${anime.tipo || 'TV Anime'}</span> &bull; 
                    <span>${anime.año}</span> &bull; 
                    <span>${anime.estado}</span>
                </div>
                
                <div class="ep-tags">
                    ${anime.etiquetas.map(tag => `<a href="catalogo?categoria=${tag}" class="ep-tag">${tag}</a>`).join('')}
                </div>
                
                <p class="ep-synopsis">${anime.sinopsis}</p>
                
                <div class="serie-action-bar" style="margin-top: 1.5rem;">
                    <button class="btn-action ${yaVisto ? 'is-watched' : ''}" id="btn-mark-watched-ep">
                        <i class="ph ${yaVisto ? 'ph-check-circle' : 'ph-eye'}"></i> 
                        ${yaVisto ? 'Visto' : 'Marcar como visto'}
                    </button>

                    <button class="btn-action" id="btn-share"><i class="ph ph-share-network"></i></button>
                    <button class="btn-action"><i class="ph ph-flag"></i></button>
                </div>
            </div>

            <div class="comments-section">
                <div class="section-header">
                    <h2>Comentarios del Episodio</h2>
                    <div class="sort-container">
                        <span>Ordenar por: <strong>Populares ⌄</strong></span>
                    </div>
                </div>
                
                <div class="comment-input-box">
                    <div class="user-avatar-circle">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsYYYmIOuieWvw2LUapfA7Catq3e-NyzpWMPjVoZ32pQ&s=10">
                    </div>
                    <div class="input-area">
                        <textarea placeholder="Escribe algo..."></textarea>
                        <div class="input-toolbar">
                            <button class="btn-primary">Publicar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const btnWatched = document.getElementById('btn-mark-watched-ep');
        if (btnWatched) {
            btnWatched.addEventListener('click', function() {
                if (vistos.includes(epNum)) {
                    vistos = vistos.filter(id => id !== epNum);
                    this.classList.remove('is-watched');
                    this.innerHTML = `<i class="ph ph-eye"></i> Marcar como visto`;
                } else {
                    vistos.push(epNum);
                    this.classList.add('is-watched');
                    this.innerHTML = `<i class="ph ph-check-circle"></i> Visto`;
                }
                localStorage.setItem(`vistos_${anime.id}`, JSON.stringify(vistos));
            });
        }

        const btnShare = document.getElementById('btn-share');
        if (btnShare) {
            btnShare.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({ title: `${anime.titulo} - Episodio ${epNum}`, url: window.location.href });
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("¡Enlace copiado al portapapeles!");
                }
            });
        }
    }
});