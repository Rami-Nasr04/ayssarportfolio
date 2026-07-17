import { Instagram, Mail, MapPin } from "lucide-react";

// TODO(rami): confirm real studio info, email, and Instagram handle before launch
const CONTACT = {
  email: "aysartarabay@gmail.com",
  phoneDisplay: "+961 76 746 628",
  phoneHref: "tel:+96176746628",
  instagram: "@ayssar.tarabay.tattoos",
  instagramUrl: "https://www.instagram.com/ayssar.tarabay.tattoos",
  location: "Beirut, Lebanon",
  mapsUrl: "https://maps.app.goo.gl/DsRikdFjn9qk7nS1A",
};

const Footer = () => {
  return (
    <footer className="bg-background py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Name */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="font-butler text-5xl md:text-7xl text-bone tracking-tight uppercase leading-none">
            Ayssar <span className="text-gold-gradient">Tarabay</span>
          </h2>
          <p className="text-gold/50 text-[10px] uppercase tracking-[0.5em] mt-6 font-medium">
            Black &amp; Grey Realism
          </p>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full mb-20 max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <MapPin className="text-gold mb-5" size={22} aria-hidden />
            <h3 className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-3 font-semibold">
              Studio
            </h3>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone text-lg font-medium tracking-tight hover:text-gold transition-colors"
            >
              {CONTACT.location}
            </a>
            <span className="text-muted-foreground/70 text-xs mt-1 uppercase tracking-[0.2em]">
              Open in Google Maps
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <Mail className="text-gold mb-5" size={22} aria-hidden />
            <h3 className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-3 font-semibold">
              Inquiries
            </h3>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-bone text-lg font-medium tracking-tight hover:text-gold transition-colors break-all"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="text-bone text-lg font-medium tracking-tight hover:text-gold transition-colors mt-1"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <Instagram className="text-gold mb-5" size={22} aria-hidden />
            <h3 className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-3 font-semibold">
              Instagram
            </h3>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone text-lg font-medium tracking-tight hover:text-gold transition-colors"
            >
              {CONTACT.instagram}
            </a>
          </div>
        </div>

        {/* Credits */}
        <div className="w-full pt-10 border-t border-border flex flex-col md:flex-row justify-center items-center gap-4 text-muted-foreground/60 text-[10px] uppercase tracking-[0.3em] font-medium">
          <p>© {new Date().getFullYear()} Ayssar Tarabay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
