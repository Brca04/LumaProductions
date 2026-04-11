"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MaturalneCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white text-center"
      style={{ padding: 'clamp(4rem, 10vw, 6rem) 1.5rem' }}
    >
      <div className="max-w-2xl mx-auto px-2">
        <h3
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: "clamp(2.8rem, 10vw, 4.5rem)",
            lineHeight: 0.9,
            letterSpacing: "0.01em",
            color: "#111",
            marginBottom: "0.8rem",
          }}
        >
          Rezervirajte<br />
          <span style={{ color: "#BE9E5C" }}>Svoj Termin</span>
        </h3>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-px mx-auto mb-6"
          style={{ backgroundColor: "#BE9E5C" }}
        />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
            color: "rgba(0,0,0,0.45)",
            lineHeight: 1.9,
            fontWeight: 300,
            marginBottom: "2.5rem",
          }}
        >
          Kontaktirajte nas i osigurajte nezaboravnu dokumentaciju vaše maturalne večeri.
        </p>
        <Link
          href="/kontakt"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "52px",
            padding: "0 2.5rem",
            border: "1.5px solid #111",
            color: "#111",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.25s, color 0.25s",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#111";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#111";
          }}
        >
          Kontaktirajte nas
        </Link>
      </div>
    </motion.section>
  );
}
