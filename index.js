let input = document.getElementById("input");
let Btn = document.getElementById("search-Btn");

Btn.addEventListener("click", () => {
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e3e0384d&s=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.Search);
      let Movies = data.Search;
      displayMovies(Movies);
    });
});

function displayMovies(movies) {
  // Get the container element where you want to display the movies
  let dataContainer = document.getElementById("data");

  // Clear the previous content in the container
  dataContainer.innerHTML = "";

  // Loop through the array of movies
  movies.forEach((movie) => {
    // Create a new div element for each movie
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    // Create HTML content for the movie (you can customize this based on your data)
    let movieHTML = `
    <h2>${movie.Title}</h2>
    <p>Year: ${movie.Year}</p>
    <p>Type: ${movie.Type}</p>
    <img src="${movie.Poster}" alt="${movie.Title} Poster" />
    <button class="addToWatchlistBtn">Add to Watchlist</button>
  `;

    // Set the HTML content for the movie div
    movieDiv.innerHTML = movieHTML;

    // Append the movie div to the container
    dataContainer.appendChild(movieDiv);
  });
}
