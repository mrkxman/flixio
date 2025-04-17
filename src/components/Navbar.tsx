'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('flixioUser');
    setIsLoggedIn(!!user);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed.length > 0) {
      router.push(`/?query=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flixioUser');
    setIsLoggedIn(false);
    router.refresh(); // Refresh the page to update state
  };

  return (
    <header className="header-top">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link href="/">
          <Image
            src="/Flixio-icon.png"
            alt="Flixio Logo"
            width={42}
            height={42}
            priority
          />
        </Link>
        <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'white', textDecoration: 'none' }}>
          Flixio
        </Link>
      </div>

      <nav className="nav-links" style={{ marginLeft: '40vw' }}>
        <Link href="/">Movies</Link>
        <Link href="/favourites">Favourites</Link>
      </nav>

      <form className="auth-buttons" onSubmit={handleSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Find movies, TV shows and more"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          style={{ color: 'skyblue', marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Logout
        </button>
      ) : (
        <Link href="/SignUp" style={{ color: 'skyblue', marginLeft: '1rem' }}>
          Login
        </Link>
      )}
    </header>
  );
}

export default Navbar;
