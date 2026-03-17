import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Masonry from "@/components/Masonry";
import { Button } from "@/components/ui/button";
import legTattoo from "@/assets/leg tattoo.jpeg";
import ayssarTarabay from "@/assets/ayssarTarabay.png";
import instagramShot from "@/assets/Screenshot_8-3-2026_21330_www.instagram.com.jpeg";

const INITIAL_ITEMS = [
  { id: "1", img: legTattoo, url: "#", height: 800 },
  { id: "2", img: ayssarTarabay, url: "#", height: 600 },
  { id: "3", img: legTattoo, url: "#", height: 700 },
  { id: "4", img: ayssarTarabay, url: "#", height: 900 },
  { id: "5", img: instagramShot, url: "#", height: 600 },
  { id: "6", img: ayssarTarabay, url: "#", height: 800 },
];

const MORE_ITEMS = [
  { id: "7", img: legTattoo, url: "#", height: 700 },
  { id: "8", img: instagramShot, url: "#", height: 900 },
  { id: "9", img: ayssarTarabay, url: "#", height: 600 },
  { id: "10", img: legTattoo, url: "#", height: 850 },
  { id: "11", img: ayssarTarabay, url: "#", height: 750 },
  { id: "12", img: instagramShot, url: "#", height: 650 },
];

const GallerySection = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Trigger Masonry entrance when visible
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleViewMore = () => {
    setItems([...INITIAL_ITEMS, ...MORE_ITEMS]);
    setIsExpanded(true);
  };

  const handleShowLess = () => {
    setItems(INITIAL_ITEMS);
    setIsExpanded(false);
    // Smooth scroll back to top of section if desired
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="gallery-section" ref={sectionRef} className="min-h-screen py-24 px-4 relative z-40 bg-transparent">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-butler text-5xl md:text-8xl text-gold uppercase tracking-tighter">
            Portfolio
          </h2>
          <div className="h-[1px] w-32 bg-gold/50 mx-auto mt-6" />
        </motion.div>

        {/* Gallery Content */}
        <div className="w-full flex flex-col gap-12">
          {isInView && (
            <>
              {/* Masonry Grid */}
              <div className="w-full">
                <Masonry 
                  items={items} 
                  animateFrom="bottom" 
                  stagger={0.06} 
                />
              </div>
              
              {/* Controls - Placed directly under the images */}
              <div className="flex justify-center mt-12">
                {!isExpanded ? (
                  <Button
                    onClick={handleViewMore}
                    variant="outline"
                    size="lg"
                    className="border-gold/30 text-gold hover:bg-gold hover:text-black rounded-full px-12 py-8 text-xl transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                  >
                    VIEW MORE WORKS
                  </Button>
                ) : (
                  <Button
                    onClick={handleShowLess}
                    variant="outline"
                    size="lg"
                    className="border-gold/30 text-gold hover:bg-gold hover:text-black rounded-full px-12 py-8 text-xl transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                  >
                    SHOW LESS
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;