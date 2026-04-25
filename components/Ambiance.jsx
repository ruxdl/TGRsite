import FadeIn from "./FadeIn";

const PERKS = [
  { label: "Conseils personnalisés par nos équipes", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: "Ouvert 7j/7 en saison estivale",         icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
  { label: "À deux pas de la plage",                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
];

const MOSAIC = [
  "linear-gradient(135deg, #4A8C6E, #2D5C47)",
  "linear-gradient(135deg, #1C3829, #0e2318)",
  "linear-gradient(160deg, #C8503A, #8C3528)",
];

export default function Ambiance() {
  return (
    <section className="ambiance" id="ambiance">
      <div className="ambianceInner">
        <FadeIn>
          <div className="ambianceText">
            <div className="sectionLabel">L&apos;expérience</div>
            <h2>Plus qu&apos;une boutique,<br /><em>un lieu de vie</em></h2>
            <p>
              Entrez dans The Green Room et laissez-vous emporter par une atmosphère chaleureuse,
              entre planches de surf, senteurs marines et musique de bonne humeur.
              Nos conseillers sont passionnés et vous accompagnent avec le sourire.
            </p>
            <div className="ambiancePerks">
              {PERKS.map((p, i) => (
                <div className="ambiancePerk" key={i}>
                  {p.icon}
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="ambianceMosaic">
            {MOSAIC.map((bg, i) => (
              <div key={i} className="mosaicItem" style={{ background: bg, gridRow: i === 1 ? "span 2" : undefined }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
