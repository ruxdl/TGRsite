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
