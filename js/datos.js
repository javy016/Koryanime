// ==========================================
// CATÁLOGO DEL CARRUSEL
// ==========================================
const carruselDB = [
    {
        id: 1,
        titulo: "One Piece",
        imagenCarrusel: "../Imagenes/carrusel/one-piece.jpg",
        etiquetas: ["Acción", "Aventura", "Fantasía"],
        puntuacion: "8.73",
        sinopsis: "Monkey D. Luffy, un joven que sueña con convertirse en el Rey de los Piratas..."
    },
    {
        id: 2,
        titulo: "Solo Leveling",
        imagenCarrusel: "../Imagenes/carrusel/solo-leveling.jpg",
        etiquetas: ["Acción", "Aventura", "Fantasía"],
        puntuacion: "9.1",
        sinopsis: "Sung Jin-Woo, el cazador más débil de toda la humanidad..."
    }
];

// ==========================================
// CATÁLOGO DE SERIES (Cada temporada es una serie)
// ==========================================
const animesDB = [
    {
        id: 1,
        titulo: "One Piece",
        tipo: "TV Anime", 
        imagen: "../Imagenes/series/one-piece.jpg", 
        trailer: "https://www.youtube.com/watch?v=MCb13lbVGE0",
        año: "1999",
        estado: "En emisión", 
        etiquetas: ["Acción", "Aventura", "Comedia"],
        puntuacion: "8.73",
        votos: "1.5M",
        sinopsis: "Monkey D. Luffy, un joven que sueña con convertirse en el Rey de los Piratas...",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { id: 1, titulo: "El hombre de la paja", duracion: "24 min", imagen: "../Imagenes/series/op-ep1.jpg", fechaSubida: "2024-05-10T14:30:00", videoUrl: "https://www.youtube.com/embed/videoseries?list=PLx0Z8p1Xj7q9y0y8O4Xo5wT2z6q7W8f9S" }
                ]
            }
        ],
        relacionados: []
    },
    {
        id: 2,
        titulo: "Solo Leveling",
        tipo: "TV Anime", 
        imagen: "../Imagenes/series/solo-leveling.jpg",
        trailer: "https://www.youtube.com/watch?v=I6cN2gA7ZqE",
        año: "2024",
        estado: "Próximamente", 
        etiquetas: ["Acción", "Fantasía"],
        puntuacion: "9.1",
        votos: "500K",
        sinopsis: "Sung Jin-Woo, el cazador más débil...",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { id: 1, titulo: "Episodio 1", duracion: "24 min", imagen: "../Imagenes/series/sl-ep1.jpg", fechaSubida: "2024-05-12T18:00:00", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
                ]
            }
        ],
        relacionados: []
    },
    {
        id: 3,
        titulo: "Kimetsu no Yaiba",
        tipo: "TV Anime", 
        imagen: "../Imagenes/series/demon-slayer.jpg",
        trailer: "https://www.youtube.com/watch?v=VQGCKyvzIM4",
        año: "2019",
        estado: "Finalizado",
        etiquetas: ["Acción", "Sobrenatural"],
        puntuacion: "8.39",
        votos: "239.613",
        sinopsis: "Desde la muerte de su padre...",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { id: 12, titulo: "El jabalí, el zorro y el cazador de demonios", duracion: "24 min", imagen: "../Imagenes/series/ds-ep12.jpg", fechaSubida: "2024-05-15T20:00:00", videoUrl: "https://www.youtube.com/embed/1sE8JgO2f1w" }
                ]
            }
        ],
        relacionados: []
    },
    // ==========================================
    // JUJUTSU KAISEN - TEMPORADA 1 (ID 4)
    // ==========================================
    {
        id: 4,
        titulo: "Jujutsu Kaisen",
        subtitulo: "Temporada 1",
        tipo: "TV Anime", 
        imagen: "../Imagenes/series/jujutsu-kaisen-t1.jpg", // Portada propia de la T1
        trailer: "https://www.youtube.com/watch?v=pkKu9hLT-t8",
        año: "2020",
        estado: "Finalizado",
        etiquetas: ["Acción", "Sobrenatural"],
        puntuacion: "8.6",
        votos: "600K",
        sinopsis: "Sumergido sin prisa en actividades paranormales sin fundamento con el Club de Ocultismo, el estudiante de secundaria Yuuji Itadori pasa sus días ya sea en el salón del club o en el hospital, donde visita a su abuelo postrado en la cama. Sin embargo, este estilo de vida relajado pronto da un giro extraño cuando se encuentra sin saberlo con un objeto maldito. Al desencadenar una cadena de acontecimientos sobrenaturales, Yuuji se ve repentinamente arrastrado al mundo de las Maldiciones—seres horribles formados por la malicia y la negatividad humanas—tras tragar dicho objeto, que resulta ser un dedo del demonio Sukuna Ryoumen, el Rey de las Maldiciones. Yuuji experimenta de primera mano la amenaza que estas Maldiciones representan para la sociedad mientras descubre sus propios poderes recién adquiridos. Introducido en la Escuela Secundaria de Jujutsu de la Prefectura de Tokio, comienza a caminar por un camino del que no puede regresar—el camino de un hechicero de Jujutsu.",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { id: 1, titulo: "Ryomen Sukuna", duracion: "24 min", imagen: "../Imagenes/series/jk-t1-ep1.jpg", fechaSubida: "2024-05-08T10:00:00", videoUrl: "https://www.youtube.com/embed/I6cN2gA7ZqE" },
                    { id: 2, titulo: "Para mí mismo", duracion: "24 min", imagen: "../Imagenes/series/jk-t1-ep2.jpg", fechaSubida: "2024-05-15T10:00:00", videoUrl: "https://www.youtube.com/embed/VIDEO_JUJUTSU_EP2" }
                ]
            }
        ],
        relacionados: [
            { id: 6, titulo: "Jujutsu Kaisen 0", imagen: "../Imagenes/series/jujutsu-0.jpg", tipo: "Película", año: "2021" },
            { id: 5, titulo: "Jujutsu Kaisen 2nd Season", imagen: "../Imagenes/series/jujutsu-t2.jpg", tipo: "Secuela", año: "2023" }
        ]
    },
    // ==========================================
    // JUJUTSU KAISEN - TEMPORADA 2 (ID 5)
    // ==========================================
    {
        id: 5,
        titulo: "Jujutsu Kaisen 2nd Season",
        subtitulo: "Temporada 2", // El subtítulo nos ayuda a diferenciarlo
        tipo: "TV Anime", 
        imagen: "../Imagenes/series/jujutsu-kaisen-t2.jpg",
        trailer: "https://www.youtube.com/watch?v=VIDEO_TRAILER_T2",
        año: "2023",
        estado: "Finalizado",
        etiquetas: ["Acción", "Sobrenatural"],
        puntuacion: "9.0",
        votos: "400K",
        sinopsis: "El año es 2006, y los pasillos de la Escuela Secundaria de Jujutsu de Tokio resuenan con las interminables disputas y debates intensos entre dos mejores amigos inseparables. Exudando una confianza inquebrantable, Satoru Gojou y Suguru Getou creen que no hay desafío demasiado grande para jóvenes y poderosos hechiceros de Grado Especial como ellos. Su misión es llevar de manera segura a una chica sensata llamada Riko Amanai hacia la entidad cuya existencia es la esencia misma del mundo del jujutsu. Sin embargo, la misión los sumerge en un agotador torbellino de conflicto moral que amenaza con destruir la ya frágil amistad entre los hechiceros y los humanos ordinarios. Doce años después, los estudiantes y hechiceros son la primera línea de defensa contra el creciente número de maldiciones de alto nivel nacidas de las emociones negativas de los humanos. A medida que las entidades crecen en poder, también aumentan su autoconciencia y ambición. Las maldiciones se unen con el objetivo común de erradicar a los humanos y crear un mundo solo de usuarios de energía maldita, lideradas por un peligroso espíritu maldito antiguo. Para deshacerse de su mayor obstáculo—el hechicero más fuerte, Gojou—organizan un ataque en la estación de Shibuya en Halloween. Dividiéndose en equipos, los hechiceros entran en la lucha dispuestos a arriesgar todo para proteger a los inocentes y a su propia especie.",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { id: 1, titulo: "Hidden Inventory", duracion: "24 min", imagen: "../Imagenes/series/jk-t2-ep1.jpg", fechaSubida: "2024-06-01T10:00:00", videoUrl: "https://www.youtube.com/embed/VIDEO_JUJUTSU_S2_EP1" },
                    { id: 2, titulo: "Premature Death", duracion: "24 min", imagen: "../Imagenes/series/jk-t2-ep2.jpg", fechaSubida: "2024-06-08T10:00:00", videoUrl: "https://www.youtube.com/embed/VIDEO_JUJUTSU_S2_EP2" }
                ]
            }
        ],
        relacionados: [
            { id: 4, titulo: "Jujutsu Kaisen", imagen: "../Imagenes/series/jujutsu-kaisen-t1.jpg", tipo: "Precuela", año: "2020" }
        ]
    },
    // ==========================================
    // JUJUTSU KAISEN 0 - PELÍCULA (ID 6)
    // ==========================================
    {
        id: 6,
        titulo: "Jujutsu Kaisen 0 Movie",
        tipo: "Película", 
        imagen: "../Imagenes/series/jujutsu-kaisen-p1.jpg",
        trailer: "https://www.youtube.com/watch?v=VIDEO_TRAILER",
        año: "2021",
        estado: "Finalizado",
        etiquetas: ["Acción", "Sobrenatural"],
        puntuacion: "8.2",
        votos: "100K",
        sinopsis: "Los violentos infortunios ocurren frecuentemente alrededor de Yuuta Okkotsu, un tímido joven de 16 años que es víctima del bullying en la escuela secundaria. Yuuta carga con una monstruosa maldición, un poder que se venga brutalmente de sus acosadores. Rika Orimoto, la maldición de Yuuta, es una sombra de su trágica infancia y una amenaza potencialmente letal para cualquiera que se atreva a hacerle daño. La situación única de Yuuta llama la atención de Satoru Gojou, un poderoso hechicero que enseña en la Escuela Secundaria Jujutsu de la Prefectura de Tokio. Gojou ve un inmenso potencial en Yuuta y espera ayudar al chico a canalizar su mortal carga en una fuerza para el bien. Sin embargo, Yuuta lucha por encontrar su lugar entre sus talentosos compañeros de clase: el mudo selectivo Toge Inumaki, la experta en armas Maki Zenin y Panda. Yuuta utiliza torpemente a Rika en las misiones con otros estudiantes de primer año, pero las brutales consecuencias de las enormes demostraciones de poder de Rika atraen el interés del calculador usuario de maldiciones Suguru Getou. Mientras Getou se esfuerza por reclamar la fuerza de Rika y usarla para eliminar a todos los que no son usuarios de jujutsu del mundo, Yuuta lucha junto a sus amigos para detener el plan genocida.",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { id: 1, titulo: "Película Completa", duracion: "105 min", imagen: "../Imagenes/series/jujutsu-0.jpg", fechaSubida: "2024-05-01T10:00:00", videoUrl: "https://www.youtube.com/embed/VIDEO_JUJUTSU_0" }
                ]
            }
        ],
        relacionados: [
            { id: 4, titulo: "Jujutsu Kaisen", imagen: "../Imagenes/series/jujutsu-kaisen-t1.jpg", tipo: "Secuela", año: "2020" }
        ]
    }
];

function getAnimeById(id) {
    return animesDB.find(a => a.id === parseInt(id));
}