const raitingMenu = document.querySelector(".raitingMenu");
const raitingItems = raitingMenu.querySelectorAll("li");

const getRaitingData = async(type) => {
    let ress
    if (type === 'movie') {
        ress = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=en-MX&page=1`
        );
    } else {
        ress = await fetch(
            `
            https://api.themoviedb.org/3/tv/top_rated?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=es-MX&page=1`
        );
    }
    const data = await ress.json();
    return data;
};

const insertRaitingCart = (item, type) => {
    const baseImg = "https://image.tmdb.org/t/p/w200";
    return `
    <div class="raitingCard">
    <a class="raitingImg"><img src=${
      type !== "person"
        ? baseImg + item.poster_path
        : baseImg + item.profile_path
    }>
        </img>
        <span class="raitingValue ${item.vote_average > 8.5 ? "GREEN": item.vote_average > 5.0 ? "YELLOW" : "RED"}">${item.vote_average * 10}%</span>
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

const handleRaitingClick = (e, i) => {
    e.target.classList.add("SELECTED");
    raitingItems.forEach((item) => {
        if (item !== e.target) {
            item.classList.remove("SELECTED");
        }
    });
    switch (e.target.textContent) {
        case "Peliculas":
            getRaitingData("movie").then((res) => {
                const raitingContainer = document.querySelector(".raiting-container");
                while (raitingContainer.firstChild) {
                    raitingContainer.removeChild(raitingContainer.firstChild);
                }
                res.results.forEach((item) => {
                    if (item.poster_path) {
                        const card = insertRaitingCart(item, "movie");
                        raitingContainer.innerHTML += card;
                    }
                });
            });
            break;
        case "En television":
            getRaitingData("tv").then((res) => {
                const raitingContainer = document.querySelector(".raiting-container");
                while (raitingContainer.firstChild) {
                    raitingContainer.removeChild(raitingContainer.firstChild);
                }
                res.results.forEach((item) => {
                    if (item.poster_path) {
                        const card = insertRaitingCart(item, "tv");
                        raitingContainer.innerHTML += card;
                    }
                });
            });
            break;
    }
};

raitingItems.forEach((item) => {
    item.addEventListener("click", handleRaitingClick);
});

getRaitingData("movie").then((res) => {
    const raitingContainer = document.querySelector(".raiting-container");
    while (raitingContainer.firstChild) {
        raitingContainer.removeChild(raitingContainer.firstChild);
    }
    res.results.forEach((item) => {
        if (item.poster_path) {
            const card = insertRaitingCart(item, "movie");
            raitingContainer.innerHTML += card;
        }
    });
});