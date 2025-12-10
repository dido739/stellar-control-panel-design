import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background grid-pattern relative">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <Navbar />
      
      <main className="relative pt-16 md:pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="relative border-t border-border/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground tracking-wider font-display">
              AURORA ETERNIS • ОПЕРАЦИЯ STELLAR DAWN
            </p>
            <p className="text-xs text-muted-foreground">
              © 2387 Обединен Космически Флот
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
