import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Instagram, Send } from "lucide-react";
import { needleMacro } from "@/assets/work";

const WHATSAPP_NUMBER = "96176746628";
const INSTAGRAM_URL = "https://www.instagram.com/ayssar.tarabay.tattoos";

const PLACEMENTS: Record<string, string> = {
  arm: "Arm / Sleeve",
  leg: "Leg / Sleeve",
  back: "Full Back",
  chest: "Chest",
  other: "Other",
};

const fieldClass =
  "bg-transparent border-0 border-b border-border text-bone h-12 text-base focus-visible:ring-0 focus-visible:border-gold transition-colors rounded-none placeholder:text-muted-foreground/40 px-0 w-full";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [placement, setPlacement] = useState("");
  const [idea, setIdea] = useState("");
  const [isCoverUp, setIsCoverUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hi Ayssar, I'd like to book a tattoo session.`,
      "",
      `Name: ${name}`,
      email && `Email: ${email}`,
      phone && `Phone: ${phone}`,
      placement && `Placement: ${PLACEMENTS[placement] ?? placement}`,
      isCoverUp && `Cover-up / rework: yes`,
      "",
      `Idea: ${idea}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="contact-section"
      className="py-24 md:py-36 px-4 md:px-8 relative overflow-hidden scroll-mt-16 bg-background"
    >
      {/* Hairline lead-in */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 md:h-20 bg-linear-to-b from-gold/50 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-gold uppercase tracking-[0.5em] text-xs font-medium mb-4 md:mb-5">Booking</p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="font-butler text-[2.75rem] leading-none md:text-7xl text-bone uppercase tracking-tight mb-5 md:mb-6"
            >
              Start your piece
            </motion.h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Tell Ayssar what you have in mind. Every project starts with a
            conversation — placement, scale, references, and story.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-5 bg-card border border-border overflow-hidden"
        >
          {/* Process shot — needle on skin */}
          <div className="relative lg:col-span-2 h-44 sm:h-56 lg:h-auto overflow-hidden">
            <img
              src={needleMacro}
              alt="Macro shot of Ayssar tattooing the details of a realistic eye"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-black/10 lg:to-card" />
            <div className="absolute bottom-4 left-5 lg:bottom-6 lg:left-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-bone/70">In the studio</p>
              <p className="font-butler text-lg text-bone mt-1">Every line by hand</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-7 md:gap-8 p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-8">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name" className="text-gold uppercase tracking-[0.2em] text-[11px] font-semibold">
                  Full name *
                </Label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={fieldClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="text-gold uppercase tracking-[0.2em] text-[11px] font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={fieldClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="phone" className="text-gold uppercase tracking-[0.2em] text-[11px] font-semibold">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+961 ..."
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="placement" className="text-gold uppercase tracking-[0.2em] text-[11px] font-semibold">
                  Placement
                </Label>
                <Select value={placement} onValueChange={setPlacement}>
                  <SelectTrigger id="placement" className={`${fieldClass} justify-between`}>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border text-bone">
                    {Object.entries(PLACEMENTS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="idea" className="text-gold uppercase tracking-[0.2em] text-[11px] font-semibold">
                Your idea *
              </Label>
              <Textarea
                id="idea"
                placeholder="Describe the concept, style, and rough size..."
                value={idea}
                onChange={e => setIdea(e.target.value)}
                className="bg-transparent border border-border text-bone min-h-[110px] text-base focus-visible:ring-0 focus-visible:border-gold transition-colors rounded-none placeholder:text-muted-foreground/40 p-4 w-full"
                required
              />
              <p className="text-muted-foreground/70 text-xs leading-relaxed">
                Have reference images? Send them in the WhatsApp chat that opens,
                or DM them on Instagram.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="remake"
                checked={isCoverUp}
                onCheckedChange={checked => setIsCoverUp(checked === true)}
                className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black h-5 w-5 rounded-sm"
              />
              <label
                htmlFor="remake"
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-bone transition-colors cursor-pointer py-2"
              >
                This is a cover-up or rework
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-1">
              <Button
                type="submit"
                className="flex-1 bg-gold text-black font-bold h-14 rounded-none text-sm uppercase tracking-[0.25em] hover:bg-bone transition-colors duration-300"
              >
                <span className="flex items-center gap-3">
                  Send on WhatsApp <Send size={16} />
                </span>
              </Button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 h-14 px-8 border border-border text-bone hover:border-gold hover:text-gold transition-colors duration-300 text-sm uppercase tracking-[0.25em]"
              >
                <Instagram size={16} /> DM instead
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
