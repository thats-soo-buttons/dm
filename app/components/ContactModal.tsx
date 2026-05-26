"use client";
import React, { useState } from "react";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.7)",
      zIndex: 30000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#18191c",
        color: "#ffd700",
        borderRadius: 16,
        boxShadow: "0 2px 32px #000a",
        padding: 32,
        minWidth: 320,
        maxWidth: 420,
        position: "relative",
        textAlign: "center"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 18, background: "none", border: "none", color: "#ffd700", fontSize: "2em", cursor: "pointer" }}>&times;</button>
        <h2 style={{ color: "#ffd700", marginBottom: 18 }}>Contact</h2>
        <form style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input type="text" placeholder="Your Name" style={{ padding: 10, borderRadius: 8, border: "1px solid #ffd70055", background: "#222", color: "#ffd700" }} />
          <input type="email" placeholder="Your Email" style={{ padding: 10, borderRadius: 8, border: "1px solid #ffd70055", background: "#222", color: "#ffd700" }} />
          <textarea placeholder="Your Message" rows={4} style={{ padding: 10, borderRadius: 8, border: "1px solid #ffd70055", background: "#222", color: "#ffd700" }} />
          <button type="submit" style={{ background: "#ffd700", color: "#222", fontWeight: 700, border: "none", borderRadius: 8, padding: "12px 0", marginTop: 8, cursor: "pointer" }}>Send</button>
        </form>
      </div>
    </div>
  );
}
