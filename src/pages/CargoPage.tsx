import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  TrendingUp,
  Box,
  Droplets,
  Wind,
  Utensils,
  Wrench,
  Shield,
  Database,
  ArrowUpDown,
  Filter,
  Search
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/button";
import {
  cargoStats,
  consumables,
  equipment,
  cargoOperations,
  storageZones
} from "@/data/cargoData";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  consumable: Droplets,
  equipment: Wrench,
  safety: Shield,
  maintenance: Wrench,
  transport: Package,
  industrial: Database,
  research: Box,
};

const CargoPage = () => {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const capacityPercentage = (cargoStats.usedCapacity / cargoStats.totalCapacity) * 100;

  const filteredConsumables = consumables.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-destructive";
      case "high": return "text-warning";
      default: return "text-primary";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "text-success";
      case "good": return "text-primary";
      default: return "text-warning";
    }
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
              <Package className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-primary tracking-widest">
                ТОВАРЕН ОТСЕК АКТИВЕН
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-4">
              УПРАВЛЕНИЕ НА ТОВАРА
            </h1>

            <p className="text-muted-foreground leading-relaxed">
              Пълен инвентар на оборудването, консумативите и ресурсите на борда на Aurora Eternis.
              Централизирана система за наблюдение и контрол на товарния отсек.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cargo dashboard */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Capacity overview */}
            <Panel delay={0} variant="highlighted">
              <PanelHeader
                title="ОБЩ КАПАЦИТЕТ"
                icon={<Database className="w-5 h-5" />}
                status={<StatusIndicator status="operational" size="sm" />}
              />

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/30">
                  <p className="text-[10px] text-muted-foreground tracking-wider mb-2">
                    ОБЩА ВМЕСТИМОСТ
                  </p>
                  <p className="font-display text-3xl text-foreground">
                    {cargoStats.totalCapacity}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">тона</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-[10px] text-muted-foreground tracking-wider mb-2">
                    ИЗПОЛЗВАН
                  </p>
                  <p className="font-display text-3xl text-primary glow-text">
                    {cargoStats.usedCapacity}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">тона</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-[10px] text-muted-foreground tracking-wider mb-2">
                    НАЛИЧЕН
                  </p>
                  <p className="font-display text-3xl text-success">
                    {cargoStats.availableCapacity}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">тона</p>
                </div>
              </div>

              <ProgressBar
                value={capacityPercentage}
                label="ЗАПЪЛВАНЕ НА ТОВАРНИЯ ОТСЕК"
                size="lg"
              />
            </Panel>

            {/* Storage zones */}
            <Panel delay={0.1}>
              <PanelHeader
                title="СКЛАДОВИ ЗОНИ"
                icon={<Box className="w-5 h-5" />}
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storageZones.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-sm text-foreground">{zone.name}</h3>
                      <StatusIndicator status="operational" size="sm" />
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Капацитет:</span>
                        <span className="text-foreground">{zone.capacity} т</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Температура:</span>
                        <span className="text-foreground">{zone.temperature}°C</span>
                      </div>
                    </div>

                    <ProgressBar
                      value={(zone.used / zone.capacity) * 100}
                      size="sm"
                      showValue={false}
                    />
                  </motion.div>
                ))}
              </div>
            </Panel>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {["all", "consumable", "equipment", "safety"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={cn(
                      "px-4 py-2 text-xs font-display tracking-wider rounded-md transition-all",
                      filterCategory === category
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground border border-border/30"
                    )}
                  >
                    {category === "all" ? "ВСИЧКИ" : category.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Търсене..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border/50 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none"
                />
              </div>
            </div>

            {/* Consumables */}
            <Panel delay={0.2}>
              <PanelHeader
                title="КОНСУМАТИВИ"
                subtitle="Критични ресурси и материали"
                icon={<Droplets className="w-5 h-5" />}
              />

              <div className="grid md:grid-cols-2 gap-4">
                {filteredConsumables.map((item) => {
                  const Icon = categoryIcons[item.category] || Package;
                  const percentage = (item.quantity / item.maxCapacity) * 100;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-display text-sm text-foreground">{item.name}</h3>
                            <p className={cn(
                              "text-[10px] font-display tracking-wider",
                              getPriorityColor(item.priority)
                            )}>
                              {item.priority.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <StatusIndicator status="operational" size="sm" />
                      </div>

                      <div className="space-y-2 mb-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Количество:</span>
                          <span className="text-foreground">
                            {item.quantity.toLocaleString()} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Локация:</span>
                          <span className="text-foreground">{item.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Презареждане:</span>
                          <span className="text-foreground">{item.restockDate}</span>
                        </div>
                      </div>

                      <ProgressBar
                        value={percentage}
                        size="sm"
                      />
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Equipment */}
            <Panel delay={0.3}>
              <PanelHeader
                title="ОБОРУДВАНЕ"
                subtitle="Технически системи и инструменти"
                icon={<Wrench className="w-5 h-5" />}
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEquipment.map((item) => {
                  const Icon = categoryIcons[item.category] || Box;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-display text-sm text-foreground">{item.name}</h3>
                            <p className={cn(
                              "text-[10px] font-display tracking-wider",
                              getConditionColor(item.condition)
                            )}>
                              {item.condition.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Количество:</span>
                          <span className="text-foreground">{item.quantity} бр</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Локация:</span>
                          <span className="text-foreground">{item.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Поддръжка:</span>
                          <span className="text-foreground">{item.nextMaintenance}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Recent operations */}
            <Panel delay={0.4}>
              <PanelHeader
                title="ПОСЛЕДНИ ОПЕРАЦИИ"
                icon={<ArrowUpDown className="w-5 h-5" />}
              />

              <div className="space-y-3">
                {cargoOperations.map((op) => (
                  <div
                    key={op.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        op.type === "loading" ? "bg-success/10 border border-success/30" :
                        op.type === "unloading" ? "bg-primary/10 border border-primary/30" :
                        "bg-warning/10 border border-warning/30"
                      )}>
                        {op.type === "loading" ? (
                          <TrendingUp className={cn("w-4 h-4", "text-success")} />
                        ) : op.type === "unloading" ? (
                          <TrendingDown className={cn("w-4 h-4", "text-primary")} />
                        ) : (
                          <Wrench className={cn("w-4 h-4", "text-warning")} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{op.item}</p>
                        <p className="text-xs text-muted-foreground">{op.quantity} • {op.operator}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-xs text-success font-display tracking-wider">
                          ЗАВЪРШЕНА
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{op.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Alerts */}
            <Panel delay={0.5} variant="accent">
              <PanelHeader
                title="ВАЖНИ ИЗВЕСТИЯ"
                icon={<AlertTriangle className="w-5 h-5" />}
              />

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
                  <Clock className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">Планирано презареждане на вода след 35 дни</p>
                    <p className="text-xs text-muted-foreground mt-1">Очакван обем: 5000 литра</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <Wrench className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">Следваща поддръжка на EVA скафандри след 25 дни</p>
                    <p className="text-xs text-muted-foreground mt-1">Отговорник: Сержант Дмитрий Волков</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/30">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">Всички критични консумативи са в безопасни нива</p>
                    <p className="text-xs text-muted-foreground mt-1">Последна проверка: 2387-03-15</p>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CargoPage;
