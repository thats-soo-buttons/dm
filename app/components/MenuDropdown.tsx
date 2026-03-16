"use client";
import React, { useState, useRef, useEffect } from "react";


const menuLinks = [
  { label: "TessDevillier.com", url: "https://www.tessdevillier.com" },
  { label: "Thatssoobuttons.com", url: "https://thatssoobuttons.com" },
  { label: "OnTheFlyNetwork.com", url: "https://ontheflynetwork.com" },
  { label: "Gallery", url: "https://galleries.devilliermedia.com" },
  { label: "Portfolio", url: "/portfolio" },
];

export default function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} style={{ position: "fixed", top: 24, right: 32, zIndex: 20000 }}>
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "#181c1f",
          color: "#ffd700",
          border: "2px solid #ffd70066",
          borderRadius: 8,
          padding: "12px 18px",
          fontWeight: 700,
          fontSize: 20,
          cursor: "pointer",
          boxShadow: open ? "0 4px 24px #000a" : "0 2px 8px #0006",
          transition: "box-shadow 0.18s, background 0.18s",
        }}
      >
        ☰ Menu
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 0,
            background: "#222",
            borderRadius: 12,
            boxShadow: "0 8px 32px #000c",
            minWidth: 220,
            padding: "18px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            border: "2px solid #ffd70033",
          }}
        >
          {menuLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                color: "#ffd700",
                fontWeight: 600,
                fontSize: 18,
                textDecoration: "none",
                padding: "12px 28px",
                borderBottom: "1px solid #ffd70022",
                transition: "background 0.15s, color 0.15s",
                background: "none",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "#181c1f")}
              onMouseOut={e => (e.currentTarget.style.background = "none")}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).openContactForm) {
                (window as any).openContactForm();
              }
            }}
            style={{
              color: "#ffd700",
              fontWeight: 600,
              fontSize: 18,
              textDecoration: "none",
              padding: "12px 28px",
              border: "none",
              background: "none",
              textAlign: "left",
              cursor: "pointer",
              borderBottom: "1px solid #ffd70022",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#181c1f")}
            onMouseOut={e => (e.currentTarget.style.background = "none")}
          >
            Contact
          </button>
        </div>
      )}
    </div>
  );
}