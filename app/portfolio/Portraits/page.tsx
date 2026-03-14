
import Link from "next/link";
import Image from "next/image";

// TODO: Replace with API or static import
const categories = [
  { name: "Family", previewImg: "/portfolio/Portraits/Family/family1.jpg" },
  { name: "Holiday", previewImg: "/portfolio/Portraits/Holiday/holiday1.jpg" },
  { name: "Maternity", previewImg: "/portfolio/Portraits/Maternity/maternity1.jpg" },
];

export default function PortraitsPage() {
  return (
    <div style={{ padding: 32, background: '#181c1f', minHeight: '100vh', color: '#f5f5f5' }}>
      <h1 style={{ color: '#2ecc7a', fontSize: 40, marginBottom: 32 }}>Portraits</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {categories.map((cat) => (
          <div key={cat.name} style={{ background: '#222', borderRadius: 16, padding: 24, width: 320, boxShadow: '0 2px 12px #0006', textAlign: 'center' }}>
            <Link href={`/portfolio/Portraits/${cat.name}`} style={{ color: '#fff', textDecoration: 'none' }}>
              {cat.previewImg && <Image src={cat.previewImg} alt={cat.name} width={280} height={180} style={{ borderRadius: 8, objectFit: 'cover', marginBottom: 16 }} />}
              <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>{cat.name}</div>
              <div style={{ fontSize: 18, color: '#2ecc7a' }}>View Gallery</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
