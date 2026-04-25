import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section className="about" id="about">
      <FadeIn>
        <div className="aboutVisual">
          <div className="aboutBgRect" />
          <div className="aboutImgPlaceholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="48" height="48">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
            <span>Photo de la boutique</span>
          </div>
          <div className="aboutBadge">
            <span className="num">100%</span>
            <span className="lbl">local</span>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="aboutText">
          <div className="sectionLabel">Notre histoire</div>
          <h2>Une boutique<br /><em>née de la mer</em></h2>
          <p>
            The Green Room, c&apos;est bien plus qu&apos;un magasin — c&apos;est un état d&apos;esprit.
            Nichée au cœur de Montalivet-les-Bains, notre boutique rassemble une sélection
            de vêtements et d&apos;accessoires pensés pour le bord de mer.
          </p>
          <p>
            Chaque pièce est choisie avec soin, alliant style, confort et authenticité.
            Que vous soyez surfeur, vacancier ou habitant, vous trouverez ici votre
            allure de côte atlantique.
          </p>
          <div className="aboutValues">
            <div className="aboutValue">
              <span className="valNum">★</span>
              <span className="valLabel">Sélection<br />qualitative</span>
            </div>
            <div className="aboutValue">
              <span className="valNum">♻</span>
              <span className="valLabel">Marques<br />engagées</span>
            </div>
            <div className="aboutValue">
              <span className="valNum">☀</span>
              <span className="valLabel">Esprit<br />atlantique</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
