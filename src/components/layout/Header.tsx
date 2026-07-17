import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Portfolio", href: "#gallery-section" },
    { name: "Signature", href: "#signature-section" },
    { name: "Contact", href: "#footer" },
  ];

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="font-butler text-2xl md:text-3xl text-white tracking-tighter transition-colors group-hover:text-gold">
            AYSSAR<span className="text-gold group-hover:text-white">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors font-medium"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact-section")}
            className="bg-gold text-black text-xs font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full hover:bg-gold/80 transition-all"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile: Book pill + menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => scrollTo("#contact-section")}
            className="bg-gold text-black text-[11px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full active:scale-95 transition-transform cursor-pointer"
          >
            Book
          </button>
          <button
            className="text-white hover:text-gold transition-colors p-2 -mr-2 cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-black z-40 flex flex-col items-center justify-center gap-8 p-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="font-butler text-4xl text-white hover:text-gold transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact-section")}
              className="bg-gold text-black text-lg font-bold uppercase tracking-[0.2em] px-12 py-4 rounded-full mt-4"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
