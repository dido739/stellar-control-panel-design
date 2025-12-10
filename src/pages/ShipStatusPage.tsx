import { motion } from "framer-motion";
import { 
  Activity, 
  MapPin, 
  Gauge, 
  Shield, 
  Zap, 
  Fuel,
  Users,
  Compass,
  HeartPulse,
  Radio,
  Cpu,
  Thermometer,
  Wind
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { shipStatusData, systemsData } from "@/data/shipData";

const ShipStatusPage = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-6">
              <Activity className="w-4 h-4 text-success animate-pulse" />
              <span className="text-xs font-display text-success tracking-widest">
                ВСИЧКИ СИСТЕМИ ОПЕРАТИВНИ
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-4">
              СТАТУС НА КОРАБА
            </h1>
            
            <p className="text-muted-foreground leading-relaxed">
              Реално време мониторинг на всички критични системи на Aurora Eternis.
              Данните се обновяват автоматично от централния компютър.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Status dashboard */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Location & Velocity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Panel delay={0} variant="highlighted">
                <PanelHeader
                  title="ТЕКУЩО МЕСТОПОЛОЖЕНИЕ"
                  icon={<MapPin className="w-5 h-5" />}
                  status={<StatusIndicator status="operational" size="sm" />}
                />
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] text-muted-foreground tracking-wider mb-1">
                      СЕКТОР
                    </p>
                    <p className="font-display text-lg text-primary glow-text">
                      {shipStatusData.location.sector}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                      <p className="text-[10px] text-muted-foreground tracking-wider mb-1">
                        КООРДИНАТИ
                      </p>
                      <p className="text-xs text-foreground font-mono">
                        {shipStatusData.location.coordinates}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                      <p className="text-[10px] text-muted-foreground tracking-wider mb-1">
                        НАЙ-БЛИЗКА ЗВЕЗДА
                      </p>
                      <p className="text-xs text-foreground">
                        {shipStatusData.location.nearestStar}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Compass className="w-4 h-4 text-primary" />
                    {shipStatusData.location.distance}
                  </div>
                </div>
              </Panel>

              <Panel delay={0.1} variant="highlighted">
                <PanelHeader
                  title="СКОРОСТ И ДВИЖЕНИЕ"
                  icon={<Gauge className="w-5 h-5" />}
                  status={<StatusIndicator status="operational" size="sm" />}
                />
                <div className="space-y-6">
                  <div className="text-center py-6">
                    <p className="text-[10px] text-muted-foreground tracking-wider mb-2">
                      ТЕКУЩА СКОРОСТ
                    </p>
                    <p className="font-display text-5xl text-primary glow-text">
                      {shipStatusData.velocity.current}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      от скоростта на светлината
                    </p>
                  </div>
                  <ProgressBar 
                    value={15} 
                    max={25} 
                    label="СПРЯМО МАКСИМАЛНА СКОРОСТ"
                    variant="primary"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>МАКС: {shipStatusData.velocity.max}</span>
                    <span>ETA до Sirius: 42 дни</span>
                  </div>
                </div>
              </Panel>
            </div>

            {/* Hull & Shields */}
            <div className="grid md:grid-cols-3 gap-6">
              <Panel delay={0.2}>
                <PanelHeader
                  title="КОРПУС"
                  icon={<Shield className="w-5 h-5" />}
                  status={<StatusIndicator status="operational" label="НОРМА" size="sm" />}
                />
                <div className="space-y-4">
                  <ProgressBar 
                    value={shipStatusData.hull.integrity} 
                    label="ИНТЕГРИТЕТ"
                    size="lg"
                  />
                  <ProgressBar 
                    value={shipStatusData.hull.shields} 
                    label="ЩИТОВЕ"
                    variant="primary"
                    size="lg"
                  />
                </div>
              </Panel>

              <Panel delay={0.3}>
                <PanelHeader
                  title="ЕНЕРГИЯ"
                  icon={<Zap className="w-5 h-5" />}
                  status={<StatusIndicator status="operational" label="СТАБИЛНА" size="sm" />}
                />
                <div className="space-y-4">
                  <ProgressBar 
                    value={shipStatusData.power.reactor} 
                    label="РЕАКТОР"
                  />
                  <ProgressBar 
                    value={shipStatusData.power.reserves} 
                    label="РЕЗЕРВИ"
                  />
                  <ProgressBar 
                    value={shipStatusData.power.solarCollectors} 
                    label="СОЛАРНИ ПАНЕЛИ"
                    variant="success"
                  />
                </div>
              </Panel>

              <Panel delay={0.4}>
                <PanelHeader
                  title="ГОРИВО"
                  icon={<Fuel className="w-5 h-5" />}
                  status={<StatusIndicator status="operational" label="ДОСТАТЪЧНО" size="sm" />}
                />
                <div className="space-y-4">
                  <ProgressBar 
                    value={shipStatusData.fuel.deuterium} 
                    label="ДЕУТЕРИУМ"
                  />
                  <ProgressBar 
                    value={shipStatusData.fuel.antiMatter} 
                    label="АНТИМАТЕРИЯ"
                  />
                </div>
              </Panel>
            </div>

            {/* Crew status */}
            <Panel delay={0.5}>
              <PanelHeader
                title="СТАТУС НА ЕКИПАЖА"
                icon={<Users className="w-5 h-5" />}
                status={<StatusIndicator status="operational" size="sm" />}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                  <p className="font-display text-3xl text-foreground mb-1">
                    {shipStatusData.crew.total}
                  </p>
                  <p className="text-[10px] text-muted-foreground tracking-wider">
                    ОБЩО ЕКИПАЖ
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/30 text-center">
                  <p className="font-display text-3xl text-success mb-1">
                    {shipStatusData.crew.active}
                  </p>
                  <p className="text-[10px] text-muted-foreground tracking-wider">
                    НА ДЕЖУРСТВО
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                  <p className="font-display text-3xl text-primary mb-1">
                    {shipStatusData.crew.resting}
                  </p>
                  <p className="text-[10px] text-muted-foreground tracking-wider">
                    ПОЧИВАЩИ
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 text-center">
                  <p className="font-display text-3xl text-warning mb-1">
                    {shipStatusData.crew.medical}
                  </p>
                  <p className="text-[10px] text-muted-foreground tracking-wider">
                    В МЕДИЦИНСКИ
                  </p>
                </div>
              </div>
            </Panel>

            {/* Systems detail */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl text-foreground tracking-wider mb-6"
              >
                ДЕТАЙЛИ НА СИСТЕМИТЕ
              </motion.h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {systemsData.map((system, index) => (
                  <Panel key={system.id} delay={0.6 + index * 0.1} id={system.id}>
                    <PanelHeader
                      title={system.shortName}
                      subtitle={system.name}
                      icon={
                        system.icon === "compass" ? <Compass className="w-5 h-5" /> :
                        system.icon === "heart-pulse" ? <HeartPulse className="w-5 h-5" /> :
                        <Radio className="w-5 h-5" />
                      }
                      status={<StatusIndicator status="operational" size="sm" />}
                    />
                    
                    <div className="space-y-4">
                      <ProgressBar 
                        value={system.health} 
                        label="ЗДРАВЕ НА СИСТЕМАТА"
                      />
                      
                      <div className="space-y-2 pt-2 border-t border-border/30">
                        {Object.entries(system.details).map(([key, value]) => (
                          <div 
                            key={key} 
                            className="flex items-center justify-between p-2 rounded bg-muted/20"
                          >
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                              {key === "accuracy" && <Cpu className="w-3 h-3" />}
                              {key === "temperature" && <Thermometer className="w-3 h-3" />}
                              {key === "humidity" && <Wind className="w-3 h-3" />}
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-display text-xs text-primary">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShipStatusPage;
