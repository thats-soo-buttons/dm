import Link from "next/link";

const sections = [
  { name: "Portfolio Home", path: "/portfolio" },
  { name: "About Me", path: "/portfolio/about-me" },
  { name: "Portraits", path: "/portfolio/Portraits" },
  { name: "Cinematic", path: "/portfolio/Cinematic" },
  { name: "World Building", path: "/portfolio/WorldBuilding" },
  { name: "Events", path: "/portfolio/Events" },
  { name: "Holidays", path: "/portfolio/Holidays" },
  { name: "Flora and Fauna", path: "/portfolio/FloraAndFauna" },
];

export default function PortfolioNav() {
  return (
    <nav
      style={{
        width: "100%",
        background: "#181c1f",
        color: "#ffd700",
        padding: "0 0 0 0",
        borderBottom: "2px solid #ffd70033",
        fontFamily: "'Montserrat',sans-serif",
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        minHeight: 56,
        zIndex: 1000,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center" }}>
        {sections.map((section, idx) => (
          <Link
            key={section.name}
            href={section.path}
            style={{
              color: idx === 0 ? "#ffd700" : "#fffbe6",
              marginRight: 32,
              fontWeight: idx === 0 ? 900 : 600,
              textDecoration: "none",
              padding: "18px 0 18px 0",
              borderBottom: idx === 0 ? "2.5px solid #ffd700" : "none",
              transition: "color 0.18s, border-bottom 0.18s",
            }}
          >
            {section.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
