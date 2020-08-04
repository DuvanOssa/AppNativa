const premieresMenu = document.querySelector(".premieresMenu");
const premieresItems = premieresMenu.querySelectorAll("li");

const insertPremieresCart = (item, type) => {
    const baseImg = "https://image.tmdb.org/t/p/w300";
    return `
    <div class="premieres-card">
        <img class="premieres-card-img" src=${
          baseImg + item.backdrop_path
        } alt="poster"></img>
        <h1 class="premieres-card-title">${
          type === "movie" ? item.title : item.name
        }</h1>
        <span class="premieres-card-description">${
          type === "movie" ? item.release_date : item.first_air_date
        }</span>
    </div>
    `;
};

const getDataPremieres = async(type) => {
    let ress;
    if (type === "movie") {
        ress = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=en-MX&page=1`
        );
    } else {
        ress = await fetch(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=8dbe9b2f66b85a085ad28e12a7c2b943&language=en-MX&page=1`
        );
    }
    const data = await ress.json();
    return data;
};

const handlePremierClick = (e, i) => {
    e.target.classList.add("SELECTED");
    premieresItems.forEach((item) => {
        if (item !== e.target) {
            item.classList.remove("SELECTED");
        }
    });
    switch (e.target.textContent) {
        case "Peliculas":
            getDataPremieres("movie").then((ress) => {
                changeImg(ress.results[0].backdrop_path, true);
                const premieresContainer = document.querySelector(
                    ".premieres-container"
                );
                while (premieresContainer.firstChild) {
                    premieresContainer.removeChild(premieresContainer.firstChild);
                }
                ress.results.forEach((item, i) => {
                    if (item.backdrop_path) {
                        const card = insertPremieresCart(item, "movie");
                        premieresContainer.innerHTML += card;
                    }
                });
                addHoverEvent(premieresContainer);
            });
            break;
        case "En television":
            getDataPremieres("tv").then((ress) => {
                changeImg(ress.results[0].backdrop_path, true);
                const premieresContainer = document.querySelector(
                    ".premieres-container"
                );
                while (premieresContainer.firstChild) {
                    premieresContainer.removeChild(premieresContainer.firstChild);
                }
                ress.results.forEach((item, i) => {
                    if (item.backdrop_path) {
                        const card = insertPremieresCart(item, "tv");
                        premieresContainer.innerHTML += card;
                    }
                });
                addHoverEvent(premieresContainer);
            });
            break;
    }
};

premieresItems.forEach((item) => {
    item.addEventListener("click", handlePremierClick);
});

const changeImg = (imgUrl, firts) => {
    const premieresSection = document.querySelector(".premieres");
    let url;
    if (firts) {
        url = "https://image.tmdb.org/t/p/original" + imgUrl;
    } else {
        url = imgUrl.replace(
            "https://image.tmdb.org/t/p/w300",
            "https://image.tmdb.org/t/p/original"
        );
    }
    premieresSection.style.background = `url(${url})`;
    premieresSection.style.backgroundSize = "cover";
    premieresSection.style.backgroundPosition = "center";
};

const addHoverEvent = (container) => {
    const imgList = container.querySelectorAll(".premieres-card-img");
    imgList.forEach((item) => {
        item.addEventListener("mouseenter", () => changeImg(item.src));
    });
};

getDataPremieres("movie").then((ress) => {
    changeImg(ress.results[0].backdrop_path, true);
    const premieresContainer = document.querySelector(".premieres-container");
    while (premieresContainer.firstChild) {
        premieresContainer.removeChild(premieresContainer.firstChild);
    }
    ress.results.forEach((item, i) => {
        if (item.backdrop_path) {
            const card = insertPremieresCart(item, "movie");
            premieresContainer.innerHTML += card;
        }
    });
    addHoverEvent(premieresContainer);
});