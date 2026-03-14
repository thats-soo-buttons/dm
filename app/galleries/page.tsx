"use client";
import React from "react";

export default function GalleriesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#181c1f", padding: "40px 0" }}>
      <h1 style={{ color: "#ffd700", textAlign: "center", fontSize: 40, marginBottom: 32 }}>Client Galleries</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          src="https://devilliermedia.pic-time.com/client"
          title="Client Galleries"
          style={{ width: "100%", maxWidth: 1200, height: "80vh", border: "none", borderRadius: 12, boxShadow: "0 2px 24px #0006" }}
          allowFullScreen
        ></iframe>
      </div>
      <p style={{ color: "#fff", textAlign: "center", marginTop: 24 }}>
        If the galleries do not load, <a href="https://devilliermedia.pic-time.com/client" target="_blank" rel="noopener noreferrer" style={{ color: "#ffd700", textDecoration: "underline" }}>click here to open in a new tab</a>.
      </p>
    </div>
  );
}
