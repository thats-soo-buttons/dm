
"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import MenuDropdown from "./components/MenuDropdown";


export default function Home() {
  // State variables (must be declared first)
  const [showOpener, setShowOpener] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [showBrandingText, setShowBrandingText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showBranding, setShowBranding] = useState(false);
  const [openerIdx, setOpenerIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Opener quotes
  const openerQuotes = [
    {
      text: "There is no greater agony than bearing an untold story inside you.",
      author: "Maya Angelou"
    },
    {
      text: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.",
      author: "Albert Einstein"
    }
  ];
  useEffect(() => {
    if (showOpener) {
      const quoteTimer = setTimeout(() => {
        setOpenerIdx((i) => (i + 1) % openerQuotes.length);
      }, openerIdx === 1 ? 6000 : 4000); // Einstein: 6s, Angelou: 4s
      return () => clearTimeout(quoteTimer);
    }
  }, [showOpener, openerIdx]);
  // Banner visibility logic
  useEffect(() => {
    const now = new Date();
    const hideDate = new Date('2026-04-15T00:00:00');
    if (now >= hideDate) setShowBanner(false);
  }, []);

  // Opener: show for 8s, then fade out and show hero
  useEffect(() => {
    const openerTimer = setTimeout(() => {
      setShowOpener(false);
      setTimeout(() => setShowHero(true), 1500); // match fade duration
    }, 8000);
    return () => clearTimeout(openerTimer);
  }, []);

  // Branding: show after video ends
  useEffect(() => {
    if (showHero && videoRef.current) {
      videoRef.current.play();
      // Show branding text after 6.5s (1s later)
      const brandingTimer = setTimeout(() => setShowBrandingText(true), 6500);
      // Show tagline after 8s (2s later)
      const taglineTimer = setTimeout(() => setShowTagline(true), 8000);
      return () => {
        clearTimeout(brandingTimer);
        clearTimeout(taglineTimer);
      };
    }
  }, [showHero]);

  // After video ends, redirect to /services
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      setShowBranding(true);
      window.location.href = "/services";
    };
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [showHero]);

  return (
    <main style={{ minHeight: "100vh", width: "100vw", overflow: "hidden", background: "linear-gradient(120deg, #111 80%, #232323 100%)" }}>
      {/* MenuDropdown is not rendered on homepage. It will appear only on /services. */}
      {/* Opener Splash */}
      <section
        className={styles.openerScreen}
        style={{
          opacity: showOpener ? 1 : 0,
          pointerEvents: showOpener ? "auto" : "none",
          transition: "opacity 1.5s",
          zIndex: 10000,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: showOpener ? "flex" : "none",
        }}
        aria-label="Introductory Message"
      >
        <div className={styles.openerLines}>
          <div style={{ fontStyle: "italic", fontSize: "1.25em", color: "#fffbe6" }}>
            "{openerQuotes[openerIdx].text}"
          </div>
          <div style={{ marginTop: 12, color: "#ffd700", fontSize: "1em" }}>
            — {openerQuotes[openerIdx].author}
          </div>
        </div>
      </section>

      {/* Hero Section with Video and Branding Overlay */}
      <section
        className={styles.hero}
        style={{
          opacity: showHero ? 1 : 0,
          pointerEvents: showHero ? "auto" : "none",
          transition: "opacity 1.5s",
          zIndex: 10000,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: showHero ? "flex" : "none",
        }}
        aria-label="Branding and Video"
      >
        <video
          className={styles.heroBgVideo}
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          style={{
            opacity: showHero ? 0.45 : 0,
            transition: "opacity 1.5s",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: "none",
            filter: "grayscale(1) contrast(1.18) brightness(0.6) blur(1.2px)",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.45) inset",
          }}
          src="/library.mp4"
        >
          Your browser does not support the video tag or the video format.
        </video>
        {/* Branding overlay always visible during video playback */}
        {showHero && (
          <div
            className={styles.branding}
            style={{
              opacity: 1,
              pointerEvents: "auto",
              transition: "opacity 1.5s",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            id="branding"
          >
            {showBrandingText && (
              <h1 style={{ fontSize: "3rem", letterSpacing: "0.1em", margin: 0, color: "#fffbe6", textShadow: "0 0 8px #000, 0 0 24px #000, 2px 2px 24px #000, 0 0 12px #fff1", filter: "drop-shadow(0 0 12px #000)" }}>Devillier Media</h1>
            )}
            {showTagline && (
              <div style={{ fontSize: "1.3em", color: "#ffd700", marginTop: 18, textShadow: "0 2px 8px #000a", fontStyle: "italic", transition: "opacity 1.5s" }}>
                “Where Curiosity Leads, Stories Follow”
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
