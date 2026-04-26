"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import FadeIn from "./FadeIn";
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

export default function Collections() {
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

  if (loading) return null;
  
  // Séparer les marques featured des autres
  const featuredBrands = brands.filter(b => b.featured);
  const otherBrands = brands.filter(b => !b.featured);
  
  if (featuredBrands.length === 0) return null;

  return (
    <section className="collections" id="collections">
      <FadeIn>
        <div className="collectionsHeader">
          <div>
            <div className="sectionLabel collLabelLight">Nos partenaires</div>
            <h2>Nos<br /><em>Marques</em></h2>
          </div>
          <p>Les marques que nous sélectionnons avec soin pour vous offrir qualité et style.</p>
        </div>
      </FadeIn>

      <div className="collectionsGrid">
        {featuredBrands.map((brand, i) => (
          <div className="collCard" key={brand.id}>
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
                <div className="collArrow">
                  Découvrir{" "}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12, display: "inline-block" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {otherBrands.length > 0 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/brands" style={{ textDecoration: "none" }}>
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
              Voir les {otherBrands.length} autres marques →
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
