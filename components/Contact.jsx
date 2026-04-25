"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import FadeIn from "./FadeIn";

export default function Contact() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    supabase.from("hours").select("*").order("sort_order").then(({ data }) => {
      if (data) setHours(data);
    });
  }, []);

  return (
    <section className="contact" id="contact">
      <div className="contactGrid">
        <FadeIn>
          <div className="contactLeft">
            <div className="sectionLabel">Nous trouver</div>
            <h2>Venez<br /><em>nous rendre visite</em></h2>
            <div className="contactInfo">
              <div className="contactItem">
                <div className="contactIcon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="contactItemContent">
                  <strong>Adresse</strong>
                  <span>Montalivet-les-Bains, 33930<br />Gironde, France</span>
                </div>
              </div>
              <div className="contactItem">
                <div className="contactIcon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.37 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.53 6.53l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contactItemContent">
                  <strong>Téléphone</strong>
                  <span>+33 5 XX XX XX XX</span>
                </div>
              </div>
              <div className="contactItem">
                <div className="contactIcon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contactItemContent">
                  <strong>Email</strong>
                  <span>contact@thegreenroom-montalivet.fr</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="contactMap">
            <span className="mapLabel">📍 Montalivet-les-Bains</span>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="hoursCard">
            <div className="hoursTitle">Horaires d&apos;ouverture</div>
            {hours.map((h) => (
              <div className="hoursRow" key={h.id}>
                <span className="day">{h.day}</span>
                <span className={h.is_closed ? "closed" : "time"}>
                  {h.is_closed ? "Fermé" : `${h.open} – ${h.close}`}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
