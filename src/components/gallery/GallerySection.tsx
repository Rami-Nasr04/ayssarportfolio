import { useState } from "react";
import { motion } from "framer-motion";
import Masonry, { type MasonryItem } from "@/components/Masonry";
import { Button } from "@/components/ui/button";
import Lightbox from "./Lightbox";
import { SELECTED_WORKS, MORE_WORKS } from "@/assets/work";

const ALL_WORKS = [...SELECTED_WORKS, ...MORE_WORKS];

const GallerySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = isExpanded ? ALL_WORKS : SELECTED_WORKS;

  const handleShowLess = () => {
    setIsExpanded(false);
    setTimeout(() => {
      document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  const openLightbox = (item: MasonryItem) => {
    const idx = ALL_WORKS.findIndex(w => w.id === item.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <section id="gallery-section" className="py-24 md:py-36 px-4 md:px-8 bg-background scroll-mt-16">
      <div className="w-full max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-12 md:mb-20"
        >
          <p className="text-gold uppercase tracking-[0.5em] text-xs font-medium mb-4 md:mb-5">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="font-butler text-[2.75rem] leading-none md:text-7xl text-bone uppercase tracking-tight"
              >
                Selected works
              </motion.h2>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
              A selection of large-scale black &amp; grey realism — statues,
              portraits, and custom compositions built to follow the body.
            </p>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="h-px w-full bg-linear-to-r from-gold/50 via-border to-transparent mt-8 md:mt-10 origin-left"
          />
        </motion.div>

        {/* Masonry grid — all breakpoints */}
        <Masonry items={items} stagger={0.05} onItemClick={openLightbox} />

        <div className="flex flex-col items-center gap-5 mt-12 md:mt-16">
          <Button
            onClick={isExpanded ? handleShowLess : () => setIsExpanded(true)}
            variant="outline"
            className="bg-transparent dark:bg-transparent border-gold/30 text-gold hover:bg-gold hover:text-black dark:hover:bg-gold dark:hover:text-black rounded-full px-10 py-6 text-sm uppercase tracking-[0.2em] transition-colors duration-300 min-h-12"
          >
            {isExpanded ? "Show less" : "View the full gallery"}
          </Button>
          <a
            href="https://www.instagram.com/ayssar.tarabay.tattoos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-gold transition-colors text-xs uppercase tracking-[0.25em] py-2"
          >
            More & more on Instagram →
          </a>
        </div>
      </div>

      {/* Lightbox over the full collection */}
      <Lightbox
        items={ALL_WORKS}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
};

export default GallerySection;
