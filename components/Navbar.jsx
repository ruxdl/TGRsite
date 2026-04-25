"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link href="/" className="navLogo">The <span>Green</span> Room</Link>
      <div className={`navLinks ${open ? "open" : ""}`}>
        {[["#about","À Propos"],["#collections","Collections"],["#evenements","Événements"],["#marques","Marques"],["#contact","Contact"]].map(([h,l]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>
        ))}
      </div>
      <button className="navBurger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
