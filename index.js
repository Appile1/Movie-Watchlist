import { WatchlistArray } from "./watchlistArray.js";
import { savetoLocalStorage } from "./utilites.js";
let input = document.getElementById("input");
let Btn = document.getElementById("search-Btn");
let Movies = [];

Btn.addEventListener("click", () => {
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e3e0384d&s=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      const DataArray = [];
      Movies = data.Search;

      data.Search.forEach((movie) => {
        fetch(`https://www.omdbapi.com/?apikey=e3e0384d&i=${movie.imdbID}`)
          .then((res) => res.json())
          .then((data) => DataArray.push(data))
          .then(() => {
            // Check if all movies have been fetched
            if (DataArray.length === Movies.length) {
              console.log(DataArray);
              displayMovies(DataArray);
            }
          });
      });
    });

  input.value = "";
});

function displayMovies(movies) {
  // Get the container element where you want to display the movies
  let dataContainer = document.getElementById("data");
  let html = "";
  // Clear the previous content in the container
  dataContainer.innerHTML = "";

  // Loop through the array of movies
  movies.forEach((movie) => {
    // Create HTML content for the movie (you can customize this based on your data)
    let movieHTML = `<div class="movie">
    <img class="movie-poster" src="${movie.Poster}" />
    <div class="movie-details">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
      </div>
      <p class="rating"><strong>Rating:</strong> ${movie?.Ratings[0]?.Value}</p>
      <div class="movie-meta">
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <p class="genre"><strong>Genre:</strong> ${movie.Genre}</p>
        <button class="Watchlist-btn" data-imdbid="${movie.imdbID}">Add to Watchlist</button>
      </div>
      <p><strong>Description:</strong> ${movie.Plot}</p>
    </div>
  </div>
  
  `;

    // Set the HTML content for the movie div
    html += movieHTML;
  });

  // Append the movie divs to the container
  dataContainer.innerHTML = html;

  // Add event listener for the "Add to Watchlist" button inside the displayMovies function
  document.querySelectorAll(".Watchlist-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const imdbID = btn.getAttribute("data-imdbid");
      if (!WatchlistArray.find((x) => x.imdbID === imdbID)) {
        let selectedMovie = movies.find((x) => imdbID === x.imdbID);
        WatchlistArray.unshift(selectedMovie);
        savetoLocalStorage(WatchlistArray);
      }
    });
  });
}
