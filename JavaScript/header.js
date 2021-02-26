const header = `<div class="header-left">
        <a href="../index.html">
        <img src="../assets/img/logo.svg" alt="logo" width="154" height="20">
        </a>
        <ul class="header-menu">
            <li class="menu-item"><a href="movies.html">Películas</a></li>
            <li class="menu-item"><a href="tvShows.html">Programas de televisión</a></li>
            <li class="menu-item"><a href="actors.html">Actores</a></li>
        </ul>
    </div>
    <div class="header-rigth">
        <img id='profile' src="../assets/img/perfil.jpeg" alt="profile">
        <img id='search' src="../assets/icon/search.svg" alt="search">
    </div>`

const headerItem = document.querySelector('header')
headerItem.innerHTML += header;
const menu = document.querySelector('.header-menu')
const links = document.querySelectorAll("a");
const currentUrl = window.location.href

switch (currentUrl) {
    case 'file:///D:/Documents/cursos/aplicacion%20de%20peliculas/Nativo/HTML/movies.html':
        links[1].classList.add('ACTIVE');
        break;
    case 'file:///D:/Documents/cursos/aplicacion%20de%20peliculas/Nativo/HTML/tvShows.html':
        links[2].classList.add('ACTIVE');
        break;
    case 'file:///D:/Documents/cursos/aplicacion%20de%20peliculas/Nativo/HTML/actors.html':
        links[3].classList.add('ACTIVE');
        break;
    default:
        null;
}