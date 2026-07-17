import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, Clock, Layers, PenTool } from "lucide-react";
import { SIGNATURE_SLIDES } from "@/assets/work";
import Lightbox from "@/components/gallery/Lightbox";

const DETAILS = [
  { icon: PenTool, label: "Style", value: "Black & Grey Realism" },
  { icon: Layers, label: "Scale", value: "Full Leg" },
  { icon: Clock, label: "Process", value: "Convention" },
  { icon: Award, label: "Design", value: "Custom, One of One" },
];

const SWIPE_DISTANCE = 60;

const SignatureTattoo = () => {
  const [[slide, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const count = SIGNATURE_SLIDES.length;
  const current = SIGNATURE_SLIDES[slide];

  const paginate = (dir: number) => {
    setSlide(([s]) => [(s + dir + count) % count, dir]);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE) paginate(1);
    else if (info.offset.x > SWIPE_DISTANCE) paginate(-1);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "40%" : "-40%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-40%" : "40%", opacity: 0 }),
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
      >
        {/* Slider */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-card select-none">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={current.img}
                  alt={`${current.title} — ${current.detail}`}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Slide caption + zoom */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent pt-16 pb-4 px-5 flex items-end justify-between pointer-events-none">
              <p className="text-[10px] uppercase tracking-[0.3em] text-bone/70">{current.detail}</p>
              <button
                onClick={() => setLightboxIndex(slide)}
                className="pointer-events-auto whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-gold/80 hover:text-gold transition-colors py-2 pl-3 cursor-pointer"
              >
                View full
              </button>
            </div>

            {/* Arrows */}
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous view"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/15 text-bone/80 hover:text-gold hover:border-gold/50 backdrop-blur-md flex items-center justify-center active:scale-90 transition-all cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next view"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/15 text-bone/80 hover:text-gold hover:border-gold/50 backdrop-blur-md flex items-center justify-center active:scale-90 transition-all cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Counter + dots */}
          <div className="flex items-center justify-between mt-4">
            <span className="font-mono text-xs text-gold/60 tracking-widest">
              {String(slide + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {SIGNATURE_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Go to view ${i + 1}`}
                  onClick={() => setSlide(([prev]) => [i, i > prev ? 1 : -1])}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    i === slide ? "w-8 bg-gold" : "w-3 bg-bone/20 hover:bg-bone/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Frame corners */}
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t border-l border-gold/50 -z-10" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b border-r border-gold/50 -z-10" />
        </div>

        {/* Copy */}
        <div className="w-full lg:w-1/2 space-y-8 md:space-y-10">
          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gold font-medium uppercase tracking-[0.5em] text-xs"
            >
              Signature piece
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="font-butler text-4xl md:text-6xl text-bone uppercase leading-[0.95] tracking-tight"
              >
                The Oracle,
                <br />
                <span className="text-gold-gradient">hip to ankle</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
            >
              A laurel-crowned oracle, quill poised in hand, an hourglass beneath marking time's passage—
              a full-leg composition conceived and executed during an international convention in Turkey. The design is, 
              designed to flow and evolve with the body's movement. It's the work Ayssar leads with.
            </motion.p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {DETAILS.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                viewport={{ once: true }}
                className="p-4 md:p-5 border border-border hover:border-gold/40 transition-colors duration-300"
              >
                <detail.icon size={18} className="text-gold mb-3" aria-hidden />
                <div className="text-muted-foreground text-[10px] uppercase tracking-[0.25em] mb-1">
                  {detail.label}
                </div>
                <div className="text-bone font-medium text-sm md:text-base">{detail.value}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-8 py-4 min-h-12 border border-gold text-gold font-medium hover:bg-gold hover:text-black transition-colors duration-300 uppercase tracking-[0.25em] text-xs cursor-pointer"
            >
              Start your own piece
            </button>
          </motion.div>
        </div>
      </motion.div>

      <Lightbox
        items={SIGNATURE_SLIDES}
        showCounter
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
};

export default SignatureTattoo;
