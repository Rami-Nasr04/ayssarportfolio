import { motion } from "framer-motion";
import { Clock, Scissors, Award, Info } from "lucide-react";
import legTattoo from "@/assets/leg tattoo.jpeg";

const SignatureTattoo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row gap-12 items-center"
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 overflow-hidden rounded-2xl border-2 border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
          >
            <img
              src={legTattoo}
              alt="Signature Full Leg Tattoo"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/50 z-0" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/50 z-0" />
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gold font-medium uppercase tracking-widest text-sm"
            >
              <Award size={16} />
              <span>Signature Piece</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="font-butler text-4xl md:text-6xl text-white leading-tight"
            >
              THE FULL LEG<br />
              <span className="text-gold">MASTERPIECE</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/70 text-lg leading-relaxed max-w-xl"
            >
              Ayssar's signature tattoo represents the pinnacle of dark luxury artistry. 
              This intricate full-leg composition blends classical anatomy with 
              modern ornamental flow, meticulously crafted to flow with the body's natural curves.
            </motion.p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <Info size={20} />, label: "Artistic Style", value: "Dark Ornamental" },
              { icon: <Scissors size={20} />, label: "Execution", value: "Anatomical Freehand" },
              { icon: <Award size={20} />, label: "Project Scope", value: "Full Leg Sleeve" },
              { icon: <Clock size={20} />, label: "Technicality", value: "Master-Level" },
            ].map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 transition-colors group/item"
              >
                <div className="text-gold mb-2 group-hover/item:scale-110 transition-transform">
                  {detail.icon}
                </div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  {detail.label}
                </div>
                <div className="text-white font-semibold">
                  {detail.value}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            viewport={{ once: true }}
            className="pt-6"
          >
            <button className="px-8 py-4 border-2 border-gold text-gold font-bold hover:bg-gold hover:text-black transition-all duration-300 rounded-none uppercase tracking-widest text-sm">
              Inquire About Similar Pieces
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignatureTattoo;