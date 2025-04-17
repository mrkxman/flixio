'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MovieCard({ id, title, posterPath, type }: { 
  id: number; 
  title: string; 
  posterPath: string; 
  type: string 
}) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const placeholder = 'https://via.placeholder.com/200x300';
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : placeholder;

  const handleAddToFavourites = async () => {
    if (added || adding) return;

    setAdding(true);

    try {
      const res = await fetch('/api/favourites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tmdbId: id,
          title,
          type,
          posterUrl: imageUrl,
        }),
      });

      if (res.ok) {
        setAdded(true);
      } else {
        const error = await res.json();
        console.error('Failed to add to favourites:', error);
      }
    } catch (err) {
      console.error('Error:', err);
    }

    setAdding(false);
  };

  return (
    <div className="movie-card">
      <Link href={`/details/${id}?type=${type}`}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
      </Link>
      <button
        className="favourite-btn"
        onClick={handleAddToFavourites}
        disabled={added || adding}
        title={added ? 'Added to favourites' : 'Add to favourites'}
      >
        {added ? '✓' : '★'}
      </button>
    </div>
  );
}
