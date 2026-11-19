# Koryanime

Koryanime es una plataforma web de contenido de anime desarrollada como proyecto de Proyecto de Fin de Grado. 

El objetivo principal es crear un catálogo funcional donde los usuarios puedan explorar el catálogo de series, ver detalles, reproducir episodios y gestionar sus propias listas.

## Stack Tecnológico

*   **Frontend:** HTML5, CSS3, JavaScript.
*   **Entorno de ejecución:** Node.js (Entorno de pruebas).
*   **Librerías externas:** 
    *   Phosphor Icons (iconos de la página).
    *   Google Fonts (tipografía).
*   **Despliegue:** Vercel en el siguiente enlace: [Enlace Página Web](https://koryanime.vercel.app/) .

## Estructura del Proyecto

El proyecto está organizado de la siguiente forma:

```text
/
├── css/
│   └── estilos.css          # Hoja de estilos 
├── js/
│   ├── auth.js              # Gestión de sesiones y login
│   ├── login.js             # Lógica del formulario de inicio de sesión y registro
│   ├── header.js            # Lógica del menú de usuario y modal
│   ├── datos.js             # Base de datos estática de series
│   ├── app.js               # Lógica del index (carrusel/tendencias)
│   ├── catalogo.js          # Filtros y renderizado del catálogo
│   ├── serie.js             # Renderizado de la página de la serie
│   ├── episodio.js          # Renderizado de la página de reproductor
│   └── tema.js              # Cambio de tema (modo claro/oscuro)
├── imagenes/
│   ├── portadas/            # Portadas de las series
│   ├── carrusel/            # Imágenes horizontales
│   ├── series/              # Miniaturas de los episodios
│   └── logos/               # Logos de la página web
├── webs/
│   ├── catalogo.html        # Catálogo
│   ├── serie.html           # Serie concreta
│   └── episodio.html        # Episodio de una serie con reproductor
├── index.html               # Página inicio
└── README.md
```  

# Funcionalidades  
## Tema claro/oscuro  
La página web permite alternar dichos modos, que se guarda la preferencia en LocalStorage y también incluye un logo personalizado para cada parte.  

## Roles usuario  
Actualmente tengo 3 tipos de usuario los cuales no tienen ahora ninguna funcionalidad pero si los agregue para cambios en el futuro.  

Los roles son:  
1. Estándar: Acceso catálogo, reproductor y listas de perfil propio.   

2. Editor: Podrá añadir series y episodios visualmente (Alomejor se elimina dicho usuario si me lo consigue realizar una Api).  

3. Administrador: Tendrá control sobre los usuarios (banear, borrar, cambiar contraseñas) y tambien posibilidad de editar contenido.  

## Reproductor de vídeo  
El reproductor carga los enlaces de videos desde datos.js, los usuarios pueden marcar los episodios como visto.  

# Próximas Implementaciones  

## Implementaciones de Apis  
1. Jikan API:
- Propóstio: Obtener los datos como puede ser (título, sipnosis, valoracion, portada y número de episodios).  

- Uso: Sustituir a información estática de datos.js.

2. apianime:
- Propósito: Extraer enlaces de video reales desde los servidores de streaming.  

- Uso: Se ejecutara en un backend en Railway. El frontend consultará a dicha API para obtener enlaces del epiosodio y cargarlo desde el reproductor.

## Reemplazo de Despliegue  
En vez de usar vercel, usare Railway para facilitar la implementación de las APIS.  

## Finalización de procesos a medias   
Ya que deje a medias la configuración de usuario, horario de animes y listas que no me dio tiempo a realizar, lo seguire procesando hasta darlo por finalizado y funcional dichas acciones.  
 
## Creación de footer  
Me centre demasiado en crear los ajustes funcionales para tener un prototipo y no cree en footer, se hará en la proxima entrega con las redes sociales, botón de discord funcional, implementación de cookies, copyright y politicas de privacidad y terminos de condiciones.  

## Posibles intentos futuros  
1. Creación de comentarios en línea.  
2. Posibilidad de valoración propia.  
3. Posibilidad de contactar con algun tipo de soporte para obtener ayuda.  
4. Agregar chatbot.  

## Autor  
Desarrollado por Javier Collado Vinagre