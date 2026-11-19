import type { FavoriteFilm } from "./types"

/**
 * My four all-time favourites, shown under "Favourites" on Life Outside.
 *
 * Posters come from Letterboxd or Wikipedia. To use Letterboxd's instead, open the film on
 * Letterboxd, right-click the poster → Copy Image Address, and paste it as
 * `poster` (a.ltrbxd.com URLs work out of the box).
 */
export const favorites: FavoriteFilm[] = [
  {
    title: "Amélie",
    year: 2001,
    poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg",
    url: "https://letterboxd.com/film/amelie/",
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Grand_Budapest_Hotel.png",
    url: "https://letterboxd.com/film/the-grand-budapest-hotel/",
  },
  {
    title: "Paris, Texas",
    year: 1984,
    poster: "https://a.ltrbxd.com/resized/film-poster/5/1/4/6/9/51469-paris-texas-0-600-0-900-crop.jpg?v=c8f2743612",
    url: "https://letterboxd.com/film/paris-texas/",
  },
  {
    title: "A Separation",
    year: 2011,
    poster: "https://a.ltrbxd.com/resized/film-poster/6/3/4/5/6345-a-separation-0-600-0-900-crop.jpg?v=dca05d4c0a",
    url: "https://letterboxd.com/film/a-separation/",
  },
]
