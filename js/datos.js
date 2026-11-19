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
// CATÁLOGO DE SERIES 
// ==========================================
const animesDB = [
    {
        id: 1,
        titulo: "One Piece",
        tipo: "TV Anime", 
        imagen: "../Imagenes/portadas/one-piece.jpg", 
        trailer: "https://www.youtube.com/watch?v=mMGpttzyGbw",
        año: "1999",
        estado: "En emisión", 
        etiquetas: ["Acción", "Aventura", "Comedia"],
        puntuacion: "8.73",
        votos: "1.5M",
        sinopsis: "Apenas sobreviviendo en un barril tras pasar por un terrible remolino en el mar, el despreocupado Monkey D. Luffy termina a bordo de un barco bajo ataque de temibles piratas. A pesar de parecer un adolescente ingenuo, no se le debe subestimar. Inigualable en combate, Luffy es un pirata que persigue resueltamente el codiciado tesoro de One Piece y el título de Rey de los Piratas que lo acompaña. El difunto Rey de los Piratas, Gol D. Roger, agitou al mundo antes de su muerte al revelar la ubicación de su tesoro y desafiar a todos a conseguirlo. Desde entonces, innumerables poderosos piratas han navegado por mares peligrosos en busca del preciado One Piece, solo para nunca regresar. Aunque Luffy carece de una tripulación y de un barco adecuado, posee una habilidad sobrehumana y un espíritu indomable que lo convierten no solo en un formidable adversario, sino también en una inspiración para muchos. Mientras enfrenta numerosos desafíos con una gran sonrisa en su rostro, Luffy reúne compañeros únicos para unirse a él en su ambicioso empeño, abrazando juntos los peligros y maravillas en su aventura única en la vida.",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { 
                        id: 1, 
                        titulo: "El hombre de la paja", 
                        duracion: "24 min", 
                        imagen: "../Imagenes/series/onepiece/episodios/episodio1.jpg", 
                        fechaSubida: "2024-05-10T14:30:00", 
                        videoUrl: "https://www.youtube.com/embed/Q2JtbmBVaek?si=ovJHXFsDEKpKSwoE" 
                    }
                ]
            }
        ],
        relacionados: []
    },
    {
        id: 2,
        titulo: "Solo Leveling",
        tipo: "TV Anime", 
        imagen: "../Imagenes/portadas/solo-leveling-t1.jpg",
        trailer: "https://www.youtube.com/watch?v=Kjta12rmtkA",
        año: "2024",
        estado: "Finalizado", 
        etiquetas: ["Acción", "Fantasía"],
        puntuacion: "9.1",
        votos: "500K",
        sinopsis: "La humanidad se encontró al borde del abismo hace una década cuando las primeras puertas—portales vinculados con otras dimensiones que albergan monstruos inmunes a las armas convencionales—emergieron alrededor del mundo. Junto a la aparición de las puertas, varios humanos se transformaron en cazadores y fueron dotados de habilidades sobrehumanas. Responsables de ingresar a las puertas y limpiar los calabozos dentro de ellas, muchos cazadores optaron por formar guildas para asegurar su sustento. Sung Jin-Woo es un cazador de rango E apodado como el cazador más débil de toda la humanidad. Mientras explora un calabozo supuestamente seguro, él y su grupo se encuentran con un túnel inusual que conduce a un área más profunda. Atraídos por la perspectiva de tesoros, el grupo avanza, solo para enfrentarse a horrores más allá de su imaginación. Milagrosamente, Jin-Woo sobrevive al incidente y pronto descubre que ahora tiene acceso a una interfaz visible solo para él. Este misterioso sistema le promete el poder con el que siempre ha soñado—pero todo tiene un precio.",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { 
                        id: 1, 
                        titulo: "Episodio 1", 
                        duracion: "24 min", 
                        imagen: "../Imagenes/series/sololeveling/temporada1/episodios/episodio1.jpg", 
                        fechaSubida: "2024-05-12T18:00:00", 
                        videoUrl: "https://www.youtube.com/embed/hc95ajRd_m0?si=tPMQZ9ZiXsVg0mC-" 
                    }
                ]
            }
        ],
        relacionados: []
    },
    {
        id: 3,
        titulo: "Kimetsu no Yaiba",
        tipo: "TV Anime", 
        imagen: "../Imagenes/portadas/demon-slayer-t1.jpg",
        trailer: "https://www.youtube.com/watch?v=VQGCKyvzIM4",
        año: "2019",
        estado: "Finalizado",
        etiquetas: ["Acción", "Sobrenatural"],
        puntuacion: "8.39",
        votos: "239.613",
        sinopsis: "Desde la muerte de su padre, la carga de mantener a la familia ha recaído sobre los hombros de Tanjirou Kamado. Aunque viven en la pobreza en una remota montaña, la familia Kamado puede disfrutar de una vida relativamente pacífica y feliz. Un día, Tanjirou decide bajar al pueblo local para ganar un poco de dinero vendiendo carbón. En su camino de regreso, cae la noche, obligando a Tanjirou a buscar refugio en la casa de un extraño, quien le advierte sobre la existencia de demonios carnívoros que acechan en el bosque por la noche. Cuando finalmente llega a casa al día siguiente, se encuentra con una vista horripilante: toda su familia ha sido masacrada. Lo peor de todo es que la única sobreviviente es su hermana Nezuko, quien ha sido convertida en un demonio sediento de sangre. Consumido por la rabia y el odio, Tanjirou jura vengar a su familia y permanecer al lado de su único hermano restante. Junto con el misterioso grupo que se hace llamar el Cuerpo de Cazadores de Demonios, Tanjirou hará lo que sea necesario para exterminar a los demonios y proteger los restos de la humanidad de su querida hermana.",
        temporadas: [
            {
                numero: 1,
                episodios: [
                    { 
                        id: 12, 
                        titulo: "El jabalí, el zorro y el cazador de demonios", 
                        duracion: "24 min", 
                        imagen: "../Imagenes/series/kimetsu/temporada1/episodios/episodio12.jpg", 
                        fechaSubida: "2024-05-15T20:00:00", 
                        videoUrl: "https://www.youtube.com/embed/QnpNvVrz9gk?si=PN7eTgmBdpZ2zjsl" 
                    }
                ]
            }
        ],
        relacionados: []
    },
    // ==========================================
    // JUJUTSU KAISEN RELACIONAR
    // ==========================================
    {
        id: 4,
        titulo: "Jujutsu Kaisen",
        subtitulo: "Temporada 1",
        tipo: "TV Anime", 
        imagen: "../Imagenes/portadas/jujutsu-kaisen-t1.jpg", 
        trailer: "https://www.youtube.com/watch?v=aPBUUJbrAWo",
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
                    { 
                        id: 1, 
                        titulo: "Ryomen Sukuna", 
                        duracion: "24 min", 
                        imagen: "../Imagenes/series/jjk/temporada1/episodios/episodio1.jpg", 
                        fechaSubida: "2024-05-08T10:00:00", 
                        videoUrl: "https://www.youtube.com/embed/6Tn55tBUdOE?si=yPOkr0ECNCniBhLW" 
                    },
                    { 
                        id: 2, 
                        titulo: "Para mí mismo", 
                        duracion: "24 min", 
                        imagen: "../Imagenes/series/jjk/temporada1/episodios/episodio2.jpg", 
                        fechaSubida: "2024-05-15T10:00:00", 
                        videoUrl: "https://www.youtube.com/embed/J74nFbZiz1M?si=ysUnbX5r16_32zDC" 
                    }
                ]
            }
        ],
        relacionados: [
            { id: 6, titulo: "Jujutsu Kaisen 0", imagen: "../Imagenes/portadas/jujutsu-kaisen-p1.jpg", tipo: "Película", año: "2021" },
            { id: 5, titulo: "Jujutsu Kaisen 2nd Season", imagen: "../Imagenes/portadas/jujutsu-kaisen-t2.jpg", tipo: "Secuela", año: "2023" }
        ]
    },
    {
        id: 5,
        titulo: "Jujutsu Kaisen 2nd Season",
        subtitulo: "Temporada 2", 
        tipo: "TV Anime", 
        imagen: "../Imagenes/portadas/jujutsu-kaisen-t2.jpg",
        trailer: "https://www.youtube.com/watch?v=a70_eOnIS3o",
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
                    { 
                        id: 1, 
                        titulo: "Hidden Inventory", 
                        duracion: "24 min", 
                        imagen: "../Imagenes/series/jjk/temporada2/episodios/episodio1.jpg", 
                        fechaSubida: "2024-06-01T10:00:00", 
                        videoUrl: "https://www.youtube.com/embed/4ZSFqRBwMYI?si=80csujoEBofWMoMl" 
                    },
                    { 
                        id: 2, 
                        titulo: "Premature Death", 
                        duracion: "24 min", 
                        imagen: "../Imagenes/series/jjk/temporada2/episodios/episodio2.jpg", 
                        fechaSubida: "2024-06-08T10:00:00", 
                        videoUrl: "https://www.youtube.com/embed/NGZdmc0D-8Q?si=JoBbFDxpnCowEG-l" 
                    }
                ]
            }
        ],
        relacionados: [
            { id: 4, titulo: "Jujutsu Kaisen", imagen: "../Imagenes/portadas/jjk-t1.jpg", tipo: "Precuela", año: "2020" }
        ]
    },
    {
        id: 6,
        titulo: "Jujutsu Kaisen 0 Movie",
        tipo: "Película", 
        imagen: "../Imagenes/portadas/jujutsu-kaisen-p1.jpg",
        trailer: "https://www.youtube.com/watch?v=f7XrtoImtHo",
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
                    { 
                        id: 1, 
                        titulo: "Película Completa", 
                        duracion: "105 min", 
                        imagen: "../Imagenes/series/jjk/pelicula/episodios/episodio1.jpg", 
                        fechaSubida: "2024-05-01T10:00:00", 
                        videoUrl: "https://www.youtube.com/embed/W28zhb6WmNQ?si=HPW_VI9Fk2QaRIyc" 
                    }
                ]
            }
        ],
        relacionados: [
            { id: 4, titulo: "Jujutsu Kaisen", imagen: "../Imagenes/portadas/jujutsu-kaisen-t1.jpg", tipo: "Secuela", año: "2020" },
            { id: 4, titulo: "Jujutsu Kaisen 2nd Season", imagen: "../Imagenes/portadas/jujutsu-kaisen-t2.jpg", tipo: "Secuela", año: "2023" }
        ]
    }
];

function getAnimeById(id) {
    return animesDB.find(a => a.id === parseInt(id));
}