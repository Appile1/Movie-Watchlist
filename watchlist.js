import { WatchlistArray, RemoveMovie } from "./watchlistArray.js";
import { savetoLocalStorage } from "./utilites.js";

function updateWatchlistUI() {
  // Update the watchlist UI here (e.g., display the watchlist in a separate section)
  let watchlistContainer = document.getElementById("watchlist");
  let watchlistHTML = "";
  if (WatchlistArray.length === 0) {
    watchlistContainer.innerHTML = `
        <div class='flex'>
          <h3><a href="index.html">Add Movies</a> to Your Playlist</h3>
        </div>
      `;
  } else {
    WatchlistArray.forEach((movie) => {
      watchlistHTML += `<div class="movie">
      <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title} Poster" />
      <div class="movie-details">
        <h3>${movie.Title}</h3>
        <div class="movies-data">
          <p><strong>Runtime:</strong> ${movie.Runtime}</p>
          <p><strong>Genres:</strong><span class="genre">${movie.Genre}</span></p>
          <!-- Add genres dynamically based on movie data -->
          <button class="delete-btn" data-imdbid="${movie.imdbID}">Remove</button>
        </div>
        <p class="rating"><strong>Rating:</strong> ${movie?.Ratings[0]?.Value}</p>
        <p><strong>Description:</strong> ${movie.Plot}</p>
        <!-- Add movie description dynamically based on movie data -->
      </div>
    </div>
    
        `;
    });

    watchlistContainer.innerHTML = watchlistHTML;
  }

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const imdbID = btn.getAttribute("data-imdbid");
      RemoveMovie(imdbID);
      updateWatchlistUI();
      savetoLocalStorage(WatchlistArray);
    });
  });
}
updateWatchlistUI();
