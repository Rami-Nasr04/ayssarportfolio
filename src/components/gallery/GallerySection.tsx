import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Masonry from "@/components/Masonry";
import { Button } from "@/components/ui/button";
import legTattoo from "@/assets/leg tattoo.jpeg";
import ayssarTarabay from "@/assets/ayssarTarabay.png";
import instagramShot from "@/assets/Screenshot_8-3-2026_21330_www.instagram.com.jpeg";

// Initial items
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
  const [hasMore, setHasMore] = useState(true);
  const sectionRef = useRef(null);
  
  // Task 2: Trigger animation when in viewpoint
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const loadMore = () => {
    setItems((prev) => [...prev, ...MORE_ITEMS]);
    setHasMore(false); // Only allow one "View More" for this mock
  };

  return (
    <section id="gallery-section" ref={sectionRef} className="min-h-screen py-24 px-4 relative z-40 bg-transparent">
      <div className="w-full max-w-7xl mx-auto">
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

        <div className="w-full min-h-[600px]">
          {/* Only render Masonry when it enters the viewport to trigger its GSAP animation */}
          {isInView && (
            <div className="flex flex-col gap-12">
              <Masonry 
                items={items} 
                animateFrom="bottom" 
                stagger={0.06} 
              />
              
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={loadMore}
                    variant="outline"
                    size="lg"
                    className="border-gold/30 text-gold hover:bg-gold hover:text-black rounded-full px-12 py-8 text-xl transition-all duration-300"
                  >
                    VIEW MORE WORKS
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;