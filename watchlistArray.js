export let WatchlistArray = JSON.parse(localStorage.getItem("WATCHLIST")) || [];

export function RemoveMovie(id) {
  let cart = WatchlistArray.filter((x) => {
    return x.imdbID !== id;
  });
  WatchlistArray = cart;
}
