"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FadeIn from "../../components/FadeIn";
import Navbar from "../../components/Navbar";
import EventsBanner from "../../components/EventsBanner";
import Footer from "../../components/Footer";
import Link from "next/link";

const MONTHS_SHORT = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const MONTHS_LONG  = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

function parseDate(str) {
  return new Date(str + "T00:00:00");
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("event_date")
      .then(({ data }) => {
        setEvents(data || []);
        setLoading(false);
      });
  }, []);

  const typeColors = {
    Concert:  "#2D5C47",
    Soirée:   "#C8503A",
    Atelier:  "#3a6e8a",
    Marché:   "#8a6e3a",
    Autre:    "#4A4A43",
  };

  // Séparer les événements passés et futurs
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter(e => e.event_date >= today);
  const pastEvents = events.filter(e => e.event_date < today);

  return (
    <>
      <Navbar alwaysVisible={true} />
      <EventsBanner />
      <main style={{ minHeight: "100vh", background: "var(--bg-base)", paddingTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <FadeIn>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(38px,5vw,56px)", color: "var(--green-deep)", marginBottom: 10 }}>
            Tous nos <em>événements</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-mid)", marginBottom: 50 }}>
            Découvrez l'intégralité de notre calendrier
          </p>
        </FadeIn>

        {loading ? (
          <div className="spinnerWrap" style={{ marginTop: 100 }}>
            <div className="spinner" />
          </div>
        ) : events.length === 0 ? (
          <div className="eventsEmpty" style={{ marginTop: 100 }}>
            Aucun événement prévu pour le moment
          </div>
        ) : (
          <>
            {/* Événements à venir */}
            {upcomingEvents.length > 0 && (
              <section style={{ marginBottom: 60 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, color: "var(--green-deep)", marginBottom: 30, display: "flex", alignItems: "center", gap: 10 }}>
                  📅 À venir ({upcomingEvents.length})
                </h2>
                <div style={{ display: "grid", gap: 20 }}>
                  {upcomingEvents.map((ev) => {
                    const d = parseDate(ev.event_date);
                    return (
                      <FadeIn key={ev.id}>
                        <div style={{
                          border: "1px solid var(--green-light)",
                          borderRadius: 8,
                          overflow: "hidden",
                          background: "var(--bg-light)"
                        }}>
                          {ev.image_url && (
                            <div style={{
                              width: "100%",
                              height: 200,
                              overflow: "hidden",
                              background: "#e0e0e0"
                            }}>
                              <img src={ev.image_url} alt={ev.title} style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                              }} />
                            </div>
                          )}
                          <div style={{
                            padding: 24,
                            display: "grid",
                            gridTemplateColumns: "120px 1fr",
                            gap: 24,
                            alignItems: "start"
                          }}>
                            <div style={{ textAlign: "center" }}>
                              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--green-deep)" }}>
                                {d.getDate()}
                              </div>
                              <div style={{ fontSize: 14, color: "var(--text-mid)", marginTop: 4 }}>
                                {MONTHS_SHORT[d.getMonth()]}
                              </div>
                              <div style={{ fontSize: 12, color: "var(--text-light)", marginTop: 2 }}>
                                {d.getFullYear()}
                              </div>
                            </div>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                <span
                                  style={{
                                    background: typeColors[ev.type] || typeColors.Autre,
                                    color: "white",
                                    padding: "4px 8px",
                                    borderRadius: 3,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    textTransform: "uppercase"
                                  }}
                                >
                                  {ev.type}
                                </span>
                              </div>
                              <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-dark)", marginBottom: 8 }}>
                                {ev.title}
                              </h3>
                              {ev.event_time && (
                                <div style={{ fontSize: 14, color: "var(--text-mid)", marginBottom: 8 }}>
                                  🕐 {ev.event_time}
                                </div>
                              )}
                              {ev.description && (
                                <p style={{ fontSize: 14, color: "var(--text-mid)" }}>
                                  {ev.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Événements passés */}
            {pastEvents.length > 0 && (
              <section>
                <h2 style={{ fontSize: 24, fontWeight: 600, color: "var(--text-mid)", marginBottom: 30, display: "flex", alignItems: "center", gap: 10, opacity: 0.7 }}>
                  📜 Événements passés ({pastEvents.length})
                </h2>
                <div style={{ display: "grid", gap: 20 }}>
                  {pastEvents.reverse().map((ev) => {
                    const d = parseDate(ev.event_date);
                    return (
                      <FadeIn key={ev.id}>
                        <div style={{
                          border: "1px solid var(--bg-light)",
                          borderRadius: 8,
                          padding: 24,
                          background: "var(--bg-light)",
                          display: "grid",
                          gridTemplateColumns: "120px 1fr",
                          gap: 24,
                          alignItems: "start",
                          opacity: 0.7
                        }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text-light)" }}>
                              {d.getDate()}
                            </div>
                            <div style={{ fontSize: 14, color: "var(--text-light)", marginTop: 4 }}>
                              {MONTHS_SHORT[d.getMonth()]}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--text-light)", marginTop: 2 }}>
                              {d.getFullYear()}
                            </div>
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                              <span
                                style={{
                                  background: typeColors[ev.type] || typeColors.Autre,
                                  color: "white",
                                  padding: "4px 8px",
                                  borderRadius: 3,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  textTransform: "uppercase"
                                }}
                              >
                                {ev.type}
                              </span>
                            </div>
                            <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-mid)", marginBottom: 8 }}>
                              {ev.title}
                            </h3>
                            {ev.event_time && (
                              <div style={{ fontSize: 14, color: "var(--text-light)", marginBottom: 8 }}>
                                🕐 {ev.event_time}
                              </div>
                            )}
                            {ev.description && (
                              <p style={{ fontSize: 14, color: "var(--text-light)" }}>
                                {ev.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

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
        </div>
      </main>
      <Footer />
    </>
  );
}
