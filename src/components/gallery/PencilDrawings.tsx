import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import legTattoo from "@/assets/leg tattoo.jpeg";
import ayssarTarabay from "@/assets/ayssarTarabay.png";
import instagramShot from "@/assets/Screenshot_8-3-2026_21330_www.instagram.com.jpeg";

const INITIAL_DRAWINGS = [
  { id: "p1", img: ayssarTarabay, title: "The Weaver",      description: "Pencil on Heavyweight Paper" },
  { id: "p2", img: instagramShot, title: "Anatomical Flow", description: "Graphite and Charcoal" },
];

const MORE_DRAWINGS = [
  { id: "p3", img: legTattoo,     title: "Shadow Play",      description: "Traditional Pencil" },
  { id: "p4", img: ayssarTarabay, title: "Ornamental Study", description: "Technical Graphite" },
];

const PencilDrawings = () => {
  const [drawings, setDrawings] = useState(INITIAL_DRAWINGS);
  const [hasMore, setHasMore]   = useState(true);

  const loadMore = () => {
    setDrawings((prev) => [...prev, ...MORE_DRAWINGS]);
    setHasMore(false);
  };

  return (
    <section id="drawings-section" className="pt-0 pb-24 px-4 bg-transparent scroll-mt-20">

      {/* ── Animated Divider ────────────────────────────────────────────────
           Replaces the old static border-y. The line "draws" itself across
           the full width as the section enters the viewport — acting as a
           visual curtain cut between Gallery and Pencil Drawings.          */}
      <div className="relative w-full flex flex-col items-center py-16">

        {/* The horizontal rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="
            w-full max-w-5xl h-[1px]
            bg-gradient-to-r from-transparent via-gold/60 to-transparent
            origin-center
          "
        />

        {/* Optional centred label that fades in just after the line draws */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-6 text-gold/40 uppercase tracking-[0.4em] text-xs"
        >
          Fine Art & Studies
        </motion.span>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto">

        {/* Heading — same entrance pattern as GallerySection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="font-butler text-4xl md:text-6xl text-white mb-4">
            Pencil Drawings
          </h2>
          <div className="h-[1px] w-20 bg-gold/30 mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <AnimatePresence mode="popLayout">
            {drawings.map((drawing, index) => (
              <motion.div
                key={drawing.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.7,
                  delay: (index % 2) * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="group flex flex-col items-center"
              >
                {/* Image card */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                  <img
                    src={drawing.img}
                    alt={drawing.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  {/* Tint overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500" />
                  {/* Decorative inner frame */}
                  <div className="absolute inset-4 border border-white/5 pointer-events-none transition-all duration-500 group-hover:inset-2 group-hover:border-gold/30" />
                </div>

                {/* Caption */}
                <div className="mt-8 text-center space-y-2">
                  <h3 className="font-butler text-2xl text-white group-hover:text-gold transition-colors">
                    {drawing.title}
                  </h3>
                  <p className="text-white/40 text-sm italic">{drawing.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center mt-20"
          >
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="border-gold/30 text-gold hover:bg-gold hover:text-black rounded-full px-10 py-6 text-lg transition-all duration-500 group"
            >
              <span>EXPLORE MORE STUDIES</span>
              <motion.span
                className="ml-2 inline-block group-hover:translate-x-1 transition-transform"
              >
                +
              </motion.span>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PencilDrawings;