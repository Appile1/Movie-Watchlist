function updateWatchlistUI() {
  // Update the watchlist UI here (e.g., display the watchlist in a separate section)
  let watchlistContainer = document.getElementById("watchlist");
  let watchlistHTML = "";
  let movies = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (movies.length === 0) {
    watchlistContainer.innerHTML = `
        <div class='flex'>
          <h3><a href="index.html">Add Movies</a> to Your Playlist</h3>
        </div>
      `;
  } else {
    movies.forEach((movie) => {
      watchlistHTML += `
      <div class="movie">
      <img class="movie-poster" src="${movie.Poster}" />
      <div>
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="Watchlist-btn" data-imdbid="${movie.imdbID}">Add to Watchlist</button>
      </div>
    </div>
        `;
    });

    watchlistContainer.innerHTML = watchlistHTML;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateWatchlistUI();
});
