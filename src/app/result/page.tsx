"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  const containerStyle = {
    backgroundColor: "gray",
    color: "lightblue",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    margin: 0,
  };

  return (
    <div style={{}}>
      <h1>Submitted Data</h1>
      {name && email  ? (
        <>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <Link href="/" style={{ marginTop: "20px", display: "inline-block" }}>
            <button>Back to Home</button>
          </Link>
        </>
      ) : (
        <>
          <p>
            <strong>No data received.</strong>
          </p>
          <Link href="/" style={{ marginTop: "20px", display: "inline-block" }}>
            <button>Go to Auth</button>
          </Link>
        </>
      )}
    </div>
  );
}
