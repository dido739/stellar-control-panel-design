import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shipData } from "@/data/shipData";
import shipHeroImage from "@/assets/ship-hero.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={shipHeroImage}
          alt="Aurora Eternis космически кораб"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Mission badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-8"
          >
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs font-display text-accent tracking-widest">
              {shipData.mission}
            </span>
          </motion.div>

          {/* Ship name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary glow-text mb-4 tracking-wider"
          >
            {shipData.name}
          </motion.h1>

          {/* Ship class */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-display text-lg md:text-xl text-muted-foreground tracking-widest mb-6"
          >
            {shipData.class}
          </motion.p>

          {/* Motto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="font-display text-sm text-foreground/80 tracking-[0.3em]">
              {shipData.motto}
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild variant="hero" size="xl">
              <Link to="/status">
                <Activity className="w-5 h-5" />
                РАЗГЛЕДАЙ ПАНЕЛА
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/crew">
                ЗАПОЗНАЙ СЕ С ЕКИПАЖА
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { label: "ЕКИПАЖ", value: "127" },
              { label: "СВЕТЛИННИ ГОДИНИ", value: "8.6" },
              { label: "СИСТЕМИ АКТИВНИ", value: "100%" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl text-primary glow-text">
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
