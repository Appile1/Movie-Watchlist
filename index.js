let input = document.getElementById("input");
let Btn = document.getElementById("search-Btn");

Btn.addEventListener("click", () => {
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e3e0384d&s=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.Search);
      console.log(data);
      let Movies = data.Search;
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
    // Create a new div element for each movie

    // Create HTML content for the movie (you can customize this based on your data)
    let movieHTML = `
<div class="movie">

    <img class="movie-poster" src="${movie.Poster}" />
    <div>
    <h3>${movie.Title} <h3>
    <p>${movie.Year} <p>

    <button class="Watchlist-btn">Add to Watchlist </button>
    </div>
 </div>

  `;

    // Set the HTML content for the movie div
    html += movieHTML;

    // Append the movie div to the container
  });
  dataContainer.innerHTML = html;
}
