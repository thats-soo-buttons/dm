export const runtime = 'edge';
import { notFound } from "next/navigation";
// import fs from "fs";
// import path from "path";
import Image from "next/image";

interface Props {
  params: { section: string };
}

export default function SectionGallery({ params }: Props) {

  const section = params.section;
  // TODO: Replace with API call or static import for images
  // For now, use a static demo list for each section
  const demoImages: Record<string, string[]> = {
    News: ["news1.jpg", "news2.jpg"],
    Portrait: ["portrait1.jpg", "portrait2.jpg"],
    Cinematic: ["cinematic1.jpg", "cinematic2.jpg"],
    WorldBuilding: ["world1.jpg", "world2.jpg"],
    Pets: ["pet1.jpg", "pet2.jpg"],
    Events: ["event1.jpg", "event2.jpg"],
  };
  const images = demoImages[section.charAt(0).toUpperCase() + section.slice(1)] || [];
  if (images.length === 0) {
    return notFound();
  }

  return (
    <div
      style={{
        padding: 32,
        background:
          section.toLowerCase() === 'news'
            ? 'linear-gradient(135deg, #181c1f 80%, #1e90ff 100%)'
            : section.toLowerCase() === 'portrait'
            ? 'linear-gradient(135deg, #181c1f 80%, #2ecc7a 100%)'
            : section.toLowerCase() === 'cinematic'
            ? 'linear-gradient(135deg, #181c1f 80%, #8e44ad 100%)'
            : section.toLowerCase() === 'worldbuilding'
            ? 'linear-gradient(135deg, #181c1f 80%, #f39c12 100%)'
            : '#181c1f',
        minHeight: '100vh',
        color: '#f5f5f5',
        borderRadius: 24,
        boxShadow: '0 4px 32px 0 #000a',
      }}
    >
      <h1
        style={{
          color:
            section.toLowerCase() === 'news'
              ? '#1e90ff'
              : section.toLowerCase() === 'portrait'
              ? '#2ecc7a'
              : section.toLowerCase() === 'cinematic'
              ? '#8e44ad'
              : section.toLowerCase() === 'worldbuilding'
              ? '#f39c12'
              : '#fff',
          fontSize: 40,
          marginBottom: 32,
        }}
      >
        {section.replace(/-/g, ' ').toUpperCase()}
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {images.map((img) => (
          <div key={img} style={{ width: 300, marginBottom: 24, background: '#222', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px #0006' }}>
            <Image
              src={`/api/watermarked-image?section=${section}&image=${img}`}
              alt={img}
              width={300}
              height={200}
              style={{ objectFit: 'cover', width: '100%', height: 200 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
