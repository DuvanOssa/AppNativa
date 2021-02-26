const searchContainer = document.querySelector(".container-List");
const searchTitle = document.querySelector(".searchTitle");
let list = [];
let currentPage = 1;

const getSearchDataPaginated = async(page) => {
    const search = localStorage.getItem("currentSearch")
    const ress = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=es-MX&page=${page}&include_adult=false&query=${search}`
    );
    const data = await ress.json();
    return data;
};

const insertCart = (item, i) => {
    const baseImg = "https://image.tmdb.org/t/p/w200";
    return `
    <div class="defaultCard" id={card${i}}>
        <a class="defaultImg"><img src=${baseImg + (item.poster_path || item.profile_path)}>
            </img>
            ${item.vote_average && 
                (`<span class="defaultValue ${
              item.vote_average > 8
                ? "GREEN"
                : item.vote_average > 5.0
                ? "YELLOW"
                : "RED"
            }">${item.vote_average * 10}%</span>`
            )}
        </a>
        <div>
            <span id='cardName'>${item.title || item.name }</span>
            <span id='cardDate'>${item.release_date || item.first_air_date}</span>
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
    const search = localStorage.getItem("currentSearch")
    searchTitle.textContent = `Resultados para ${search}`
    getSearchDataPaginated(currentPage).then((res) => {
        currentPage++;
        if (!isRefresh) {
            while (searchContainer.firstChild) {
                searchContainer.removeChild(searchContainer.firstChild);
            }
        }
        res.results.forEach((item, i) => {
            if (item.poster_path) {
                const card = insertCart(item, i);
                searchContainer.innerHTML += card;
            }
        });
        list = searchContainer.querySelectorAll(".defaultCard");
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