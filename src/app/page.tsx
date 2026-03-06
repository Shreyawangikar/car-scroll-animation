import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="relative bg-[#121212] overflow-x-hidden">
      <Preloader />
      <Navbar />
      <HeroSection />
    </main>
  );
}

