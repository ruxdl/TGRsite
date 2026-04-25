"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const MONTHS = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"];

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export default function EventsBanner() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    supabase
      .from("events")
      .select("id, title, event_date, event_time, type")
      .gte("event_date", today)
      .order("event_date")
      .limit(10)
      .then(({ data }) => {
        if (data && data.length > 0) setEvents(data);
      });
  }, []);

  if (events.length === 0) {
    return (
      <div className="eventsBanner">
        <div style={{ padding: "0 40px" }}>
          <span className="bannerEmpty">The Green Room · Montalivet-les-Bains · Vêtements & Accessoires · Bord de mer</span>
        </div>
      </div>
    );
  }

  // Duplicate items for seamless loop
  const items = [...events, ...events];

  return (
    <div className="eventsBanner">
      <div className="eventsBannerTrack">
        {items.map((ev, i) => (
          <span className="bannerItem" key={`${ev.id}-${i}`}>
            <span className="bTag">{ev.type}</span>
            <span>{ev.title}</span>
            <span className="bSep">·</span>
            <span className="bDate">{formatDate(ev.event_date)}{ev.event_time ? ` – ${ev.event_time}` : ""}</span>
            <span className="bSep" style={{ paddingLeft: 20 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
