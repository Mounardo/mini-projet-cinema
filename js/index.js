import {
    searchMovies,
    getMovieById,
    searchMoviesByYear
} from "./api.js";
const container = document.getElementById("movies-container");
const trendingMovies = [
    "Dune: Part Two",
    "Inside Out 2",
    "Deadpool & Wolverine"
];
async function displayMovies() {
    
     container.innerHTML = "";

    for (const title of trendingMovies) {
        const data = await searchMovies(title);

        const movie = data.Search[0];
        const details = await getMovieById(movie.imdbID);

        container.innerHTML += `
            <article>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>${details.Plot}</p>

                <a href="movie.html?id=${movie.imdbID}">
                    En savoir plus
                </a>
            </article>
        `;
    }
}
const loadMoreButton = document.getElementById("load-more");

let currentPage = 1;

loadMoreButton.addEventListener("click", async function() {
    currentPage++;

    const data = await searchMoviesByYear("movie", 2024, currentPage);

    data.Search.forEach(function(movie) {
    container.innerHTML += `
        <article>
            <img
    src="${movie.Poster}"
    alt="${movie.Title}"
   onerror="this.onerror=null; this.src='https://via.placeholder.com/300x450?text=Poster+indisponible'"
>
            <h2>${movie.Title}</h2>

            <a href="movie.html?id=${movie.imdbID}">
                En savoir plus
            </a>
        </article>
    `;
});
});
displayMovies();
