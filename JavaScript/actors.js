const actorContainer = document.querySelector(".container-List");
let list = [];
let currentPage = 1;

const getData = async(page) => {
    const ress = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=es-MX&page=${page}`
    );
    const data = await ress.json();
    return data;
};

const insertCart = (item, i) => {
    const baseImg = "https://image.tmdb.org/t/p/w200";
    return `
    <div class="defaultCard" id={card${i}}>
        <a class="defaultImg"><img src=${baseImg + item.profile_path}>
            </img>
        </a>
        <div>
            <span id='cardName'>${item.name}</span>
            <span id='cardDate'>${item.gender === 1 ? "Mujer" : "Hombre"}</span>
            <span id='cardName'>Conocido por:</span>
            <span id='cardDate'>${item.known_for.map(
              (item, i) => item.name || item.title
            )}</span>
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
            while (actorContainer.firstChild) {
                actorContainer.removeChild(actorContainer.firstChild);
            }
        }
        res.results.forEach((item, i) => {
            if (item.profile_path) {
                const card = insertCart(item, i);
                actorContainer.innerHTML += card;
            }
        });
        list = actorContainer.querySelectorAll(".defaultCard");
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