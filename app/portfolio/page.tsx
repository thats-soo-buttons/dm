
"use client";

const categories = [
  {
    name: "Business",
    id: "business",
    color: "#fbc02d",
    desc: "Professional branding and business imagery.",
    images: [], // Add image paths here if available
  },
  {
    name: "Cinematic",
    id: "cinematic",
    color: "#b388ff",
    desc: "Stylized, narrative-driven shoots.",
    folder: "/portfolio/Cinematic",
    images: [], // Will show carousel if images are added
  },
  {
    name: "Flora and Fauna",
    id: "floraandfauna",
    color: "#81c784",
    desc: "Nature’s beauty, up close and personal.",
    images: [],
  },
  {
    name: "Pets",
    id: "pets",
    color: "#ffb300",
    desc: "Furry, feathered, and scaly friends.",
    images: [],
  },
  {
    name: "Portraits",
    id: "portraits",
    color: "#e17055",
    desc: "Cinematic, candid, and family moments.",
    subcategories: [
      { name: "Family", folder: "/portfolio/Portraits/Family", images: [] },
      { name: "Holiday", folder: "/portfolio/Portraits/Holiday", images: [] },
      { name: "Maternity", folder: "/portfolio/Portraits/Maternity", images: [] },
    ],
  },
  {
    name: "Events",
    id: "events",
    color: "#fdcb6e",
    desc: "Parades, celebrations, and special occasions.",
    subcategories: [
      { name: "Mardi Gras", folder: "/portfolio/Events/Parades/MardiGras", images: [] },
      { name: "St. Patrick's Day", folder: "/portfolio/Events/Parades/StPatricksDay", images: [] },
    ],
  },
  {
    name: "WorldBuilding",
    id: "worldbuilding",
    color: "#00bcd4",
    desc: "Architecture, interiors, objects, and outdoors.",
    subcategories: [
      { name: "Architecture", folder: "/portfolio/WorldBuilding/Architecture", images: [] },
      { name: "Interiors", folder: "/portfolio/WorldBuilding/Interiors", images: [] },
      { name: "Objects", folder: "/portfolio/WorldBuilding/Objects", images: [] },
      { name: "Outdoors", folder: "/portfolio/WorldBuilding/Outdoors", images: [] },
    ],
  },
];

function PortfolioPage() {
  // Handler for quick-find buttons
  function handleQuickFind(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#181c1f", color: "#fff", fontSize: 20, padding: 24 }}>
      <h1 style={{ color: "#ffd700", fontSize: 36, textAlign: "center", marginBottom: 32 }}>Portfolio</h1>
      {/* Quick-Find Links */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18, marginBottom: 32 }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleQuickFind(cat.id)}
            style={{
              background: cat.color,
              color: "#222",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 18,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Category Sections (placeholder) */}
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} style={{ marginBottom: 48 }}>
          <h2 style={{ color: cat.color, fontSize: 28 }}>{cat.name}</h2>
          <p>{cat.desc}</p>
          {/* TODO: Render carousels or images here when available */}
        </section>
      ))}
    </div>
  );
}

export default PortfolioPage;
