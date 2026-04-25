import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EventsBanner from "../components/EventsBanner";
import About from "../components/About";
import Collections from "../components/Collections";
import EventsSection from "../components/EventsSection";
import BrandsSection from "../components/BrandsSection";
import Ambiance from "../components/Ambiance";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <EventsBanner />
      <main>
        <Hero />
        <About />
        <Collections />
        <EventsSection />
        <BrandsSection />
        <Ambiance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
