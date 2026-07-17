import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ayssarPortrait } from "@/assets/work";
import SignatureTattoo from "@/components/featured-work/SignatureTattoo";
import GallerySection from "@/components/gallery/GallerySection";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const MARQUEE_ITEMS = ["Black & Grey Realism", "Custom Pieces", "Beirut", "By Appointment"];

const easeOut = [0.22, 1, 0.36, 1] as const;

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: pageProgress } = useScroll();
  const progressScale = useSpring(pageProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroContentAlpha = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const marqueeLine = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
    .map(item => item)
    .join("  ·  ");

  return (
    <div className="relative bg-background text-foreground font-sans">
      {/* Reading progress hairline */}
      <motion.div
        aria-hidden
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gold z-[60] origin-left"
      />

      <Header />

      {/* HERO */}
      <section ref={heroRef} className="relative h-svh min-h-[600px] overflow-hidden" aria-label="Introduction">
        {/* Portrait of Ayssar at work — slow settle on load */}
        <motion.div style={{ y: heroImageY }} className="absolute inset-0">
          <motion.img
            src={ayssarPortrait}
            alt="Ayssar Tarabay tattooing in his studio"
            initial={prefersReducedMotion ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: easeOut }}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-background/10" />
          <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-background/60" />
        </motion.div>

        {/* Signature element: gallery-frame hairline that draws itself */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute inset-4 md:inset-6 border border-gold/25 pointer-events-none"
        />
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
          className="absolute inset-4 md:inset-6 pointer-events-none"
        >
          <span className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-gold/60" />
          <span className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 border-gold/60" />
          <span className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 border-gold/60" />
          <span className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-gold/60" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ y: heroContentY, opacity: heroContentAlpha }}
          className="relative z-10 h-full flex flex-col items-center justify-end pb-16 md:pb-24 px-6 text-center"
        >
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
            className="text-gold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[11px] md:text-sm font-medium mb-5 md:mb-6"
          >
            Black &amp; Grey Realism — Beirut
          </motion.p>

          <h1 className="font-butler font-black text-[17vw] sm:text-8xl md:text-[9rem] lg:text-[10.5rem] leading-[0.85] tracking-tight text-bone drop-shadow-2xl">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.55, duration: 1, ease: easeOut }}
              >
                AYSSAR
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-gold-gradient pb-[0.08em]"
                initial={prefersReducedMotion ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: easeOut }}
              >
                TARABAY
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: easeOut }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto max-w-md"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("contact-section")}
              className="w-full sm:w-auto bg-gold text-black font-bold rounded-full px-10 py-6 md:py-7 text-sm md:text-base tracking-[0.15em] uppercase hover:bg-bone transition-colors duration-300 min-h-12"
            >
              Book a session
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo("gallery-section")}
              className="w-full sm:w-auto bg-transparent dark:bg-transparent dark:hover:bg-transparent border-bone/30 text-bone hover:border-gold hover:text-gold hover:bg-transparent rounded-full px-10 py-6 md:py-7 text-sm md:text-base tracking-[0.15em] uppercase transition-colors duration-300 min-h-12"
            >
              View the work
            </Button>
          </motion.div>

          <motion.button
            aria-label="Scroll to gallery"
            onClick={() => scrollTo("gallery-section")}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1.4, duration: 0.6 },
              y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
            }}
            className="mt-8 md:mt-10 text-gold/40 hover:text-gold transition-colors cursor-pointer p-2"
          >
            <ChevronDown size={28} />
          </motion.button>
        </motion.div>
      </section>

      {/* MARQUEE STRIP */}
      <div aria-hidden className="relative overflow-hidden border-y border-border bg-background py-5 md:py-7">
        <div className="animate-marquee flex whitespace-nowrap w-max">
          {[0, 1].map(copy => (
            <span
              key={copy}
              className="font-butler font-light uppercase text-2xl md:text-4xl tracking-[0.2em] text-stroke-gold pr-8"
            >
              {marqueeLine}&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* SELECTED WORKS */}
      <GallerySection />

      {/* SIGNATURE PIECE */}
      <div id="signature-section" className="bg-luxury-gradient scroll-mt-16">
        <SignatureTattoo />
      </div>

      {/* BOOKING — ContactForm renders its own #contact-section */}
      <ContactForm />

      {/* FOOTER */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
