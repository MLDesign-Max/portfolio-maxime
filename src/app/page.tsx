import { Navbar } from "../components/ui/Navbar";
import { HeroSection } from "../components/sections/HeroSection";
import { TickerBanner } from "../components/sections/TickerBanner";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ExpertisesSection } from "../components/sections/ExpertisesSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-page">
      <Navbar />
      <HeroSection />
      <TickerBanner />
      <ProjectsSection />
      <ExpertisesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
