import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import ayssarTarabay from "@/assets/ayssarTarabay.png";
import SignatureTattoo from "@/components/featured-work/SignatureTattoo";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  /**
   * SCROLL MATH 101:
   * 300vh means we have 3 screens of content.
   * scrollYProgress maps this entire range from 0 to 1.
   * 0.33 is roughly the end of the first screen.
   * 0.66 is roughly the end of the second screen.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 1. Background Layers ---
  
  // Hero Image: Visible at start (0), fades out by 35% of total scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  
  // Particles: Start invisible, fully peak between 30% and 100%
  const particleOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // --- 2. Foreground Sections ---

  // PAGE 1 (HERO)
  // Float up and disappear quickly
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const heroAlpha = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // PAGE 2 (SIGNATURE)
  // [START, PEAK_START, PEAK_END, EXIT]
  // We want it to "sit" still while it's fully visible.
  // By making the middle two values of the first array (0.35, 0.75) map to the same value (0 or 1), 
  // we create a "dead zone" where the animation stays perfectly still.
  const signatureY = useTransform(
    scrollYProgress, 
    [0.2, 0.35, 0.75, 0.9], // The scroll % (0 to 1)
    [100, 0, 0, -100]        // The Y position (px)
  );
  
  const signatureAlpha = useTransform(
    scrollYProgress, 
    [0.2, 0.35, 0.75, 0.9], // The scroll %
    [0, 1, 1, 0]            // The Opacity (0 to 1)
  );

  // PAGE 3 (GALLERY PREVIEW)
  const galleryY = useTransform(scrollYProgress, [0.8, 0.95], [100, 0]);
  const galleryAlpha = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      {/* STICKY CANVAS: This container stays fixed to the viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* HERO BACKGROUND */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }} 
          className="absolute inset-0 z-0"
        >
          <img
            src={ayssarTarabay}
            alt="Ayssar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* PARTICLE BACKGROUND */}
        <motion.div 
          style={{ opacity: particleOpacity }}
          className="absolute inset-0 z-1"
        >
          <Particles
            particleColors={["#ffffff", "#d4af37"]}
            particleCount={200}
            speed={0.1}
          />
        </motion.div>
      </div>

      {/* SCROLLABLE CONTENT: This moves past the sticky backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full">
        
        {/* SECTION 1: HERO */}
        <section className="h-screen flex flex-col items-center justify-center">
          <motion.div 
            style={{ y: heroY, opacity: heroAlpha }}
            className="flex flex-col items-center gap-8 z-10"
          >
            <h1 className="font-butler text-6xl md:text-9xl text-white text-center leading-tight tracking-tighter">
              AYSSAR TARABAY<br />
              <span className="text-gold">TATTOOS</span>
            </h1>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="bg-gold text-black font-bold rounded-none px-12 py-8 text-xl">
                BOOK NOW
              </Button>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gold"
              >
                <ChevronDown size={48} />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: SIGNATURE - We use sticky here too to keep it centered while we "pause" the scroll */}
        <section className="h-screen flex items-center justify-center sticky top-0 pointer-events-none">
          <motion.div 
            style={{ y: signatureY, opacity: signatureAlpha }}
            className="w-full z-20 pointer-events-auto"
          >
            <SignatureTattoo />
          </motion.div>
        </section>

        {/* SECTION 3: GALLERY PREVIEW */}
        <section className="h-screen flex items-center justify-center">
          <motion.div 
            style={{ y: galleryY, opacity: galleryAlpha }}
            className="z-20 text-center"
          >
             <h2 className="font-butler text-5xl md:text-8xl text-gold">THE GALLERY</h2>
             <p className="text-white/50 tracking-widest uppercase mt-4">Coming Soon</p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Home;