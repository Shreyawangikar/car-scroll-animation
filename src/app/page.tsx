import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollContent from "@/components/ScrollContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0a]">
      <Preloader />
      <Navbar />
      <HeroSection />
      <ScrollContent />
      <Footer />
    </main>
  );
}

