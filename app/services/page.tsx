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


export default function ServicesPage() {
          // Render MenuDropdown only on /services page
          return (
            <>
              <MenuDropdown />
              {/* ...existing code... */}
            </>
          );
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
      {/* Wearing of the Green Announcement Banner */}
      <div style={{
        width: "100vw",
        background: "#ffd700",
        color: "#181c1f",
        textAlign: "center",
        fontWeight: 600,
        fontSize: "1.15em",
        padding: "14px 0",
        boxShadow: "0 2px 8px #0002",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}>
        <span style={{ fontSize: "1.5em" }}>🍀</span>
        <span style={{ fontWeight: 700 }}>
          WEARING OF THE GREEN PHOTOS AVAILABLE SOON -
          <a href="https://galleries.devilliermedia.com" target="_blank" rel="noopener noreferrer" style={{ color: "#181c1f", textDecoration: "underline", fontWeight: 700, marginLeft: "8px" }}>
            HERE
          </a>
        </span>
      </div>
      {showMenu && <MenuDropdown />}
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
        <section style={{ background: "#101014", minHeight: "100vh", padding: "0 0 64px 0" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 48 }}>
            <blockquote style={{ color: "#bfc1c2", fontSize: "1.5em", fontStyle: "italic", borderLeft: "4px solid #ffd700", marginBottom: 32, paddingLeft: 18 }}>
              “Where Curiosity Leads, Stories Follow”
            </blockquote>
            {/* Gallery Showcase */}
            <div style={{ marginBottom: 44 }}>
              <h2 style={{ color: "#ffd700", fontFamily: "'Cinzel', serif", fontSize: "2em", fontWeight: 800, marginBottom: 28, letterSpacing: 1 }}>Featured Work</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                {/* Cinematic Photography */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480 }}>
                  <img src="/photos/imported/ColoringClub211.jpg" alt="Gallery Sample 2" style={{ width: "100%", display: "block", filter: "grayscale(0.2)", borderRadius: "10px 10px 0 0" }} />
                  <div style={{ padding: "16px 18px" }}>Event Photos: Every Guest a Star</div>
                </div>
                {/* Digital Archiving */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480 }}>
                  <img src="/photos/imported/Untitled-14.jpg" alt="Gallery Sample 1" style={{ width: "100%", display: "block", filter: "grayscale(0.2)", borderRadius: "10px 10px 0 0" }} />
                  <div style={{ padding: "16px 18px" }}>A memory you can hold onto—matching tattoos, a moment preserved for a lifetime.</div>
                </div>
                {/* World Building */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480 }}>
                  <img src="/photos/imported/_1270500.jpg" alt="Gallery Sample 3" style={{ width: "100%", display: "block", filter: "grayscale(0.2)", borderRadius: "10px 10px 0 0" }} />
                  <div style={{ padding: "16px 18px" }}>By the looks of the ruins, you start to question your trust in the old man's direction.<br /><span style={{ color: "#ffd700" }}>– World Building</span></div>
                </div>
                {/* Consulting (World Building collage) */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center", alignItems: "center" }}>
                    <img src="/photos/imported/ruin%20landscape%201.jpg" alt="Ruin Landscape 1" style={{ width: "80%", display: "block", filter: "grayscale(0.2)", borderRadius: "8px 8px 0 0" }} />
                    <img src="/photos/imported/ruin%20landscape%202.jpg" alt="Ruin Landscape 2" style={{ width: "80%", display: "block", filter: "grayscale(0.2)", borderRadius: "0 0 8px 8px" }} />
                  </div>
                  <div style={{ padding: "16px 18px" }}>Before: a forgotten ruin. After: a world reborn.<br /><span style={{ color: "#ffd700" }}>– World Building</span></div>
                </div>
              </div>
            </div>

            {/* Shop Wallpaper/Graphics Section */}
            <div style={{ margin: '48px auto', maxWidth: 700, background: 'rgba(24,25,28,0.92)', borderRadius: 16, boxShadow: '0 2px 16px #000a', border: '1.5px solid #ffd700', padding: '36px 28px', textAlign: 'center' }}>
              <h2 style={{ color: '#ffd700', fontFamily: "'Cinzel', serif", fontSize: '2em', fontWeight: 800, marginBottom: 18, letterSpacing: 1 }}>Shop Wallpaper / Graphics</h2>
              <p style={{ color: '#fffbe6', fontSize: '1.15em', marginBottom: 18 }}>Browse, donate, or pay-to-download exclusive wallpapers and graphics.</p>
              <a href="https://ko-fi.com/thatssoobuttons/shop" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#ffd700', color: '#18191c', fontWeight: 800, fontSize: '1.2em', padding: '16px 38px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 2px 12px #0007', letterSpacing: 1, border: 'none', fontFamily: "'Montserrat', sans-serif", marginTop: 8 }}>Visit Ko-fi Shop</a>
            </div>
            {/* Call to Action */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <a href="#services-section" style={{ display: "inline-block", background: "#ffd700", color: "#18191c", fontWeight: 800, fontSize: "1.2em", padding: "16px 38px", borderRadius: 12, textDecoration: "none", boxShadow: "0 2px 12px #0007", letterSpacing: 1, border: "none", fontFamily: "'Montserrat', sans-serif" }}>Work With Me</a>
            </div>
            {/* Services Section */}
            {/* Urgency Banner */}
            {/* Urgency banner removed */}
            <div id="services-section" style={{ textAlign: "center", margin: "0 auto", paddingTop: 80, position: "relative", zIndex: 10, background: "#101014" }}>
              <h2 style={{ textAlign: "center", color: "#ffd700", fontFamily: "'Cinzel', serif", fontSize: "2em", fontWeight: 800, marginBottom: 28, letterSpacing: 1 }}>Services</h2>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18, marginTop: -10, animation: "textFadeIn 1.2s 0.2s both" }}>
                <span style={{ fontFamily: "'Cinzel', serif", color: "#ffd700", fontSize: "1.1em", letterSpacing: 1.5, fontWeight: 700, marginBottom: 2, textShadow: "0 1px 8px #000a" }}>What I Offer</span>
                <span style={{ color: "#bfa14a", fontSize: "1.5em", marginBottom: 2 }}>—</span>
                <span style={{ color: "#fffbe6", fontFamily: "'Montserrat', sans-serif", fontSize: "1.08em", textAlign: "center", maxWidth: 600, marginBottom: 2, textShadow: "0 1px 8px #000a" }}>Cinematic storytelling, creative vision, and technical expertise—tailored for your project.</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, justifyContent: "center", alignItems: "center", margin: "0 auto", maxWidth: 900 }}>
                {/* Cinematic Photography */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480, position: "relative" }}>
                  <h3 style={{ background: "linear-gradient(92deg, #fffbe6 5%, #e6c36a 20%, #bfa14a 40%, #ffd700 60%, #bfa14a 80%, #fffbe6 95%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Cinzel', serif", fontSize: "1.3em", fontWeight: 700, marginBottom: 10, textShadow: "0 1px 0 #fffbe6, 0 2px 8px #000a" }}>{content.cinematicPhotography.title}</h3>
                  <p><em>{content.cinematicPhotography.intro}</em></p>
                  <strong>How it works:</strong>
                  <ul style={{ textAlign: "left", margin: "10px 0 0 18px" }}>
                    {content.cinematicPhotography.howItWorks.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <br />
                  <strong>What you get:</strong> {content.cinematicPhotography.whatYouGet}<br />
                  <span style={{ display: "block", color: "#ffe9a6", fontSize: "0.97em", marginTop: 14, fontStyle: "italic", opacity: 0.85 }}>
                    Other photography services available. <a href="#" onClick={openPhotoModal} style={{ color: "#ffd700", textDecoration: "underline", fontStyle: "italic" }}>Learn more</a>.
                  </span>
                  {photoModalOpen && (
                    <div style={{ display: "flex", position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(16,16,20,0.92)", zIndex: 20000, alignItems: "center", justifyContent: "center" }}>
                      <div style={{ background: "#18191c", color: "#fffbe6", maxWidth: 420, margin: "40px auto", padding: "32px 28px", borderRadius: 16, boxShadow: "0 2px 32px #000a", position: "relative" }}>
                        <button onClick={closePhotoModal} style={{ position: "absolute", top: 12, right: 18, background: "none", border: "none", color: "#ffd700", fontSize: "1.5em", cursor: "pointer" }}>&times;</button>
                        <h3 style={{ color: "#ffd700", marginTop: 0 }}>Other Photography Services</h3>
                        <p style={{ fontSize: "1em", color: "#ffe9a6", fontStyle: "italic", marginBottom: 14 }}>
                          <strong>Note:</strong> The $100 Early Bird rate applies to Portrait sessions only.
                        </p>
                        <p style={{ fontSize: "1em" }}>
                          Regular photography (portraits, maternity, birthdays, graduation, etc.) features natural lighting and light edits.<br />
                          Cinematic Photography includes extensive graphic design and Photoshop work for a dramatic, story-driven result.<br />
                          For custom rates on regular photography, please inquire.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* World-Building Consulting Service Card */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480, position: "relative" }}>
                  <h3 style={{ background: "linear-gradient(92deg, #fffbe6 5%, #e6c36a 20%, #bfa14a 40%, #ffd700 60%, #bfa14a 80%, #fffbe6 95%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Cinzel', serif", fontSize: "1.3em", fontWeight: 700, marginBottom: 10, textShadow: "0 1px 0 #fffbe6, 0 2px 8px #000a" }}>{content.worldBuilding.title}</h3>
                  <p><strong>{content.worldBuilding.intro}</strong></p>
                  <strong>Services include:</strong>
                  <ul style={{ textAlign: "left", margin: "10px 0 0 18px" }}>
                    {content.worldBuilding.services.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <br />
                  <strong>Why it matters:</strong> {content.worldBuilding.whyItMatters}
                </div>
                {/* Creative Direction Assistance Service Card */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480, position: "relative" }}>
                  <h3 style={{ background: "linear-gradient(92deg, #fffbe6 5%, #e6c36a 20%, #bfa14a 40%, #ffd700 60%, #bfa14a 80%, #fffbe6 95%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Cinzel', serif", fontSize: "1.3em", fontWeight: 700, marginBottom: 10, textShadow: "0 1px 0 #fffbe6, 0 2px 8px #000a" }}>{content.creativeDirection.title}</h3>
                  <p><strong>{content.creativeDirection.intro}</strong></p>
                  <strong>What I offer:</strong>
                  <ul style={{ textAlign: "left", margin: "10px 0 0 18px" }}>
                    {content.creativeDirection.whatIOffer.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <br />
                  <strong>Why work with me?</strong> {content.creativeDirection.whyWorkWithMe}
                </div>
                {/* Current Projects Card */}
                <div style={{ background: "rgba(24, 25, 28, 0.82)", borderRadius: 16, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "36px 28px", minHeight: 480, position: "relative" }}>
                  <h3 style={{ background: "linear-gradient(92deg, #fffbe6 5%, #e6c36a 20%, #bfa14a 40%, #ffd700 60%, #bfa14a 80%, #fffbe6 95%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Cinzel', serif", fontSize: "1.3em", fontWeight: 700, marginBottom: 10, textShadow: "0 1px 0 #fffbe6, 0 2px 8px #000a" }}>Current Projects</h3>
                  <div style={{ color: "#ffd700", fontWeight: 600, marginBottom: 8 }}>MORE INFO SOON</div>
                  <ul style={{ textAlign: "left", margin: "10px 0 0 18px", color: "#fffbe6", fontSize: "1.08em" }}>
                    <li><a href="#" style={{ color: "#ffd700", textDecoration: "underline" }}>Xyzthians Lore</a></li>
                    <li><a href="#" style={{ color: "#ffd700", textDecoration: "underline" }}>Wayward Bound</a></li>
                    <li><a href="#" style={{ color: "#ffd700", textDecoration: "underline" }}>MIRACLE in Blackmill, VA</a></li>
                    <li><a href="#" style={{ color: "#ffd700", textDecoration: "underline" }}>TIGIDB</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Testimonials Section */}
            <section style={{ margin: "64px auto 32px auto", maxWidth: 900, textAlign: "center" }}>
              <h2 style={{ color: "#ffd700", fontFamily: "'Cinzel', serif", fontSize: "2em", fontWeight: 800, marginBottom: 28, letterSpacing: 1 }}>Testimonials</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", alignItems: "stretch" }}>
                <div style={{ background: "rgba(24, 25, 28, 0.97)", borderRadius: 14, boxShadow: "0 2px 16px #000a, 0 0px 0px 1.5px #bfa14a inset", border: "1.5px solid #bfa14a", padding: "32px 28px", maxWidth: 320, minWidth: 240, marginBottom: 12, textAlign: "left" }}>
                  <p style={{ color: "#fffbe6", fontSize: "1.08em", fontStyle: "italic", marginBottom: 18 }}>Be one of the first to leave a testimonial!<br /><span style={{ fontSize: "0.95em", color: "#ffd700" }}>Your feedback could be featured here.</span></p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Modal for service details/pricing/booking/gallery */}
        {modal.open && modal.service && modal.type && (
          <div className="service-modal" style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10012, position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-content" style={{ maxWidth: 400, textAlign: "center", background: "#fff", borderRadius: 12, padding: 24, position: "relative" }}>
              <span className="close-modal" onClick={closeModal} style={{ position: "absolute", top: 12, right: 18, fontSize: 28, cursor: "pointer" }}>&times;</span>
              {modal.service && modal.service in content && modal.type in (content[modal.service as ServiceKey] || {})
                ? (content[modal.service as ServiceKey] as any)[modal.type]
                : <p>Content not found.</p>}
            </div>
          </div>
        )}

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
                onClick={() => window.openContactForm && window.openContactForm()}
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

