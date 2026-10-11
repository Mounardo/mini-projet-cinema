import { searchMovies } from "./api.js";
const trendingMovies = [
    "Dune: Part Two",
    "Inside Out 2",
    "Deadpool & Wolverine"
];
async function displayMovies() {
    const container = document.getElementById("movies-container");

    container.innerHTML = "";

    for (const title of trendingMovies) {
        const data = await searchMovies(title);

        const movie = data.Search[0];

        container.innerHTML += `
            <article>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>

                <a href="movie.html?id=${movie.imdbID}">
                    En savoir plus
                </a>
            </article>
        `;
    }
}

displayMovies();