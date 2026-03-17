import { Instagram, Twitter, Facebook, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-20 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Logo / Name */}
        <div className="mb-12 text-center">
          <h2 className="font-butler text-3xl text-white tracking-widest uppercase">Ayssar Tarabay</h2>
          <div className="h-[1px] w-12 bg-gold/50 mx-auto mt-4" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <MapPin className="text-gold" size={24} />
            <h3 className="text-white/40 text-xs uppercase tracking-widest">Studio Location</h3>
            <p className="text-white text-sm">Beirut, Lebanon<br />Luxury Ink Studio, Floor 4</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Mail className="text-gold" size={24} />
            <h3 className="text-white/40 text-xs uppercase tracking-widest">Inquiries</h3>
            <p className="text-white text-sm">ayssar.tattoos@gmail.com</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <Facebook size={24} />
              </a>
            </div>
            <h3 className="text-white/40 text-xs uppercase tracking-widest">Social Media</h3>
            <p className="text-white text-sm">@ayssar_tarabay_tattoos</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] uppercase tracking-[0.2em]">
          <p>© 2026 Ayssar Tarabay. All Rights Reserved.</p>
          <p>Designed with Luxury & Precision</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;