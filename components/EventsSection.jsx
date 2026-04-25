"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import FadeIn from "./FadeIn";

const MONTHS_SHORT = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const MONTHS_LONG  = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

function parseDate(str) {
  return new Date(str + "T00:00:00");
}

export default function EventsSection() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    supabase
      .from("events")
      .select("*")
      .gte("event_date", today)
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
        <div className="eventsGrid">
          {events.map((ev) => {
            const d = parseDate(ev.event_date);
            return (
              <FadeIn key={ev.id}>
                <div className={`eventCard${ev.featured ? " eventFeatured" : ""}`}>
                  <div className="eventCardTop">
                    <div className="eventDateBadge">
                      <span className="eDay">{d.getDate()}</span>
                      <span className="eMonth">{MONTHS_SHORT[d.getMonth()]}</span>
                    </div>
                    <span
                      className="eventTypePill"
                      style={{ background: typeColors[ev.type] || typeColors.Autre }}
                    >
                      {ev.type}
                    </span>
                  </div>
                  <div className="eventCardBody">
                    <div className="eventTitle">{ev.title}</div>
                    {ev.event_time && (
                      <div className="eventTime">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                        </svg>
                        {ev.event_time} · {d.getDate()} {MONTHS_LONG[d.getMonth()]} {d.getFullYear()}
                      </div>
                    )}
                    {ev.description && <p className="eventDesc">{ev.description}</p>}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}
    </section>
  );
}
