let input = document.getElementById("input");
let Btn = document.getElementById("search-Btn");
let WatchlistArray = [];
let Movies;

Btn.addEventListener("click", () => {
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e3e0384d&s=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      Movies = data.Search;
      displayMovies(Movies);
    });
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
    let movieHTML = `
      <div class="movie">
        <img class="movie-poster" src="${movie.Poster}" />
        <div>
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <button class="Watchlist-btn" data-imdbid="${movie.imdbID}">Add to Watchlist</button>
        </div>
      </div>
    `;

    // Set the HTML content for the movie div
    html += movieHTML;
  });

  // Append the movie divs to the container
  dataContainer.innerHTML = html;

  // Add event listener for the "Add to Watchlist" button inside the displayMovies function

  let addToWatchlistBtn = dataContainer.querySelector(".Watchlist-btn");
  addToWatchlistBtn.addEventListener("click", () => {
    // Get the IMDb ID of the clicked movie
    const imdbID = addToWatchlistBtn.getAttribute("data-imdbid");

    // Check if the movie is not already in the watchlist
    if (!WatchlistArray.find((item) => item.imdbID === imdbID)) {
      // Add the movie to the watchlist array
      const movie = Movies.find((x) => x.imdbID === imdbID);
      if (localStorage.getItem("watchlist")) {
        let watchlistNewArray = JSON.parse(localStorage.getItem("watchlist"));
        watchlistNewArray.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlistNewArray));
      } else {
        WatchlistArray.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(WatchlistArray));
      }

      updateWatchlistUI();
      // You can update the UI or perform any additional actions her
    }
  });
}
