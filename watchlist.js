function updateWatchlistUI(movies) {
  // Update the watchlist UI here (e.g., display the watchlist in a separate section)
  let watchlistContainer = document.getElementById("watchlist");
  let watchlistHTML = "";
  console.log(watchlistContainer);
  if (movies.length === 0) {
    watchlistContainer.innerHTML = `
        <div class='flex'>
          <h3><a href="index.html">Add Movies</a> to Your Playlist</h3>
        </div>
      `;
  } else {
    movies.forEach((movie) => {
      watchlistHTML += `
          <div class="watchlist-item">
            <h3>${movie.title}</h3>
          </div>
        `;
    });

    watchlistContainer.innerHTML = watchlistHTML;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateWatchlistUI(WatchlistArray);
});
