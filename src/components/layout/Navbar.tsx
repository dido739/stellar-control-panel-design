import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Users, Activity, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { shipData } from "@/data/shipData";

const navItems = [
  { path: "/", label: "НАЧАЛО", icon: Home },
  { path: "/crew", label: "ЕКИПАЖ", icon: Users },
  { path: "/status", label: "СТАТУС", icon: Activity },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />
      
      {/* Glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-shadow duration-300">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-sm text-primary glow-text tracking-widest">
                {shipData.name}
              </p>
              <p className="text-[10px] text-muted-foreground tracking-wider">
                {shipData.registry}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-2 flex items-center gap-2 rounded-lg transition-all duration-300 font-display text-xs tracking-wider",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-display text-success tracking-wider">
                ВСЕ СИСТЕМИ ОПЕРАТИВНИ
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-display text-sm tracking-wider",
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Mobile status */}
                <div className="flex items-center gap-2 px-4 py-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-success tracking-wider">
                    ВСИЧКИ СИСТЕМИ АКТИВНИ
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
