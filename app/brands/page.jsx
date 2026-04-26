"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FadeIn from "../../components/FadeIn";
import Navbar from "../../components/Navbar";
import EventsBanner from "../../components/EventsBanner";
import Footer from "../../components/Footer";
import Link from "next/link";

const BRAND_COLORS = [
  "#4A8C6E",
  "#2D5C47",
  "#C8503A",
  "#1C3829",
  "#3a6e8a",
  "#5A4A8C",
  "#8C6E4A",
  "#6E8C4A",
];

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("brands")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setBrands(data || []);
        setLoading(false);
      });
  }, []);

  // Séparer featured et autres
  const featuredBrands = brands.filter(b => b.featured);
  const otherBrands = brands.filter(b => !b.featured);
  const allBrands = brands;

  return (
    <>
      <Navbar alwaysVisible={true} />
      <EventsBanner />
      <main style={{ minHeight: "100vh", background: "var(--bg-base)", paddingTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <FadeIn>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(38px,5vw,56px)", color: "var(--green-deep)", marginBottom: 10 }}>
            Toutes nos <em>marques</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-mid)", marginBottom: 50 }}>
            Découvrez l'intégralité de nos partenaires
          </p>
        </FadeIn>

        {loading ? (
          <div className="spinnerWrap" style={{ marginTop: 100 }}>
            <div className="spinner" />
          </div>
        ) : brands.length === 0 ? (
          <div className="eventsEmpty" style={{ marginTop: 100 }}>
            Aucune marque disponible
          </div>
        ) : (
          <>
            <div className="collectionsGrid" style={{ marginBottom: 50 }}>
              {allBrands.map((brand, i) => (
                <FadeIn key={brand.id}>
                  <div className="collCard">
                    <div className="collCardInner">
                      {brand.image_url ? (
                        <img src={brand.image_url} alt={brand.name} style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0
                        }} />
                      ) : (
                        <div className="collOverlay" style={{ background: `linear-gradient(135deg, ${BRAND_COLORS[i % BRAND_COLORS.length]}cc, ${BRAND_COLORS[i % BRAND_COLORS.length]}55)` }} />
                      )}
                      <div className="collGradient" />
                      <div className="collContent">
                        <div className="collTag">{brand.category}</div>
                        <div className="collTitle">{brand.name}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Bouton retour au site */}
            <div style={{ textAlign: "center", marginTop: 60, paddingBottom: 40 }}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "none",
                    border: "1px solid var(--green-mid)",
                    color: "var(--green-mid)",
                    padding: "10px 24px",
                    borderRadius: 4,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  ← Retour au site
                </button>
              </Link>
            </div>
          </>
        )}
        </div>
      </main>
      <Footer />
    </>
  );
}
