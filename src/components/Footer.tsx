'use client';
import Link from "next/link";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <footer
      style={{
        backgroundColor: "#14052c",
        color: "#fff",
        padding: "40px 20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "30px",
        rowGap: "50px",
      }}
    >
      <div style={{ flex: "1 1 250px", minWidth: "220px" }}>
        <h3 style={{ color: "skyblue" }}>FLIXIO</h3>
        <p style={{ maxWidth: "300px", margin: 'auto' }}>
          A smarter way to discover and explore your favorite movies and TV
          shows. Stay updated with trending titles, ratings, and more.
        </p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          © 2025 Flixio. All rights reserved.
        </p>
      </div>

      <div style={{ flex: "1 1 150px", minWidth: "140px" }}>
        <h4 style={{ color: "skyblue" }}>Quick Links</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li><Link href="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link></li>
          <li><Link href="/favourites" style={{ color: "#ccc", textDecoration: "none" }}>Favourites</Link></li>
          <li><Link href="/about" style={{ color: "#ccc", textDecoration: "none" }}>About Us</Link></li>
          <li><Link href="/SignUp" style={{ color: "#ccc", textDecoration: "none" }}>Login</Link></li>
        </ul>
      </div>

      <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
        <h4 style={{ color: "skyblue" }}>Contact</h4>
        <p>Email: support@flixio.com</p>
        <p>Phone: +1 (647) 123-4567</p>
        <p>Address: 20019 Dundas, Toronto, ON</p>
      </div>

      <div style={{ flex: "1 1 300px", minWidth: "260px" }}>
        <h4 style={{ color: "skyblue" }}>Stay in the loop</h4>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                flex: "1 1 auto",
                borderRadius: "4px",
                border: "1px solid #ccc",
                minWidth: "180px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </form>
        ) : (
          <p style={{ color: "lightblue", fontSize: "14px" }}>
            Thanks for subscribing! You'll be notified shortly via email.
          </p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
