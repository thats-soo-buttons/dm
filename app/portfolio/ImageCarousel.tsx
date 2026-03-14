"use client";
import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "../../node_modules/keen-slider/keen-slider.min.css";

interface ImageCarouselProps {
  folder: string;
  color: string;
}

export default function ImageCarousel({ folder, color }: ImageCarouselProps) {
  // Use actual images from the public/portfolio folders, up to 8 per category
  let images: string[] = [];
  if (folder === "/portfolio/Business") {
    images = [
      "/portfolio/Business/P1140292 copy.jpg",
      "/portfolio/Business/P1140302.jpg",
      "/portfolio/Business/P1140308slightcropp.jpg",
      "/portfolio/Business/P1140382.jpg",
      "/portfolio/Business/P1140388.jpg",
      "/portfolio/Business/P1140389.jpg",
      "/portfolio/Business/P1140393.jpg",
      "/portfolio/Business/P1140442.jpg",
    ];
  } else if (folder === "/portfolio/Cinematic") {
    images = [];
  } else if (folder === "/portfolio/FloraAndFauna") {
    images = [
      "/portfolio/FloraAndFauna/P1220128-2.jpg",
      "/portfolio/FloraAndFauna/P1220152.jpg",
      "/portfolio/FloraAndFauna/P1220197-3.jpg",
      "/portfolio/FloraAndFauna/P1220246-2.jpg",
      "/portfolio/FloraAndFauna/P1220270.jpg",
      "/portfolio/FloraAndFauna/P1220417.jpg",
      "/portfolio/FloraAndFauna/P1220452.jpg",
      "/portfolio/FloraAndFauna/P1220503-3.jpg",
    ];
  } else if (folder === "/portfolio/Pets") {
    images = [
      "/portfolio/Pets/P1200931-2.JPG",
      "/portfolio/Pets/P1200945-2.jpg",
      "/portfolio/Pets/P1210027.JPG",
      "/portfolio/Pets/P1210582.jpg",
      "/portfolio/Pets/P1250473-2.jpg",
      "/portfolio/Pets/P1250566-2.jpg",
      "/portfolio/Pets/P1250612-2.jpg",
      "/portfolio/Pets/P1250625.jpg",
    ];
  } else if (folder === "/portfolio/Portraits/Family") {
    images = [];
  } else if (folder === "/portfolio/Portraits/Holiday") {
    images = [
      "/portfolio/Portraits/Holiday/P1240963.jpg",
      "/portfolio/Portraits/Holiday/P1240966.jpg",
      "/portfolio/Portraits/Holiday/P1240981-2.jpg",
      "/portfolio/Portraits/Holiday/P1240991-Editcrop2.jpg",
      "/portfolio/Portraits/Holiday/P1240994.jpg",
      "/portfolio/Portraits/Holiday/P1240999.jpg",
      "/portfolio/Portraits/Holiday/P1250022.jpg",
      "/portfolio/Portraits/Holiday/P1250090-2.jpg",
    ];
  } else if (folder === "/portfolio/Portraits/Maternity") {
    images = [
      "/portfolio/Portraits/Maternity/P11500832.jpg",
      "/portfolio/Portraits/Maternity/P1150113cropcrop.jpg",
      "/portfolio/Portraits/Maternity/P1150481crop.jpg",
      "/portfolio/Portraits/Maternity/Untitled-46.jpg",
      "/portfolio/Portraits/Maternity/Untitled-83.jpg",
    ];
  } else if (folder === "/portfolio/WorldBuilding/ArchitectureAndOutdoors") {
    images = [
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1220092.jpg",
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1220408.jpg",
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1220493.jpg",
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250960-3.jpg",
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250965-2.jpg",
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250985.jpg",
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1250991-4.jpg",
      "/portfolio/WorldBuilding/ArchitectureAndOutdoors/P1260060.jpg",
    ];
  } else if (folder === "/portfolio/WorldBuilding/Interiors") {
    images = [];
  } else if (folder === "/portfolio/WorldBuilding/ArtifactsAndTech") {
    images = [];
  } else if (folder === "/portfolio/WorldBuilding/LifestyleAndCulture") {
    images = [];
  }

  if (images.length === 0) {
    return (
      <div style={{ width: "100%", maxWidth: 900, minHeight: 220, background: "#181c1f", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <span style={{ color, fontSize: 18 }}>[No images found in this category]</span>
      </div>
    );
  }

  // Responsive slides per view
  const [slides, setSlides] = useState(1);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1200) setSlides(4);
      else if (window.innerWidth >= 800) setSlides(2);
      else setSlides(1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [sliderRef] = useKeenSlider({
    slides: { perView: slides, spacing: 16 },
    loop: true,
    mode: "free",
  });

  return (
    <div style={{ width: "100%", maxWidth: 900, marginBottom: 12 }}>
      <div ref={sliderRef} className="keen-slider" style={{ minHeight: 220 }}>
        {images.map((src, i) => (
          <div className="keen-slider__slide" key={src} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 220 }}>
            <img
              src={src}
              alt={`Portfolio image ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, boxShadow: `0 2px 12px ${color}80` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
