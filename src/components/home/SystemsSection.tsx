import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, HeartPulse, Radio, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { systemsData } from "@/data/shipData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  compass: Compass,
  "heart-pulse": HeartPulse,
  radio: Radio,
};

export function SystemsSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wider mb-4">
            ОСНОВНИ СИСТЕМИ
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-sm text-muted-foreground tracking-wider">
              СТАТУС НА КРИТИЧНАТА ИНФРАСТРУКТУРА
            </p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        {/* Systems grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {systemsData.map((system, index) => {
            const Icon = iconMap[system.icon];
            
            return (
              <Panel 
                key={system.id} 
                variant="highlighted" 
                delay={index * 0.1}
                className="group hover:border-primary/50 transition-all duration-300"
              >
                <PanelHeader
                  title={system.shortName}
                  subtitle={system.name}
                  icon={Icon && <Icon className="w-5 h-5" />}
                  status={
                    <StatusIndicator 
                      status={system.status as "operational"} 
                      label={system.statusText}
                      size="sm"
                    />
                  }
                />
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {system.description}
                </p>

                {/* System health */}
                <div className="mb-6">
                  <ProgressBar 
                    value={system.health} 
                    label="ЗДРАВЕ НА СИСТЕМАТА"
                    size="sm"
                  />
                </div>

                {/* Details */}
                <div className="space-y-2 mb-6 py-4 border-y border-border/30">
                  {Object.entries(system.details).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground uppercase tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-display text-primary">{value}</span>
                    </div>
                  ))}
                </div>

                <Button asChild variant="panel" className="w-full group-hover:border-primary/50">
                  <Link to={`/status#${system.id}`}>
                    ПОВЕЧЕ ИНФОРМАЦИЯ
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </Panel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
