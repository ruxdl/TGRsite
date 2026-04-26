"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import FadeIn from "./FadeIn";
import Link from "next/link";

const MONTHS_SHORT = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

function parseDate(str) {
  return new Date(str + "T00:00:00");
}

export default function EventsSection() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState({ before: [], current: [], after: [] });

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("event_date")
      .then(({ data }) => {
        setEvents(data || []);
        
        if (data && data.length > 0) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          let beforeDate = null;
          let afterDate = null;
          const currentEvents = [];
          const beforeEvents = [];
          const afterEvents = [];

          // Trouver les dates les plus proches
          for (const ev of data) {
            const evDate = parseDate(ev.event_date);
            
            if (evDate.toDateString() === today.toDateString()) {
              currentEvents.push(ev);
            } else if (evDate < today) {
              if (!beforeDate || parseDate(beforeDate).toDateString() === evDate.toDateString()) {
                beforeDate = ev.event_date;
                beforeEvents.push(ev);
              }
            } else if (evDate > today) {
              if (!afterDate || parseDate(afterDate).toDateString() === evDate.toDateString()) {
                afterDate = ev.event_date;
                afterEvents.length = 0;
                afterEvents.push(ev);
              } else if (afterDate && parseDate(afterDate).toDateString() === evDate.toDateString()) {
                afterEvents.push(ev);
              }
            }
          }

          // Récupérer tous les événements de beforeDate
          if (beforeDate) {
            beforeEvents.length = 0;
            for (const ev of data) {
              if (parseDate(ev.event_date).toDateString() === parseDate(beforeDate).toDateString()) {
                beforeEvents.push(ev);
              }
            }
          }

          setTimelineEvents({ before: beforeEvents, current: currentEvents, after: afterEvents });
        }
        
        setLoading(false);
      });
  }, []);

  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;

  return (
    <section className="eventsSection" id="evenements">
      <FadeIn>
        <div className="sectionLabel">Agenda</div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(38px,4vw,56px)", color: "var(--green-deep)", lineHeight: 1.1 }}>
          Événements &amp; <em>concerts</em>
        </h2>
      </FadeIn>

      {loading ? (
        <div className="spinnerWrap"><div className="spinner" /></div>
      ) : events.length === 0 ? (
        <div className="eventsEmpty">Aucun événement prévu pour le moment. Revenez bientôt !</div>
      ) : (
        <>
          {/* Timeline blanche avec ligne noire et 3 points verts */}
          <div style={{
            background: "#fff",
            borderRadius: 8,
            padding: "60px 40px",
            marginBottom: 50,
            position: "relative"
          }}>
            {/* Ligne noire fine */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 1,
              background: "#333",
              transform: "translateY(-50%)"
            }} />

            {/* Conteneur 3 colonnes */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 20,
              position: "relative",
              zIndex: 1
            }}>
              {/* Point gauche - Événement avant */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "var(--green-mid)",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 0 4px #fff, 0 0 0 5px var(--green-mid)"
                }} />
                {timelineEvents.before && timelineEvents.before.length > 0 ? (
                  <div>
                    <div style={{ fontSize: 12, color: "#666", marginBottom: 8, fontWeight: 500 }}>
                      Dernier événement{timelineEvents.before.length > 1 ? "s" : ""}
                    </div>
                    {timelineEvents.before.map((ev, idx) => (
                      <div key={ev.id}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#333", marginBottom: 2 }}>
                          {ev.title}
                        </div>
                        {idx === timelineEvents.before.length - 1 && (
                          <div style={{ fontSize: 12, color: "#999" }}>
                            {parseDate(ev.event_date).getDate()} {MONTHS_SHORT[parseDate(ev.event_date).getMonth()]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: "#999" }}>Aucun événement</div>
                )}
              </div>

              {/* Point milieu - Aujourd'hui */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "var(--green-deep)",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 0 4px #fff, 0 0 0 5px var(--green-deep)"
                }} />
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Aujourd'hui
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--green-deep)", marginBottom: 4 }}>
                  {todayStr}
                </div>
                {timelineEvents.current && timelineEvents.current.length > 0 ? (
                  <div>
                    {timelineEvents.current.map((ev) => (
                      <div key={ev.id} style={{ fontSize: 12, color: "#333", fontWeight: 500 }}>
                        {ev.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: "#999" }}>Aucun événement</div>
                )}
              </div>

              {/* Point droite - Événement après */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "var(--green-mid)",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 0 4px #fff, 0 0 0 5px var(--green-mid)"
                }} />
                {timelineEvents.after && timelineEvents.after.length > 0 ? (
                  <div>
                    <div style={{ fontSize: 12, color: "#666", marginBottom: 8, fontWeight: 500 }}>
                      Prochain événement{timelineEvents.after.length > 1 ? "s" : ""}
                    </div>
                    {timelineEvents.after.map((ev, idx) => (
                      <div key={ev.id}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#333", marginBottom: 2 }}>
                          {ev.title}
                        </div>
                        {idx === 0 && (
                          <div style={{ fontSize: 12, color: "#999" }}>
                            {parseDate(ev.event_date).getDate()} {MONTHS_SHORT[parseDate(ev.event_date).getMonth()]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: "#999" }}>Aucun événement</div>
                )}
              </div>
            </div>
          </div>

          {/* Button to view all events */}
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <Link href="/events" style={{ textDecoration: "none" }}>
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
                Voir tous nos événements →
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
