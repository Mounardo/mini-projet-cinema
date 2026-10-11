import { searchMovies } from "./api.js";
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const loadMoreSearchButton = document.getElementById("load-more-search");
let timeout;
let currentPage = 1;
let currentSearch = "";

searchInput.addEventListener("input", function() {
    clearTimeout(timeout);

    timeout = setTimeout(async function() {
        const title = searchInput.value;

        if (title.trim() === "") {
    searchResults.innerHTML = "";
    loadMoreSearchButton.hidden = true;
    return;
}

currentSearch = title;
currentPage = 1;
loadMoreSearchButton.disabled = false;

const data = await searchMovies(currentSearch, currentPage);

        searchResults.innerHTML = "";

if (data.Response === "False") {
    searchResults.innerHTML = "<p>Aucun film trouvé.</p>";
    loadMoreSearchButton.hidden = true;
    return;
}

loadMoreSearchButton.hidden = false;

data.Search.forEach(function(movie) {
    searchResults.innerHTML += `
        <article>
            <img
    src="${movie.Poster !== "N/A" ? movie.Poster : ""}"
    alt="${movie.Title}"
>
            <h2>${movie.Title}</h2>

            <a href="movie.html?id=${movie.imdbID}">
                En savoir plus
            </a>
        </article>
    `;
});
    }, 500);
});

loadMoreSearchButton.addEventListener("click", async function() {
    currentPage++;

    const data = await searchMovies(currentSearch, currentPage);

    if (data.Response === "False") {
    loadMoreSearchButton.disabled = true;
    loadMoreSearchButton.hidden = true;
    return;
}

    data.Search.forEach(function(movie) {
    searchResults.innerHTML += `
        <article>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>

            <a href="movie.html?id=${movie.imdbID}">
                En savoir plus
            </a>
        </article>
    `;
});
});