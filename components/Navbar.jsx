"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar({ alwaysVisible = false }) {
  const [scrolled, setScrolled] = useState(alwaysVisible);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isContactLink = pathname === "/events" || pathname === "/brands";
  
  useEffect(() => {
    if (alwaysVisible) return;
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [alwaysVisible]);
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link href="/" className="navLogo">The <span>Green</span> Room</Link>
      <div className={`navLinks ${open ? "open" : ""}`}>
        <Link href="/events" onClick={() => setOpen(false)}>Événements</Link>
        <Link href="/brands" onClick={() => setOpen(false)}>Marques</Link>
        {isContactLink ? (
          <Link href="/#contact" onClick={() => setOpen(false)}>Contact</Link>
        ) : (
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        )}
      </div>
      <button className="navBurger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
