import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import ayssarTarabay from "@/assets/ayssarTarabay.png";
import SignatureTattoo from "@/components/featured-work/SignatureTattoo";
import GallerySection from "@/components/gallery/GallerySection";
import PencilDrawings from "@/components/gallery/PencilDrawings";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/layout/Footer";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. Background Layers (Sticky) ---
  // Hero image only fades out at the very beginning
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  
  // Particles start invisible and fade in as hero leaves
  const particleOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  // --- 2. Animations for Hero ---
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroAlpha = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // --- 3. Animations for Signature ---
  // We want the signature to float in as the hero leaves
  const signatureAlpha = useTransform(scrollYProgress, [0.05, 0.15, 0.35, 0.45], [0, 1, 1, 0]); 
  const signatureY = useTransform(scrollYProgress, [0.05, 0.15], [100, 0]);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery-section");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative bg-black text-white selection:bg-gold/30">
      
      {/* PERSISTENT BACKGROUND (Fixed to prevent double scroll issues) */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        {/* Hero Background */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }} 
          className="absolute inset-0"
        >
          <img src={ayssarTarabay} alt="Ayssar Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>

        {/* Particles Background (Always active after hero leaves) */}
        <motion.div 
          style={{ opacity: particleOpacity }} 
          className="absolute inset-0"
        >
          <Particles 
            particleColors={["#ffffff", "#d4af37"]} 
            particleCount={250} 
            speed={0.15} 
            moveParticlesOnHover
          />
        </motion.div>
      </div>

      {/* CONTENT OVERLAY (Uses natural document flow) */}
      <div className="relative z-10 w-full">
        
        {/* BLOCK 1: HERO */}
        <section className="h-screen flex items-center justify-center relative">
          <motion.div style={{ y: heroY, opacity: heroAlpha }} className="flex flex-col items-center gap-8 px-4">
            <h1 className="font-butler text-6xl md:text-9xl text-white text-center leading-[0.9] tracking-tighter drop-shadow-2xl">
              AYSSAR TARABAY<br />
              <span className="text-gold">TATTOOS</span>
            </h1>
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gold text-black font-bold rounded-full px-12 py-8 text-xl hover:bg-gold/80 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  BOOK NOW
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={scrollToGallery}
                  className="border-gold text-gold hover:bg-gold hover:text-black rounded-full px-8 py-6 text-lg transition-all duration-300"
                >
                  VIEW GALLERY
                </Button>
              </div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }} 
                className="text-gold/50 mt-4 cursor-pointer"
                onClick={scrollToGallery}
              >
                <ChevronDown size={48} />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* BLOCK 2: SIGNATURE (Sticky inside a relative container to prevent gaps) */}
        <section className="h-[150vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <motion.div style={{ opacity: signatureAlpha, y: signatureY }} className="w-full">
              <SignatureTattoo />
            </motion.div>
          </div>
        </section>

        {/* BLOCK 3: GALLERY (Natural Flow) */}
        <div className="bg-transparent">
          <GallerySection />
        </div>

        {/* BLOCK 4: PENCIL DRAWINGS */}
        <div className="bg-transparent">
          <PencilDrawings />
        </div>

        {/* BLOCK 5: CONTACT */}
        <div className="bg-transparent">
          <ContactForm />
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;