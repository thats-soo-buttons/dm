import { useEffect, useState } from "react";

// Utility to get random elements from an array
function getRandomElements<T>(arr: T[], n: number): T[] {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

const GALLERY_IMAGES = [
  // Business
  ...[
    "portfolio/Business/P1140292 copy.jpg",
    "portfolio/Business/P1140302.jpg",
    "portfolio/Business/P1140308slightcropp.jpg",
    "portfolio/Business/P1140382.jpg",
    "portfolio/Business/P1140388.jpg",
    "portfolio/Business/P1140389.jpg",
    "portfolio/Business/P1140393.jpg",
    "portfolio/Business/P1140442.jpg",
    "portfolio/Business/P1230213-2.jpg",
    "portfolio/Business/P1230226-3.jpg",
    "portfolio/Business/P1230238.jpg",
    "portfolio/Business/P1230245.jpg",
    "portfolio/Business/P1230267.jpg",
    "portfolio/Business/P1230296.jpg",
    "portfolio/Business/P1230386-2.jpg",
    "portfolio/Business/P1230451.jpg",
    "portfolio/Business/P1230459-2.jpg",
    "portfolio/Business/P1230462-2.jpg",
    "portfolio/Business/P1230488-1.jpg",
    "portfolio/Business/P1230498.jpg",
    "portfolio/Business/P1230908.jpg",
    "portfolio/Business/P1240092.jpg",
    "portfolio/Business/P1240095.jpg",
    "portfolio/Business/P1240118.jpg",
    "portfolio/Business/P1240132-2.jpg",
    "portfolio/Business/P1240132.jpg",
    "portfolio/Business/_1270734.jpg",
    "portfolio/Business/_1270761.jpg",
    "portfolio/Business/_1270772.jpg",
    "portfolio/Business/_1270892.jpg",
    "portfolio/Business/_1270895.jpg",
    "portfolio/Business/_1270897.jpg",
    "portfolio/Business/_1270949.jpg",
    "portfolio/Business/_1270990.jpg",
    "portfolio/Business/_1280157-2.jpg",
  ],
  // FloraAndFauna
  ...[
    "portfolio/FloraAndFauna/P1220128-2.jpg",
    "portfolio/FloraAndFauna/P1220152.jpg",
    "portfolio/FloraAndFauna/P1220197-3.jpg",
    "portfolio/FloraAndFauna/P1220246-2.jpg",
    "portfolio/FloraAndFauna/P1220270.jpg",
    "portfolio/FloraAndFauna/P1220417.jpg",
    "portfolio/FloraAndFauna/P1220452.jpg",
    "portfolio/FloraAndFauna/P1220503-3.jpg",
  ],
  // Pets
  ...[
    "portfolio/Pets/P1200931-2.JPG",
    "portfolio/Pets/P1200945-2.jpg",
    "portfolio/Pets/P1210027.JPG",
    "portfolio/Pets/P1210582.jpg",
    "portfolio/Pets/P1250473-2.jpg",
    "portfolio/Pets/P1250566-2.jpg",
    "portfolio/Pets/P1250612-2.jpg",
    "portfolio/Pets/P1250625.jpg",
    "portfolio/Pets/P1250850.jpg",
    "portfolio/Pets/P1250863.jpg",
    "portfolio/Pets/_1250396.jpg",
    "portfolio/Pets/_1250408.jpg",
  ],
  // Portraits/Holiday
  ...[
    "portfolio/Portraits/Holiday/P1240963.jpg",
    "portfolio/Portraits/Holiday/P1240966.jpg",
    "portfolio/Portraits/Holiday/P1240981-2.jpg",
    "portfolio/Portraits/Holiday/P1240991-Editcrop2.jpg",
    "portfolio/Portraits/Holiday/P1240994.jpg",
    "portfolio/Portraits/Holiday/P1240999.jpg",
    "portfolio/Portraits/Holiday/P1250022.jpg",
    "portfolio/Portraits/Holiday/P1250090-2.jpg",
    "portfolio/Portraits/Holiday/P1250152-2.jpg",
    "portfolio/Portraits/Holiday/P1250153-2.jpg",
    "portfolio/Portraits/Holiday/P1250188.jpg",
  ],
  // Portraits/Maternity
  ...[
    "portfolio/Portraits/Maternity/P11500832.jpg",
    "portfolio/Portraits/Maternity/P1150113cropcrop.jpg",
    "portfolio/Portraits/Maternity/P1150481crop.jpg",
    "portfolio/Portraits/Maternity/Untitled-46.jpg",
    "portfolio/Portraits/Maternity/Untitled-83.jpg",
  ],
  // WorldBuilding/ArchitectureAndOutdoors
  ...[
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1220092.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1220408.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1220493.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250960-3.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250965-2.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250985.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250991-4.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1260060.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1260209-2.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/P1260282.jpg",
    "portfolio/WorldBuilding/ArchitectureAndOutdoors/_1270301.jpg",
  ],
];

export default function MiniGalleryCarousel() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(getRandomElements(GALLERY_IMAGES, 6));
  }, []);

  // Simple carousel logic
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "32px auto 0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", width: "100%" }}>
        {images.map((img, idx) => (
          <img
            key={img}
            src={`/${img}`}
            alt="Gallery preview"
            style={{
              width: idx === current ? 160 : 100,
              height: idx === current ? 120 : 80,
              objectFit: "cover",
              borderRadius: 10,
              boxShadow: idx === current ? "0 4px 24px #ffd70088" : "0 2px 8px #000a",
              opacity: idx === current ? 1 : 0.7,
              transition: "all 0.5s cubic-bezier(.4,2,.6,1)",
              border: idx === current ? "2.5px solid #ffd700" : "1.5px solid #bfa14a",
              zIndex: idx === current ? 2 : 1,
              background: "#181c1f"
            }}
          />
        ))}
      </div>
    </div>
  );
}
