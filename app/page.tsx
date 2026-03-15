
"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import MenuDropdown from "./components/MenuDropdown";


export default function Home() {
    // Banner visibility logic
    const [showBanner, setShowBanner] = useState(true);
    useEffect(() => {
      const now = new Date();
      const hideDate = new Date('2026-04-15T00:00:00');
      if (now >= hideDate) setShowBanner(false);
    }, []);
  const [showOpener, setShowOpener] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [showBranding, setShowBranding] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      {showBanner && showBranding && (
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
      )}
      {showBranding && <MenuDropdown />}
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
          <div>Our specialty is ideas.</div>
          <div>They come to us easily, so why not have an ideas team on your side to take the weight off your shoulders?</div>
        </div>
      </section>

      {/* Hero Section with Video */}
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
        <div
          className={styles.branding}
          style={{
            opacity: showBranding ? 1 : 0,
            pointerEvents: showBranding ? "auto" : "none",
            transition: "opacity 1.5s",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          id="branding"
        >
          <h1 style={{ fontSize: "3rem", letterSpacing: "0.1em", margin: 0, color: "#fff", textShadow: "0 0 8px #000, 0 0 24px #000, 2px 2px 24px #000, 0 0 12px #fff1", filter: "drop-shadow(0 0 12px #000)" }}>DEVILLIER MEDIA</h1>
          <p style={{ fontSize: "1.5rem", margin: "1rem 0 0 0", color: "#eaeaea", textShadow: "0 0 8px #000, 0 0 24px #000, 2px 2px 24px #000, 0 0 12px #fff1", filter: "drop-shadow(0 0 12px #000)" }}>Where Curiosity Leads, Stories Follow</p>
        </div>
      </section>
    </main>
  );
}
