'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutUs() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px' }}>
          <h1
            style={{
              fontSize: '48px',
              marginBottom: '20px',
              fontWeight: '700',
              letterSpacing: '2px',
            }}
          >
            About Flixio
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            Welcome to Flixio – your ultimate destination for discovering movies and TV shows. We&rsquo;re a passionate team dedicated to making the world of cinema accessible, engaging, and visually stunning.
          </p>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            Built on React and powered by The Movie Database (TMDB) API, Flixio offers you a seamless browsing experience—whether you're searching for the latest trending films, exploring detailed ratings and genres, or uncovering hidden cinematic gems.
          </p>
          <p style={{ fontSize: '18px', lineHeight: 1.6 }}>
            Our mission is simple: to create a visually appealing, user-friendly platform that brings the magic of movies and TV directly to you. Dive in and discover your next favorite show or blockbuster film!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
