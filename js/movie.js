import { getMovieById } from "./api.js";

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");

const movieDetails = document.getElementById("movie-details");

if (!movieId) {
    movieDetails.innerHTML = "<p>Aucun film sélectionné.</p>";
} else {

    const movie = await getMovieById(movieId);

    if (movie.Response === "False") {
        movieDetails.innerHTML = "<p>Film introuvable.</p>";
    } else {

        let dvdDate = movie.DVD;

        if (dvdDate && dvdDate !== "N/A") {
            const date = new Date(dvdDate);
            dvdDate = date.toLocaleDateString("fr-FR");
        } else {
            dvdDate = "Non renseignée";
        }

        movieDetails.innerHTML = `
            <article>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h1>${movie.Title}</h1>
                <p><strong>Genre :</strong> ${movie.Genre}</p>
                <p><strong>Acteurs :</strong> ${movie.Actors}</p>
                <p><strong>Note IMDb :</strong> ${movie.imdbRating}/10</p>
                <p><strong>Sortie DVD :</strong> ${dvdDate}</p>
                <p>${movie.Plot}</p>
            </article>
        `;

        console.log(movie);
    }
}