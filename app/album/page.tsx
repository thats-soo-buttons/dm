import React from "react";
import { GALLERY_IMAGES } from "../../components/MiniGalleryCarousel";

export default function AlbumPage() {
  return (
    <div style={{ background: "#101014", minHeight: "100vh", color: "#ffd700", fontFamily: "'Montserrat', sans-serif", padding: "32px 0" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.2em", fontWeight: 800, marginBottom: 32, color: "#ffd700", letterSpacing: 1 }}>Album</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
        {GALLERY_IMAGES.map((img, idx) => (
          <div key={idx} style={{ background: "#18191c", borderRadius: 12, boxShadow: "0 2px 12px #000a", padding: 8, margin: 4 }}>
            <img
              src={"/photos/" + img}
              alt={img.split("/").pop()}
              style={{ width: 220, height: 150, objectFit: "cover", borderRadius: 8, display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
