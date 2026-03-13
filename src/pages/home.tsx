import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Balatro from "@/components/Balatro";
import ScrollVelocity from "@/components/ScrollVelocity";
import LightRays from "@/components/LightRays";
import Particles from "@/components/Particles";
import DomeGallery from "@/components/DomeGallery";
import artistImage from "@/assets/Screenshot_8-3-2026_21330_www.instagram.com.jpeg";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across a 200vh range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Background Logic
  // Hero background: fades out completely by 50% scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  
  // Gallery background: starts fading in at 35% scroll
  const galleryOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const galleryScale = useTransform(scrollYProgress, [0.35, 0.6], [0.95, 1]);

  // 2. Foreground Logic
  // Hero elements: float up and fade
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const heroAlpha = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Gallery elements: float in from bottom and fade
  const galleryY = useTransform(scrollYProgress, [0.5, 0.8], [60, 0]);
  const galleryAlpha = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black">
      {/* STICKY CANVAS: Backgrounds stay fixed while the "page" scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* HERO BACKGROUND STACK */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0">
            <Balatro
              isRotate={false}
              mouseInteraction
              pixelFilter={1800}
              lighting={0.1}
              color1="#000000"
              color2="#d4af37"
              color3="#1d1c16"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#d4af37"
              raysSpeed={1}
              lightSpread={0.5}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              className="custom-rays"
            />
          </div>
        </motion.div>

        {/* GALLERY BACKGROUND (Particles) */}
        <motion.div 
          style={{ opacity: galleryOpacity, scale: galleryScale }}
          className="absolute inset-0 z-1"
        >
          <Particles
            particleColors={["#ffffff", "#d4af37"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </motion.div>
      </div>

      {/* CONTENT OVERLAY: This layer moves relative to the scroll container */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        
        {/* PAGE 1: HERO */}
        <section className="h-screen flex flex-col items-center justify-center">
          <motion.div 
            style={{ y: heroY, opacity: heroAlpha }}
            className="flex flex-col items-center gap-12 w-full z-10 pointer-events-none"
          >
            {/* Circular Artist Image */}
            <div className="relative group pointer-events-auto">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl group-hover:bg-white/30 transition-all duration-700" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white/20 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.2)]">
                <img
                  src={artistImage}
                  alt="Ayssar Tarabay"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Typography */}
            <div className="w-full overflow-hidden">
              <ScrollVelocity
                texts={["Ayssar Tarabay", "Ayssar Tarabay"]}
                velocity={50}
                className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] uppercase font-black"
                scrollerClassName="text-6xl md:text-8xl lg:text-9xl"
                numCopies={6}
              />
            </div>
          </motion.div>
        </section>

        {/* PAGE 2: GALLERY */}
        <section className="h-screen flex items-center justify-center">
          <motion.div 
            style={{ y: galleryY, opacity: galleryAlpha }}
            className="w-full h-full z-20 pointer-events-auto flex items-center justify-center"
          >
            <div className="w-full h-full max-w-350">
              <DomeGallery
                fit={0.8}
                minRadius={600}
                maxVerticalRotationDeg={0}
                segments={34}
                dragDampening={2}
                grayscale
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Home;