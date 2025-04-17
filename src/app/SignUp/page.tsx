'use client';

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    localStorage.setItem('flixioUser', JSON.stringify({
      email: loginEmail,
      password: loginPassword,
      loggedIn: true,
    }));

    router.push('/');
  };

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();

    localStorage.setItem('flixioUser', JSON.stringify({
      email: signupEmail,
      password: signupPassword,
      loggedIn: true,
    }));

    router.push('/');
  };

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#14052c",
      }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLogin ? (
          <form
            onSubmit={handleLoginSubmit}
            style={{
              width: "400px",
              padding: "30px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                margin: "0 0 20px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "black",
              }}
            >
              Login
            </h2>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  color: "black",
                  backgroundColor: 'white'
                }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  color: "black",
                  backgroundColor: 'white'
                }}
              />
            </div>
            <h2
              style={{
                textAlign: "center",
                margin: "0 0 20px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                letterSpacing: "1px",
                color:"black",
                fontSize:"14px"
              }}
            >
              Login in using
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "40px"}}>
              <img alt="Facebook F Logo Stock Illustrations – 178 Facebook F Logo ..." id="dimg_mMX9Z6KXBMegptQPgt2D0QI_5" src="data:image/png;base64,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" data-csiid="mMX9Z6KXBMegptQPgt2D0QI_3" data-atf="1" style={{width:"50px",height:"auto"}}></img>
              <img alt="The Secret History of the Google Logo" id="dimg_psX9Z7m2DtKvptQPg4i-2Ak_11" src="data:image/jpeg;base64,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" data-csiid="psX9Z7m2DtKvptQPg4i-2Ak_5" data-atf="1"  style={{width:"50px",height:"auto"}}></img>
              <img alt="Yahoo redesigns its logo to remind you that Yahoo exists ..." id="dimg_scX9Z431M8yA5OMPzoCW6Ag_2" src="data:image/jpeg;base64,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" data-csiid="scX9Z431M8yA5OMPzoCW6Ag_5" data-atf="1" style={{width:"50px",height:"auto"}}></img>
            </div>
            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#14052c",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Login
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSignupSubmit}
            style={{
              width: "400px",
              padding: "30px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                margin: "0 0 20px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "black",
              }}
            >
              Sign Up
            </h2>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  color: "black",
                  backgroundColor: 'white'
                }}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  color: "black",
                  backgroundColor: 'white'
                }}
              />
            </div>
            <h2
              style={{
                textAlign: "center",
                margin: "0 0 20px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                letterSpacing: "1px",
                color:"black",
                fontSize:"14px"
              }}
            >
              Sign up using
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "40px" }}>
              <img alt="Facebook F Logo Stock Illustrations – 178 Facebook F Logo ..." id="dimg_mMX9Z6KXBMegptQPgt2D0QI_5" src="data:image/png;base64,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" data-csiid="mMX9Z6KXBMegptQPgt2D0QI_3" data-atf="1" style={{width:"50px",height:"auto"}}></img>
              <img alt="The Secret History of the Google Logo" id="dimg_psX9Z7m2DtKvptQPg4i-2Ak_11" src="data:image/jpeg;base64,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" data-csiid="psX9Z7m2DtKvptQPg4i-2Ak_5" data-atf="1"  style={{width:"50px",height:"auto"}}></img>
              <img alt="Yahoo redesigns its logo to remind you that Yahoo exists ..." id="dimg_scX9Z431M8yA5OMPzoCW6Ag_2" src="data:image/jpeg;base64,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" data-csiid="scX9Z431M8yA5OMPzoCW6Ag_5" data-atf="1" style={{width:"50px",height:"auto"}}></img>
            </div>
            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#14052c",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Sign Up
            </button>
          </form>
        )}
      </div>

      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        <button
          onClick={toggleForm}
          style={{
            padding: "8px 16px",
            background: "#fff",
            color: "#14052c",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
      <Footer />
    </div>
  );
}
