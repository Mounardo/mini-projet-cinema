import { API_KEY, API_URL } from "./config.js";

export async function searchMovies(title) {
    const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`
    );

    const data = await response.json();

    return data;
}