import { useState } from "react";
import { motion } from "framer-motion";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Camera, Upload, Send, User, Mail, Phone, Calendar } from "lucide-react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <section id="contact-section" className="py-24 px-4 relative bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-butler text-5xl md:text-7xl text-white mb-4">Get Inked</h2>
          <p className="text-gold/60 uppercase tracking-[0.3em] text-sm">Consultation & Booking</p>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/70 flex items-center gap-2 italic">
                  <User size={14} className="text-gold" /> Full Name
                </Label>
                <ShadcnInput id="name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white h-12 focus:border-gold/50 transition-colors" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70 flex items-center gap-2 italic">
                  <Mail size={14} className="text-gold" /> Email Address
                </Label>
                <ShadcnInput id="email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white h-12 focus:border-gold/50 transition-colors" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/70 flex items-center gap-2 italic">
                  <Phone size={14} className="text-gold" /> Phone Number
                </Label>
                <ShadcnInput id="phone" placeholder="+1 (555) 000-0000" className="bg-white/5 border-white/10 text-white h-12 focus:border-gold/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="placement" className="text-white/70 flex items-center gap-2 italic">
                  <Calendar size={14} className="text-gold" /> Desired Placement
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10 text-white">
                    <SelectItem value="arm">Arm / Sleeve</SelectItem>
                    <SelectItem value="leg">Leg / Sleeve</SelectItem>
                    <SelectItem value="back">Full Back</SelectItem>
                    <SelectItem value="chest">Chest</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tattoo Details */}
            <div className="space-y-2">
              <Label htmlFor="idea" className="text-white/70 italic">Tell me about your idea</Label>
              <Textarea 
                id="idea" 
                placeholder="Describe the style, elements, and size..." 
                className="bg-white/5 border-white/10 text-white min-h-[150px] focus:border-gold/50 transition-colors"
                required
              />
            </div>

            {/* Image Placeholders / Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-white/70 italic flex items-center gap-2">
                  <Camera size={14} className="text-gold" /> Reference Images
                </Label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 group hover:border-gold/30 transition-colors cursor-pointer bg-white/[0.02]">
                  <Upload className="text-white/20 group-hover:text-gold/50 transition-colors" size={32} />
                  <span className="text-white/40 text-sm">Upload Inspiration</span>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-white/70 italic flex items-center gap-2">
                   Remake existing tattoo?
                </Label>
                <div className="flex items-start space-x-3 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <Checkbox id="remake" className="mt-1 border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="remake" className="text-sm font-medium leading-none text-white/60 cursor-pointer">
                      This is a cover-up or a remake
                    </label>
                    <p className="text-xs text-white/30">
                      I will need clear photos of the existing work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gold text-black font-bold h-14 rounded-full text-lg hover:bg-gold/80 transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.1)] flex items-center justify-center gap-2"
            >
              {isSubmitting ? "TRANSMITTING..." : (
                <>
                  <Send size={18} /> SEND CONSULTATION REQUEST
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;