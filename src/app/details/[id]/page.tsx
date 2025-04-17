'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import MovieCard from '../../../components/MovieCard';

type MovieType = {
  id: number;
  title?: string;
  name?: string;
  tagline?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  backdrop_path?: string;
};

type Person = {
  id: number;
  name: string;
  character: string;
};

type Recommendation = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
};

export default function DetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const type = searchParams.get('type') || 'movie';

  const [movie, setMovie] = useState<MovieType | null>(null);
  const [cast, setCast] = useState<Person[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=c6764f777e0234ca7da5bf3c5d12cac4`
        );
        const movieData = await movieRes.json();

        const castRes = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=c6764f777e0234ca7da5bf3c5d12cac4`
        );
        const castData = await castRes.json();

        const recRes = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=c6764f777e0234ca7da5bf3c5d12cac4`
        );
        const recData = await recRes.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
        setRecommendations(recData.results.slice(0, 10));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, type]);

  const handleAddToFavourites = async () => {
    if (added || adding || !movie) return;
    setAdding(true);

    try {
      const res = await fetch('/api/favourites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tmdbId: movie.id,
          title: movie.title || movie.name,
          type,
          posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }),
      });

      if (res.ok) {
        setAdded(true);
      } else {
        const text = await res.text();
        try {
          const err = JSON.parse(text);
          console.error('Add to favourites error:', err);
        } catch {
          console.error('Server returned non-JSON:', text);
        }
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
    }

    setAdding(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <Navbar />

      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          position: 'relative',
          color: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 0,
          }}
        />
        <div style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
            width="300"
            style={{ borderRadius: '10px' }}
          />
          <div>
            <h1>{movie.title || movie.name}</h1>
            <p>{movie.tagline}</p>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date || movie.first_air_date}</p>

            <button
              onClick={handleAddToFavourites}
              disabled={adding || added}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: added ? 'green' : '#1e90ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: added ? 'default' : 'pointer',
              }}
            >
              {added ? '✓ Added to Favourites' : '★ Add to Favourites'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h2>Cast</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {cast.map((person) => (
            <div key={person.id}>
              <p>
                <strong>{person.name}</strong>
              </p>
              <p>as {person.character}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h2>More Like This</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {recommendations.map((item: Recommendation) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title || item.name || 'Untitled'}
              posterPath={item.poster_path || ''}
              type={type}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
