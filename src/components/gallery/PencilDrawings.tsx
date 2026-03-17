import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import legTattoo from "@/assets/leg tattoo.jpeg";
import ayssarTarabay from "@/assets/ayssarTarabay.png";
import instagramShot from "@/assets/Screenshot_8-3-2026_21330_www.instagram.com.jpeg";

const INITIAL_DRAWINGS = [
  { id: "p1", img: ayssarTarabay, title: "The Weaver", description: "Pencil on Heavyweight Paper" },
  { id: "p2", img: instagramShot, title: "Anatomical Flow", description: "Graphite and Charcoal" },
];

const MORE_DRAWINGS = [
  { id: "p3", img: legTattoo, title: "Shadow Play", description: "Traditional Pencil" },
  { id: "p4", img: ayssarTarabay, title: "Ornamental Study", description: "Technical Graphite" },
];

const PencilDrawings = () => {
  const [drawings, setDrawings] = useState(INITIAL_DRAWINGS);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    setDrawings((prev) => [...prev, ...MORE_DRAWINGS]);
    setHasMore(false);
  };

  return (
    <section className="py-24 px-4 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-butler text-4xl md:text-6xl text-white mb-4">Pencil Drawings</h2>
          <p className="text-gold/60 uppercase tracking-[0.3em] text-sm">Fine Art & Studies</p>
          <div className="h-[1px] w-20 bg-gold/30 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <AnimatePresence mode="popLayout">
            {drawings.map((drawing, index) => (
              <motion.div
                key={drawing.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 2) * 0.2 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                  <img
                    src={drawing.img}
                    alt={drawing.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500" />
                  
                  {/* Decorative Frame */}
                  <div className="absolute inset-4 border border-white/5 pointer-events-none transition-all duration-500 group-hover:inset-2 group-hover:border-gold/30" />
                </div>
                
                <div className="mt-8 text-center space-y-2">
                  <h3 className="font-butler text-2xl text-white group-hover:text-gold transition-colors">{drawing.title}</h3>
                  <p className="text-white/40 text-sm italic">{drawing.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center mt-20"
          >
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="border-gold/30 text-gold hover:bg-gold hover:text-black rounded-full px-10 py-6 text-lg transition-all duration-500 group"
            >
              <span>EXPLORE MORE STUDIES</span>
              <motion.span className="ml-2 group-hover:translate-x-1 transition-transform">+</motion.span>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PencilDrawings;