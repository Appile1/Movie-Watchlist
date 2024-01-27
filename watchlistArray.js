export let WatchlistArray = JSON.parse(localStorage.getItem("data")) || [];

export function RemoveMovie(id) {
  let cart = WatchlistArray.filter((x) => {
    return x.imdbID !== id;
  });
  WatchlistArray = cart;
}
