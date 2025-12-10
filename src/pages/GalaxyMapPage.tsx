import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Map, 
  Navigation, 
  Star,
  Target,
  Rocket,
  Info,
  Crosshair
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { galaxyMapData } from "@/data/communicationsData";
import { cn } from "@/lib/utils";

const GalaxyMapPage = () => {
  const [selectedStar, setSelectedStar] = useState<typeof galaxyMapData.stars[0] | null>(null);
  const [showTrajectory, setShowTrajectory] = useState(true);

  const getStarColor = (star: typeof galaxyMapData.stars[0]) => {
    if (star.destination) return "fill-accent stroke-accent";
    if (star.inhabited) return "fill-success stroke-success";
    return "fill-primary stroke-primary";
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Map className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-primary tracking-widest">
                ГАЛАКТИЧЕСКА НАВИГАЦИЯ
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-4">
              КАРТА НА СЕКТОРА
            </h1>
            
            <p className="text-muted-foreground leading-relaxed">
              Интерактивна карта на локалния сектор на Млечния път. Текущо местоположение и траектория към Sirius.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Galaxy map */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Map */}
              <div className="lg:col-span-3">
                <Panel delay={0} className="p-0 overflow-hidden">
                  <div className="p-4 border-b border-border/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Navigation className="w-5 h-5 text-primary" />
                      <span className="font-display text-sm tracking-wider">
                        ЛОКАЛЕН СЕКТОР - ОРИОНОВО РАМО
                      </span>
                    </div>
                    <button
                      onClick={() => setShowTrajectory(!showTrajectory)}
                      className={cn(
                        "px-3 py-1 text-[10px] font-display tracking-wider rounded-md transition-all",
                        showTrajectory
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {showTrajectory ? "СКРИЙ ТРАЕКТОРИЯ" : "ПОКАЖИ ТРАЕКТОРИЯ"}
                    </button>
                  </div>
                  
                  {/* SVG Map */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-background to-card">
                    {/* Background stars */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(100)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-px h-px bg-foreground/20 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2,
                          }}
                        />
                      ))}
                    </div>

                    <svg 
                      viewBox="0 0 100 70" 
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path 
                            d="M 10 0 L 0 0 0 10" 
                            fill="none" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="0.1" 
                            opacity="0.1"
                          />
                        </pattern>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      <rect width="100" height="70" fill="url(#grid)" />

                      {/* Trajectory line */}
                      {showTrajectory && (
                        <motion.polyline
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2 }}
                          points={galaxyMapData.trajectory.map(p => `${p.x},${p.y}`).join(" ")}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="0.3"
                          strokeDasharray="2 1"
                          opacity="0.5"
                          filter="url(#glow)"
                        />
                      )}

                      {/* Stars */}
                      {galaxyMapData.stars.map((star) => (
                        <g key={star.id}>
                          {/* Star glow */}
                          <circle
                            cx={star.x}
                            cy={star.y}
                            r={star.destination ? 3 : star.inhabited ? 2 : 1.5}
                            className={cn(
                              "opacity-30",
                              star.destination ? "fill-accent" : star.inhabited ? "fill-success" : "fill-primary"
                            )}
                            filter="url(#glow)"
                          />
                          
                          {/* Star */}
                          <motion.circle
                            cx={star.x}
                            cy={star.y}
                            r={star.destination ? 1.5 : star.inhabited ? 1 : 0.7}
                            className={cn(
                              "cursor-pointer transition-all",
                              getStarColor(star),
                              selectedStar?.id === star.id && "stroke-2"
                            )}
                            whileHover={{ scale: 1.5 }}
                            onClick={() => setSelectedStar(star)}
                          />
                          
                          {/* Star label */}
                          <text
                            x={star.x}
                            y={star.y - 3}
                            textAnchor="middle"
                            className="fill-muted-foreground text-[2px] font-display"
                          >
                            {star.name}
                          </text>

                          {/* Destination marker */}
                          {star.destination && (
                            <motion.circle
                              cx={star.x}
                              cy={star.y}
                              r="4"
                              fill="none"
                              stroke="hsl(var(--accent))"
                              strokeWidth="0.2"
                              strokeDasharray="1 1"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                              style={{ transformOrigin: `${star.x}px ${star.y}px` }}
                            />
                          )}
                        </g>
                      ))}

                      {/* Ship position */}
                      <motion.g
                        animate={{ 
                          y: [0, -0.5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {/* Ship glow */}
                        <circle
                          cx={galaxyMapData.shipPosition.x}
                          cy={galaxyMapData.shipPosition.y}
                          r="3"
                          className="fill-primary opacity-20"
                          filter="url(#glow)"
                        />
                        
                        {/* Ship icon */}
                        <polygon
                          points={`${galaxyMapData.shipPosition.x},${galaxyMapData.shipPosition.y - 2} ${galaxyMapData.shipPosition.x - 1.5},${galaxyMapData.shipPosition.y + 1.5} ${galaxyMapData.shipPosition.x + 1.5},${galaxyMapData.shipPosition.y + 1.5}`}
                          className="fill-primary stroke-primary"
                          strokeWidth="0.2"
                        />
                        
                        {/* Ship label */}
                        <text
                          x={galaxyMapData.shipPosition.x}
                          y={galaxyMapData.shipPosition.y + 5}
                          textAnchor="middle"
                          className="fill-primary text-[2px] font-display"
                        >
                          AURORA ETERNIS
                        </text>
                      </motion.g>
                    </svg>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
                      <p className="text-[10px] font-display text-muted-foreground tracking-wider mb-2">ЛЕГЕНДА</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          <span className="text-[10px] text-muted-foreground">Населена система</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-[10px] text-muted-foreground">Звезда</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-[10px] text-muted-foreground">Дестинация</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-transparent border-b-primary" />
                          <span className="text-[10px] text-muted-foreground">Aurora Eternis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>

              {/* Info sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Current position */}
                <Panel delay={0.1}>
                  <PanelHeader
                    title="ТЕКУЩА ПОЗИЦИЯ"
                    icon={<Crosshair className="w-5 h-5" />}
                    status={<StatusIndicator status="operational" size="sm" />}
                  />
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                      <p className="text-[10px] text-muted-foreground tracking-wider">КООРДИНАТИ</p>
                      <p className="font-display text-sm text-primary">
                        X: {galaxyMapData.shipPosition.x.toFixed(2)} | Y: {galaxyMapData.shipPosition.y.toFixed(2)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                      <p className="text-[10px] text-muted-foreground tracking-wider">РАЗСТОЯНИЕ ДО SIRIUS</p>
                      <p className="font-display text-sm text-accent">4.2 светлинни години</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                      <p className="text-[10px] text-muted-foreground tracking-wider">ETA</p>
                      <p className="font-display text-sm text-foreground">42 дни</p>
                    </div>
                  </div>
                </Panel>

                {/* Selected star info */}
                <Panel delay={0.2}>
                  <PanelHeader
                    title="ИНФОРМАЦИЯ ЗА ЗВЕЗДА"
                    icon={<Star className="w-5 h-5" />}
                  />
                  
                  {selectedStar ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          selectedStar.destination 
                            ? "bg-accent/20" 
                            : selectedStar.inhabited 
                            ? "bg-success/20" 
                            : "bg-primary/20"
                        )}>
                          <Star className={cn(
                            "w-4 h-4",
                            selectedStar.destination 
                              ? "text-accent" 
                              : selectedStar.inhabited 
                              ? "text-success" 
                              : "text-primary"
                          )} />
                        </div>
                        <div>
                          <h4 className="font-display text-sm text-foreground">{selectedStar.name}</h4>
                          <p className="text-[10px] text-muted-foreground">{selectedStar.type}</p>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                        <p className="text-[10px] text-muted-foreground tracking-wider">СТАТУС</p>
                        <p className="text-sm text-foreground">
                          {selectedStar.inhabited ? "Населена система" : "Ненаселена"}
                        </p>
                      </div>
                      
                      {selectedStar.destination && (
                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-accent" />
                            <span className="text-xs text-accent font-display tracking-wider">
                              ДЕСТИНАЦИЯ НА МИСИЯТА
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="text-center py-8">
                      <Info className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">
                        Кликнете върху звезда за информация
                      </p>
                    </div>
                  )}
                </Panel>

                {/* Mission progress */}
                <Panel delay={0.3}>
                  <PanelHeader
                    title="ПРОГРЕС НА МИСИЯТА"
                    icon={<Rocket className="w-5 h-5" />}
                  />
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Земя</span>
                        <span className="text-muted-foreground">Sirius</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted/50 overflow-hidden relative">
                        <motion.div
                          className="h-full bg-gradient-to-r from-success via-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "67%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background"
                          initial={{ left: 0 }}
                          animate={{ left: "65%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="font-display text-2xl text-success">67%</p>
                        <p className="text-[10px] text-muted-foreground tracking-wider">ЗАВЪРШЕНО</p>
                      </div>
                      <div>
                        <p className="font-display text-2xl text-foreground">42</p>
                        <p className="text-[10px] text-muted-foreground tracking-wider">ДНИ ОСТАВАЩИ</p>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GalaxyMapPage;
