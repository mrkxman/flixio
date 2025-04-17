'use client'
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';

type Favourite = {
  id: number;
  tmdbId: number;
  title: string;
  type: string;
  posterUrl: string;
};

function Favourites() {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/favourites')
      .then((res) => res.json())
      .then((data) => {
        setFavourites(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Remove this favourite?');
    if (!confirmed) return;

    await fetch('/api/favourites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setFavourites((prev) => prev.filter((fav) => fav.id !== id));
  };

  return (
    <>
      <Navbar />
      <main>
        <h2>Your Favourites</h2>
        {loading ? (
          <p>Loading...</p>
        ) : favourites.length === 0 ? (
          <p>No favourites yet.</p>
        ) : (
          <div className="movie-grid">
            {favourites.map((fav) => (
              <div key={fav.id}>
                <MovieCard
                  id={fav.tmdbId}
                  title={fav.title}
                  posterPath={fav.posterUrl}
                  type={fav.type}
                />
                <button onClick={() => handleDelete(fav.id)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Favourites;
