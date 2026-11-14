import type { FavoriteFilm } from "./types"

/**
 * My four all-time favourites, shown under "Favourites" on Life Outside.
 *
 * Posters come from Wikipedia. To use Letterboxd's instead, open the film on
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
    title: "The Intouchables",
    year: 2011,
    poster: "https://upload.wikimedia.org/wikipedia/en/9/93/The_Intouchables.jpg",
    url: "https://letterboxd.com/film/the-intouchables/",
  },
  {
    title: "Grave of the Fireflies",
    year: 1988,
    poster: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grave_of_the_Fireflies_Japanese_poster.jpg",
    url: "https://letterboxd.com/film/grave-of-the-fireflies/",
  },
]
