const popularMenu = document.querySelector(".popularMenu");
const popularItems = popularMenu.querySelectorAll("li");

const getData = async(type) => {
    const ress = await fetch(
        `https://api.themoviedb.org/3/trending/${type}/day?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=es-MX`
    );
    const data = await ress.json();
    return data;
};

const insertCart = (item, type) => {
    const baseImg = "https://image.tmdb.org/t/p/w200";
    return `
    <div class="popularCard">
    <a class="popularImg"><img src=${
      type !== "person"
        ? baseImg + item.poster_path
        : baseImg + item.profile_path
    }>
        </img>
    </a>
    <div>
        <span id='cardName'>${type === "movie" ? item.title : item.name}</span>
        <span id='cardDate'>${
          type === "movie"
            ? item.release_date
            : type === "tv"
            ? item.first_air_date
            : ""
        }</span>
    </div>
</div>
    `;
};

const handlePopularClick = (e, i) => {
    e.target.classList.add("SELECTED");
    popularItems.forEach((item) => {
        if (item !== e.target) {
            item.classList.remove("SELECTED");
        }
    });
    switch (e.target.textContent) {
        case "Peliculas":
            getData("movie").then((res) => {
                const popularContainer = document.querySelector(".popular-container");
                while (popularContainer.firstChild) {
                    popularContainer.removeChild(popularContainer.firstChild);
                }
                res.results.forEach((item) => {
                    if (item.poster_path) {
                        const card = insertCart(item, "movie");
                        popularContainer.innerHTML += card;
                    }
                });
            });
            break;
        case "En television":
            getData("tv").then((res) => {
                const popularContainer = document.querySelector(".popular-container");
                while (popularContainer.firstChild) {
                    popularContainer.removeChild(popularContainer.firstChild);
                }
                res.results.forEach((item) => {
                    if (item.poster_path) {
                        const card = insertCart(item, "tv");
                        popularContainer.innerHTML += card;
                    }
                });
            });
            break;
        case "Actores":
            getData("person").then((res) => {
                const popularContainer = document.querySelector(".popular-container");
                while (popularContainer.firstChild) {
                    popularContainer.removeChild(popularContainer.firstChild);
                }
                res.results.forEach((item) => {
                    if (item.profile_path) {
                        const card = insertCart(item, "person");
                        popularContainer.innerHTML += card;
                    }
                });
            });
            break;
    }
};

popularItems.forEach((item) => {
    item.addEventListener("click", handlePopularClick);
});

getData("movie").then((res) => {
    const popularContainer = document.querySelector(".popular-container");
    while (popularContainer.firstChild) {
        popularContainer.removeChild(popularContainer.firstChild);
    }
    res.results.forEach((item) => {
        if (item.poster_path) {
            const card = insertCart(item, "movie");
            popularContainer.innerHTML += card;
        }
    });
});