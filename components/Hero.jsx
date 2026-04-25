export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="heroTexture" />
      <div className="heroContent">
        <div className="heroTag fadeUp delay1">Montalivet-les-Bains · Bord de mer</div>
        <h1 className="heroTitle fadeUp delay2">
          Votre style,<br /><em>esprit ocean</em>
        </h1>
        <p className="heroSubtitle fadeUp delay3">
          Vêtements et accessoires pour ceux qui vivent au rythme des vagues.
          Collections soigneusement choisies, inspirées par la côte atlantique.
        </p>
        <a href="#collections" className="heroCta fadeUp delay4">
          Découvrir les collections
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="heroScroll">Scroll</div>
      <div className="heroWave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="#FAFAF5" />
        </svg>
      </div>
    </section>
  );
}
