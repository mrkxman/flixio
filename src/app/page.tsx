'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import {
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchTrending,
} from '../utils/api';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    async function loadData() {
      if (query) {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=c6764f777e0234ca7da5bf3c5d12cac4&query=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setSearchResults(data.results || []);
      } else {
        const [movieData, showData, trendingData] = await Promise.all([
          fetchPopularMovies(),
          fetchPopularTVShows(),
          fetchTrending(),
        ]);
        setMovies(movieData.results);
        setShows(showData.results);
        setTrending(trendingData);
      }
    }

    loadData();
  }, [query]);

  useEffect(() => {
    if (!query && trending.length > 0) {
      const timer = setInterval(() => {
        setBannerIndex((prevIndex) => (prevIndex + 1) % trending.length);
      }, 7500);
      return () => clearInterval(timer);
    }
  }, [trending, query]);

  const banner = trending[bannerIndex];

  return (
    <>
      <Navbar />
      <main>
        {!query && banner && (
          <section
            className="banner"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '2rem',
              backgroundImage: `url(https://image.tmdb.org/t/p/original${banner.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: -1,
              }}
            ></div>

            <img
              src={`https://image.tmdb.org/t/p/w500${banner.poster_path}`}
              alt={banner.title || banner.name}
              style={{
                width: '300px',
                borderRadius: '10px',
                marginRight: '2rem',
              }}
            />
            <div>
              <h1>{banner.title || banner.name}</h1>
              <p>
                {banner.release_date?.split('-')[0] ||
                  banner.first_air_date?.split('-')[0]}{' '}
                • {banner.vote_average?.toFixed(1)}/10 • {banner.vote_count} votes
              </p>
              <p style={{ maxWidth: '600px' }}>{banner.overview}</p>
              <Link href={`/details/${banner.id}?type=${banner.media_type}`}>
                <button
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#1e90ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  Learn More
                </button>
              </Link>
            </div>
          </section>
        )}

        {query ? (
          <section>
            <h2>Search Results for “{query}”</h2>
            <div className="movie-grid">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <MovieCard
                    key={item.id}
                    id={item.id}
                    title={item.title || item.name}
                    posterPath={item.poster_path}
                    type={item.media_type || 'movie'}
                  />
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </section>
        ) : (
          <>
            <section>
              <h2>Popular Movies</h2>
              <div className="movie-grid">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    type="movie"
                  />
                ))}
              </div>
            </section>

            <section>
              <h2>Popular TV Shows</h2>
              <div className="movie-grid">
                {shows.map((show) => (
                  <MovieCard
                    key={show.id}
                    id={show.id}
                    title={show.name}
                    posterPath={show.poster_path}
                    type="tv"
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
