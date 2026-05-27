"use client";
// ...existing code...
// Type declaration for window.openContactForm
declare global {
  interface Window {
    openContactForm?: () => void;
  }
}
import { useEffect, useRef, useState } from "react";
import MenuDropdown from "../components/MenuDropdown";
import ContactModal from "../components/ContactModal";
import content from "../content.json";
// Footer link styles
const footerLinkStyle = {
  color: "#ffd700",
  textDecoration: "none",
  fontWeight: 700,
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.08em",
  margin: "0 8px",
  transition: "color 0.2s",
  display: "inline-block",
};
const footerLinkStyleIcon = {
  color: "#ffd700",
  textDecoration: "none",
  margin: "0 4px",
  display: "inline-block",
  verticalAlign: "middle",
};
import React from "react";
import MiniGalleryCarousel from "../components/MiniGalleryCarousel";
// Inline styles for menu and footer links
const menuLinkStyle = {
  display: "block",
  padding: "12px 24px",
  color: "#222",
  textDecoration: "none",
  fontWeight: "bold",
};
const labelStyle = {
  display: "block",
  margin: "10px 0 4px",
  fontWeight: "bold",
  color: "#222",
};
const inputStyle = {
  width: "90%",
  margin: "8px 0",
  padding: 8,
};

// Move type declarations after imports for .tsx compatibility

type ServiceKey = "cinematicPhotography" | "worldBuilding" | "creativeDirection";
type ModalType = "details" | "pricing" | "booking" | "gallery";

function isValidServiceKey(key: any): key is ServiceKey {
  return ["cinematicPhotography", "worldBuilding", "creativeDirection"].includes(key);
}

function isValidModalType(key: any): key is ModalType {
  return ["details", "pricing", "booking", "gallery"].includes(key);
}


export default function ServicesPage() {
  // Prevent hydration mismatch: only render animated header after mount
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  // Rotating tagline logic (from content.json)
  const taglines = [
    "Cinematic Vision. Personal Touch",
    "Photography",
    "World Building",
    "Consulting"
  ];
  const [taglineIdx, setTaglineIdx] = useState(0); // Always starts at 0
  const [showTagline, setShowTagline] = useState(true);
  const taglineTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    taglineTimeout.current = setTimeout(() => {
      setShowTagline(false);
      setTimeout(() => {
        setTaglineIdx((i) => (i + 1) % taglines.length);
        setShowTagline(true);
      }, 400);
    }, 3200);
    return () => {
      if (taglineTimeout.current !== null) {
        clearTimeout(taglineTimeout.current);
      }
    };
  }, [taglineIdx, showTagline]);

  // Devil glow effect: glow for 1.2s, then normal
  const devilRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const devil = devilRef.current;
    if (!devil) return;
    devil.classList.add("devil-glow");
    const timer = setTimeout(() => {
      devil.classList.remove("devil-glow");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  // Modal state for service details/pricing/booking/gallery
  const [modal, setModal] = React.useState({ open: false, service: null, type: null });
  const closeModal = () => setModal({ open: false, service: null, type: null });
  // Modal state for 'Other Photography Services'
  const [photoModalOpen, setPhotoModalOpen] = React.useState(false);
  const openPhotoModal = (e: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    setPhotoModalOpen(true);
  };
  const closePhotoModal = () => setPhotoModalOpen(false);

  // Contact modal state
  const [contactOpen, setContactOpen] = React.useState(false);
  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);
  // Track scroll to show menu only after services section
  const [showMenu, setShowMenu] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const servicesSection = document.getElementById('services-section');
      if (!servicesSection) return;
      const rect = servicesSection.getBoundingClientRect();
      setShowMenu(rect.top <= 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      {/* Contact Modal */}
      <ContactModal open={contactOpen} onClose={closeContact} />
      {/* Devillier Media Banner at Top */}
      <section style={{ position: "relative", width: "100%", minHeight: 340, background: "#18191c", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src="/photos/imported/Clouds1Edit2.jpg" alt="Banner background" style={{ width: "100%", height: 340, objectFit: "cover", filter: "grayscale(0.1) brightness(0.7)", position: "absolute", top: 0, left: 0, zIndex: 1 }} />
        {/* Fog overlay with image and animation */}
        <div className="banner-fog" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 340, pointerEvents: "none", zIndex: 2, background: "url('https://www.transparenttextures.com/patterns/foggy-birds.png')", opacity: 0.22, animation: "fogMove 32s linear infinite", mixBlendMode: "lighten" }} />
        {/* Vignette overlay */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 340, pointerEvents: "none", zIndex: 3, background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(30,0,30,0.7) 100%), linear-gradient(180deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 60%,rgba(0,0,0,0.8) 100%)" }} />
        {/* Overlay for extra effects (none for now) */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 340, background: "none", zIndex: 4, pointerEvents: "none" }} />
        {hasMounted && (
          <div style={{ position: "relative", zIndex: 5, textAlign: "center", width: "100%", marginTop: 60 }}>
            <h1 className="banner-title" style={{ background: "linear-gradient(92deg, #fffbe6 5%, #e6c36a 20%, #bfa14a 40%, #ffd700 60%, #bfa14a 80%, #fffbe6 95%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Cinzel', 'Playfair Display', serif", fontSize: "2.7em", fontWeight: 700, letterSpacing: 2, textAlign: "center", textShadow: "0 2px 24px #000, 0 0 8px #bfa14a99, 0 1px 0 #fffbe6, 0 2px 8px #000a", opacity: 1 }}>
              <span ref={devilRef} className="devil-glow" style={{ color: "#fffbe6", textShadow: "0 0 18px #7f00ff, 0 0 32px #ffd700, 0 0 48px #7f00ff" }}>Devil</span>lier Media
            </h1>
            <div style={{ marginTop: 18, fontFamily: "'Cinzel',serif", fontSize: "1.15em", color: "#ffd700", fontWeight: 700, letterSpacing: 1, textShadow: "0 2px 8px #000a" }}>{content.header.availableNow}</div>
            <p className="banner-tagline" style={{ marginTop: 10, background: "linear-gradient(90deg, #fffbe6 10%, #e6c36a 40%, #ffd700 60%, #bfa14a 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Playfair Display', serif", fontSize: "1.3em", fontStyle: "italic", textShadow: "0 2px 12px #000, 0 0 6px #ffd70099", opacity: showTagline ? 1 : 0, transition: "opacity 0.4s" }}>
              {taglines[taglineIdx]}
            </p>
          </div>
        )}
      </section>
      {/* Library Video and Quotes Section moved to bottom */}
      <div style={{ width: "100vw", background: "#101014", paddingTop: 32, paddingBottom: 0, display: "flex", flexDirection: "column", alignItems: "center", marginTop: 64 }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "stretch", width: "100%", maxWidth: 1200, gap: 32, marginBottom: 18 }}>
          {/* Albert Einstein Quote - Left */}
          <div style={{ flex: 1, color: "#ffd700", fontFamily: "'Playfair Display', serif", fontSize: "1.18em", fontStyle: "italic", fontWeight: 600, letterSpacing: 0.5, textShadow: "0 2px 8px #000a", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", textAlign: "right", paddingRight: 12 }}>
            <div style={{ maxWidth: 320 }}>
              “Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world”<br/>
              <span style={{ fontSize: "0.95em", color: "#ffe9a6" }}>— Albert Einstein</span>
            </div>
          </div>
          {/* Video - Center */}
          <div style={{ flex: 1.2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ maxWidth: 480, width: "100%", borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 32px #000a", background: "#000" }}>
              <video src="/library.mp4" controls autoPlay muted loop style={{ width: "100%", height: "auto" }} poster="/photos/imported/Clouds1Edit2.jpg" />
            </div>
          </div>
          {/* Edgar Allan Poe Quote - Right */}
          <div style={{ flex: 1, color: "#ffd700", fontFamily: "'Playfair Display', serif", fontSize: "1.18em", fontStyle: "italic", fontWeight: 600, letterSpacing: 0.5, textShadow: "0 2px 8px #000a", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", textAlign: "left", paddingLeft: 12 }}>
            <div style={{ maxWidth: 320 }}>
              “Deep into that darkness peering, long I stood there, wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before.”<br/>
              <span style={{ fontSize: "0.95em", color: "#ffe9a6" }}>— Edgar Allan Poe</span>
            </div>
          </div>
        </div>
      </div>


      {/* --- FLYER SECTION --- */}
      <div style={{ width: "100vw", background: "#18191c", padding: "36px 0 24px 0", textAlign: "center", boxShadow: "0 2px 24px #000a" }}>
          {/* Flyer Section (Two-column Flex Layout) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", width: "100vw", margin: "32px 0 0 0", gap: 32 }}>
            {/* Left: Pricing/Services Info with Work with Me button below */}
            <div style={{ background: "#18181c", border: "2px solid #ffd700", borderRadius: 16, padding: "28px 32px 24px 32px", boxShadow: "0 2px 24px #000a", maxWidth: 420, width: "100%", color: "#ffd700", fontFamily: "'Playfair Display', serif", fontSize: "1.13em", fontWeight: 600, letterSpacing: 0.5, textAlign: "left", margin: 0, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
              <div style={{ marginBottom: 14, fontSize: "1.08em", fontWeight: 700, color: "#fffbe6", textShadow: "0 2px 8px #000a" }}>
                <span style={{ fontWeight: 800, color: "#ffd700" }}>📸 Photography:</span> Event | Cinematic | Mini Sessions<br/>
                <span style={{ fontWeight: 400, color: "#ffd700" }}>Starting at $75</span>
              </div>
              <div style={{ marginBottom: 14, fontWeight: 700, color: "#ffb347" }}>
                <span style={{ fontWeight: 800, color: "#ffd700" }}>🔥 Narrative Design:</span> Dialogue | Progression | World-Building<br/>
                <span style={{ fontWeight: 400, color: "#ffd700" }}>Starting at $125/project</span>
              </div>
              <div style={{ marginBottom: 18, fontWeight: 700, color: "#ffb3c6" }}>
                <span style={{ fontWeight: 800, color: "#ffd700" }}>🎤 Creative Consulting:</span> Lyrics | Plot Expansion | Graphic Design<br/>
                <span style={{ fontWeight: 400, color: "#ffd700" }}>& More Starting at $50/hr</span>
              </div>
              <button style={{ background: "#ffd700", color: "#18181c", fontWeight: 700, fontSize: "1.08em", border: "none", borderRadius: 8, padding: "10px 24px", marginTop: 8, cursor: "pointer", boxShadow: "0 2px 8px #000a", alignSelf: "center" }} onClick={() => setContactOpen(true)}>
                Work with Me
              </button>
            </div>
            {/* Right: Wallpaper/Graphics, Ko-fi */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minWidth: 320, maxWidth: 420, width: "100%", background: "#18181c", border: "2px solid #ffd700", borderRadius: 16, padding: "28px 32px 24px 32px", boxShadow: "0 2px 24px #000a", color: "#ffd700", fontFamily: "'Playfair Display', serif", fontSize: "1.1em", fontWeight: 600, letterSpacing: 0.5, margin: 0 }}>
              <div style={{ marginBottom: 16, color: "#fffbe6", fontWeight: 700, fontSize: "1.08em", textShadow: "0 2px 8px #000a" }}>
                🎨 Wallpaper / Graphics
              </div>
              <div style={{ marginBottom: 18, color: "#ffd700", fontWeight: 400, fontSize: "1em" }}>
                Custom digital wallpapers, graphics, and more!<br/>
                <a href="https://ko-fi.com/devilliermedia/shop" target="_blank" rel="noopener noreferrer" style={{ color: "#ffd700", textDecoration: "underline", fontWeight: 700, marginTop: 8, display: "inline-block" }}>Visit Ko-fi Shop</a>
              </div>
            </div>
          </div>
      </div>

      {/* --- MINI GALLERY CAROUSEL RESTORED --- */}
      <div style={{ width: "100vw", background: "#101014", padding: "18px 0 0 0", textAlign: "center" }}>
        <MiniGalleryCarousel />
      </div>

      {/* --- GALLERY LINKS RESTORED --- */}
      <div style={{ width: "100vw", background: "#18191c", padding: "18px 0 32px 0", textAlign: "center" }}>
        <a href="/galleries/all-carousel-images" style={{ color: "#ffd700", textDecoration: "underline", fontWeight: 700, marginLeft: "18px", fontSize: "1.08em", verticalAlign: "middle" }}>View Full Gallery</a>
        <a href="https://galleries.devilliermedia.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ffd700", textDecoration: "underline", fontWeight: 700, marginLeft: "18px", fontSize: "1.08em", verticalAlign: "middle" }}>Special Event Gallery</a>
      </div>
      {showMenu && <MenuDropdown onContact={openContact} />}
      <main style={{ background: "#101014", minHeight: "100vh", color: "#ece6d6", fontFamily: "'Montserrat', sans-serif", paddingTop: 60 }}>
        {/* Cinematic Banner */}
        <section style={{ position: "relative", width: "100%", minHeight: 340, background: "#18191c", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <img src="/photos/imported/Clouds1Edit2.jpg" alt="Banner background" style={{ width: "100%", height: 340, objectFit: "cover", filter: "grayscale(0.1) brightness(0.7)", position: "absolute", top: 0, left: 0, zIndex: 1 }} />
          {/* Fog overlay with image and animation */}
          <div className="banner-fog" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 340, pointerEvents: "none", zIndex: 2, background: "url('https://www.transparenttextures.com/patterns/foggy-birds.png')", opacity: 0.22, animation: "fogMove 32s linear infinite", mixBlendMode: "lighten" }} />
          {/* Vignette overlay */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 340, pointerEvents: "none", zIndex: 3, background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(30,0,30,0.7) 100%), linear-gradient(180deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 60%,rgba(0,0,0,0.8) 100%)" }} />
          {/* Overlay for extra effects (none for now) */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 340, background: "none", zIndex: 4, pointerEvents: "none" }} />
          {hasMounted && (
            <div style={{ position: "relative", zIndex: 5, textAlign: "center", width: "100%", marginTop: 60 }}>
              <h1 className="banner-title" style={{ background: "linear-gradient(92deg, #fffbe6 5%, #e6c36a 20%, #bfa14a 40%, #ffd700 60%, #bfa14a 80%, #fffbe6 95%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Cinzel', 'Playfair Display', serif", fontSize: "2.7em", fontWeight: 700, letterSpacing: 2, textAlign: "center", textShadow: "0 2px 24px #000, 0 0 8px #bfa14a99, 0 1px 0 #fffbe6, 0 2px 8px #000a", opacity: 1 }}>
                <span ref={devilRef} className="devil-glow" style={{ color: "#fffbe6", textShadow: "0 0 18px #7f00ff, 0 0 32px #ffd700, 0 0 48px #7f00ff" }}>Devil</span>lier Media
              </h1>
              <div style={{ marginTop: 18, fontFamily: "'Cinzel',serif", fontSize: "1.15em", color: "#ffd700", fontWeight: 700, letterSpacing: 1, textShadow: "0 2px 8px #000a" }}>{content.header.availableNow}</div>
              <p className="banner-tagline" style={{ marginTop: 10, background: "linear-gradient(90deg, #fffbe6 10%, #e6c36a 40%, #ffd700 60%, #bfa14a 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Playfair Display', serif", fontSize: "1.3em", fontStyle: "italic", textShadow: "0 2px 12px #000, 0 0 6px #ffd70099", opacity: showTagline ? 1 : 0, transition: "opacity 0.4s" }}>
                {taglines[taglineIdx]}
              </p>
            </div>
          )}
        </section>
      {/* Fog keyframes and banner styles */}
      <style jsx global>{`
        @keyframes fogMove {
          0% { background-position: 50% 50%; filter: blur(0.5px); }
          40% { background-position: 55% 48%; filter: blur(1.5px); }
          60% { background-position: 45% 52%; filter: blur(1.2px); }
          100% { background-position: 50% 50%; filter: blur(0.5px); }
        }
        .banner-title {
          opacity: 0;
          animation: bannerTitleFade 1.6s 0.5s forwards;
        }
        @keyframes bannerTitleFade { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .devil-glow {
          color: #fffbe6;
          text-shadow: 0 0 18px #7f00ff, 0 0 32px #ffd700, 0 0 48px #7f00ff;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .banner-tagline {
          opacity: 0;
          animation: textFadeIn 1.2s 2.2s forwards;
        }
        @keyframes textFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

        {/* Cinematic Banner and Tagline */}
        {/* Top Tagline Quote */}
        <div style={{ width: "100vw", background: "#101014", paddingTop: 32, paddingBottom: 0, textAlign: "center" }}>
          <div style={{ maxWidth: 800, margin: "0 auto 18px auto", color: "#ffd700", fontFamily: "'Playfair Display', serif", fontSize: "1.25em", fontStyle: "italic", fontWeight: 600, letterSpacing: 0.5, textShadow: "0 2px 8px #000a" }}>
            “Where Curiosity Leads, Stories Follow”<br/>
            <span style={{ fontSize: "0.95em", color: "#ffe9a6" }}>- Tess D.</span>
          </div>
        </div>
        <section style={{ background: "#101014", minHeight: "100vh", padding: "0 0 64px 0" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 48 }}>


            {/* Removed duplicate bottom Wallpaper/Graphics Shop section as requested */}

          </div>
        </section>

        {/* Modal for service details/pricing/booking/gallery */}
        {modal.open && isValidServiceKey(modal.service) && isValidModalType(modal.type) && (() => {
          const service = modal.service;
          const type = modal.type;
          let modalContent: React.ReactNode = <p>Content not found.</p>;
          if (service === "cinematicPhotography") {
            if (type === "details") {
              modalContent = <>
                <h3>{content.cinematicPhotography.title}</h3>
                <p>{content.cinematicPhotography.intro}</p>
                <strong>How it works:</strong>
                <ul>{content.cinematicPhotography.howItWorks.map((item, i) => <li key={i}>{item}</li>)}</ul>
                <strong>What you get:</strong>
                <p>{content.cinematicPhotography.whatYouGet}</p>
              </>;
            }
          } else if (service === "worldBuilding") {
            if (type === "details") {
              modalContent = <>
                <h3>{content.worldBuilding.title}</h3>
                <p>{content.worldBuilding.intro}</p>
                <strong>Services include:</strong>
                <ul>{content.worldBuilding.services.map((item, i) => <li key={i}>{item}</li>)}</ul>
                <strong>Why it matters:</strong>
                <p>{content.worldBuilding.whyItMatters}</p>
              </>;
            }
          } else if (service === "creativeDirection") {
            if (type === "details") {
              modalContent = <>
                <h3>{content.creativeDirection.title}</h3>
                <p>{content.creativeDirection.intro}</p>
                <strong>What I offer:</strong>
                <ul>{content.creativeDirection.whatIOffer.map((item, i) => <li key={i}>{item}</li>)}</ul>
                <strong>Why work with me?</strong>
                <p>{content.creativeDirection.whyWorkWithMe}</p>
              </>;
            }
          }
          return (
            <div className="service-modal" style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10012, position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)" }}>
              <div className="modal-content" style={{ maxWidth: 400, textAlign: "center", background: "#fff", borderRadius: 12, padding: 24, position: "relative" }}>
                <span className="close-modal" onClick={closeModal} style={{ position: "absolute", top: 12, right: 18, fontSize: 28, cursor: "pointer" }}>&times;</span>
                {modalContent}
              </div>
            </div>
          );
        })()}

        {/* FAQ and AccordionSection removed as requested */}

        {/* Footer */}
        <footer style={{ width: "100%", background: "#222", color: "#ffd700", padding: "32px 0 24px 0", marginTop: 48, textAlign: "center", fontFamily: "'Montserrat',sans-serif" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
              <a href="https://www.instagram.com/tessdevillier" target="_blank" title="Instagram" style={footerLinkStyleIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle" }}><rect x="2" y="2" width="20" height="20" rx="5" stroke="#ffd700" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="5" stroke="#ffd700" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.5" fill="#ffd700"/></svg>
              </a>
              <a href="https://www.tiktok.com/@tessdevillier" target="_blank" title="TikTok" style={footerLinkStyleIcon}>
                <svg width="24" height="24" viewBox="0 0 48 48" fill="currentColor" style={{ verticalAlign: "middle" }}><path d="M41.5 15.5c-3.6 0-6.5-2.9-6.5-6.5h-5v24.1c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.7 0 1.4.2 2 .5v-5.2c-.7-.1-1.3-.2-2-.2-5 0-9 4-9 9s4 9 9 9 9-4 9-9V21.2c2 1.1 4.3 1.8 6.5 1.8v-7.5z"/></svg>
              </a>
              <a href="https://twitch.tv/thats_soo_buttons" target="_blank" title="Twitch" style={footerLinkStyleIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle" }}><path d="M4 2l-2 4v14h6v2h4v-2h4l4-4V2H4zm16 12l-2 2h-4v2h-2v-2H6V4h14v10z" stroke="#ffd700" strokeWidth="2" fill="none"/></svg>
              </a>
              <a href="https://ko-fi.com/thatssoobuttons/shop" target="_blank" title="Shop" style={{ background: "#ffd700", color: "#222", fontWeight: "bold", padding: "6px 18px", borderRadius: 8, marginLeft: 12, textDecoration: "none", transition: "background 0.2s, color 0.2s" }}>SHOP</a>
              <button
                onClick={openContact}
                style={{
                  background: '#ffd700',
                  color: '#222',
                  fontWeight: 800,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1.08em',
                  padding: '8px 22px',
                  borderRadius: 8,
                  border: 'none',
                  margin: '0 8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #0003',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                FAQ / Contact
              </button>
              <span style={{ fontSize: "0.95em", color: "#cfcfcf", marginLeft: 10 }}>✈️ 🧳 FLY ME OUT</span>
            </div>
          </div>
          <div style={{ marginTop: 18, fontSize: "0.95em", color: "#ffd700a0" }}>
            {content.footer.copyright}
          </div>
        </footer>
      </main>
    </>
  );
}

