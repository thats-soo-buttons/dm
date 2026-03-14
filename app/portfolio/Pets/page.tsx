
import Image from "next/image";

export default function PetsGallery() {
  // TODO: Replace with API or static import
  const images = [
    "pet1.jpg",
    "pet2.jpg",
    "pet3.jpg",
    "pet4.jpg",
  ];
  return (
    <div style={{ padding: 32, background: '#181c1f', minHeight: '100vh', color: '#f5f5f5' }}>
      <h1 style={{ color: '#e67e22', fontSize: 40, marginBottom: 32 }}>Pets</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {images.map(img => (
          <Image key={img} src={`/portfolio/Pets/${img}`} alt={img} width={320} height={220} style={{ borderRadius: 8, objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
}
