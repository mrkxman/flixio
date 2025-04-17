// src/utils/api.ts
const API_KEY = 'c6764f777e0234ca7da5bf3c5d12cac4';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return await response.json();
}

export async function fetchPopularTVShows() {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  return await response.json();
}

export async function fetchMovieDetails(type: string, id: string) {
  const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
  return await response.json();
}

export async function fetchCast(type: string, id: string) {
  const response = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`);
  return await response.json();
}

export async function fetchRecommendations(type: string, id: string) {
  const response = await fetch(`${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}`);
  return await response.json();
}

export async function fetchGenres() {
  const [movieRes, tvRes] = await Promise.all([
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
  ]);
  const movieGenres = await movieRes.json();
  const tvGenres = await tvRes.json();
  return [...movieGenres.genres, ...tvGenres.genres];
}

export async function fetchDiscover({ genre, mediaType, sort }: { genre: string, mediaType: string, sort: string }) {
  const type = mediaType === 'tv' ? 'tv' : 'movie';
  const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&sort_by=${sort}${genre ? `&with_genres=${genre}` : ''}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

export async function fetchSearchResults(query: string) {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.results;
}
