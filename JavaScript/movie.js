const movieContainer = document.querySelector(".container-List");
let list = [];
let currentPage = 1;

const getData = async(page) => {
    const ress = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=es-MX&page=${page}`
    );
    const data = await ress.json();
    return data;
};

const insertCart = (item, i) => {
    const baseImg = "https://image.tmdb.org/t/p/w200";
    return `
    <div class="defaultCard" id={card${i}}>
        <a class="defaultImg"><img src=${baseImg + item.poster_path}>
            </img>
            <span class="defaultValue ${
              item.vote_average > 8
                ? "GREEN"
                : item.vote_average > 5.0
                ? "YELLOW"
                : "RED"
            }">${item.vote_average * 10}%</span>
        </a>
        <div>
            <span id='cardName'>${item.title}</span>
            <span id='cardDate'>${item.release_date}</span>
        </div>
    </div>
    `;
};

function isElementPartiallyVisible(element) {
    var anchoViewport = window.innerWidth || document.documentElement.clientWidth;
    var alturaViewport =
        window.innerHeight || document.documentElement.clientHeight;
    //Posición de la caja del elemento
    var caja = element.getBoundingClientRect();
    var cajaDentroH =
        (caja.left >= 0 && caja.left <= anchoViewport) ||
        (caja.right >= 0 && caja.right <= anchoViewport);
    var cajaDentroV =
        (caja.top >= 0 && caja.top <= alturaViewport) ||
        (caja.bottom >= 0 && caja.bottom <= alturaViewport);
    return cajaDentroH && cajaDentroV;
}

function inViewportPartially(element, handler) {
    var anteriorVisibilidad = isElementPartiallyVisible(element);
    //Defino un manejador para determinar posibles cambios
    function detectarPosibleCambio() {
        var esVisible = isElementPartiallyVisible(element);
        if (esVisible != anteriorVisibilidad) {
            //ha cambiado el estado de visibilidad del elemento
            anteriorVisibilidad = esVisible;
            if (typeof handler == "function") handler(esVisible, element);
        }
    }
    //Asocio esta función interna a los diversos eventos que podrían producir un cambio en la visibilidad
    window.addEventListener("load", detectarPosibleCambio);
    window.addEventListener("resize", detectarPosibleCambio);
    window.addEventListener("scroll", detectarPosibleCambio);
}

const paitnData = (isRefresh) => {
    getData(currentPage).then((res) => {
        currentPage++;
        if (!isRefresh) {
            while (movieContainer.firstChild) {
                movieContainer.removeChild(movieContainer.firstChild);
            }
        }
        res.results.forEach((item, i) => {
            if (item.poster_path) {
                const card = insertCart(item, i);
                movieContainer.innerHTML += card;
            }
        });
        list = movieContainer.querySelectorAll(".defaultCard");
        const index = list.length;
        let last = list[index - 1];
        const refresh = (isVisible, element) => {
            if (isVisible) {
                paitnData(true);
            }
        };
        inViewportPartially(last, refresh);
    });
};
paitnData();