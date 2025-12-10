import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Thermometer, 
  Zap,
  Shield,
  Play,
  Square,
  AlertCircle,
  CheckCircle2,
  Info
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/button";
import { diagnosticsData, emergencyScenarios } from "@/data/communicationsData";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { cn } from "@/lib/utils";

const DiagnosticsPage = () => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const handleStartSimulation = (scenarioId: string) => {
    setActiveScenario(scenarioId);
    setSimulationRunning(true);
  };

  const handleStopSimulation = () => {
    setActiveScenario(null);
    setSimulationRunning(false);
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "critical": return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Info className="w-4 h-4 text-primary" />;
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
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
              simulationRunning 
                ? "bg-destructive/10 border border-destructive/30"
                : "bg-success/10 border border-success/30"
            )}>
              <Activity className={cn(
                "w-4 h-4",
                simulationRunning ? "text-destructive animate-pulse" : "text-success"
              )} />
              <span className={cn(
                "text-xs font-display tracking-widest",
                simulationRunning ? "text-destructive" : "text-success"
              )}>
                {simulationRunning ? "СИМУЛАЦИЯ АКТИВНА" : "СИСТЕМИ В НОРМА"}
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-4">
              ДИАГНОСТИКА
            </h1>
            
            <p className="text-muted-foreground leading-relaxed">
              Разширена диагностика на всички бордови системи. Мониторинг в реално време и симулация на аварийни ситуации.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Diagnostics dashboard */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Power history chart */}
            <Panel delay={0}>
              <PanelHeader
                title="ЕНЕРГИЙНА ИСТОРИЯ (24 ЧАСА)"
                icon={<Zap className="w-5 h-5" />}
                status={<StatusIndicator status="operational" size="sm" />}
              />
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={diagnosticsData.powerHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      domain={[80, 105]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reactor" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", r: 3 }}
                      name="Реактор"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reserves" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--accent))", r: 3 }}
                      name="Резерви"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="solar" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--success))", r: 3 }}
                      name="Соларни"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Temperature zones */}
              <Panel delay={0.1}>
                <PanelHeader
                  title="ТЕМПЕРАТУРНИ ЗОНИ"
                  icon={<Thermometer className="w-5 h-5" />}
                  status={<StatusIndicator status="operational" size="sm" />}
                />
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={diagnosticsData.temperatureZones}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        type="number"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        domain={[0, 50]}
                      />
                      <YAxis 
                        type="category"
                        dataKey="zone"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        width={80}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "12px"
                        }}
                      />
                      <Bar 
                        dataKey="temp" 
                        fill="hsl(var(--primary))"
                        radius={[0, 4, 4, 0]}
                        name="Текуща °C"
                      />
                      <Bar 
                        dataKey="optimal" 
                        fill="hsl(var(--success))"
                        radius={[0, 4, 4, 0]}
                        opacity={0.3}
                        name="Оптимална °C"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              {/* System loads */}
              <Panel delay={0.2}>
                <PanelHeader
                  title="НАТОВАРВАНЕ НА СИСТЕМИТЕ"
                  icon={<Cpu className="w-5 h-5" />}
                  status={<StatusIndicator status="operational" size="sm" />}
                />
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={diagnosticsData.systemLoads}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="system" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                      />
                      <Radar
                        name="Натоварване %"
                        dataKey="load"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            {/* Active alerts */}
            <Panel delay={0.3}>
              <PanelHeader
                title="АКТИВНИ ИЗВЕСТИЯ"
                icon={<AlertTriangle className="w-5 h-5" />}
              />
              <div className="space-y-3">
                {diagnosticsData.alerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border",
                      alert.level === "warning" 
                        ? "bg-warning/5 border-warning/30"
                        : alert.level === "critical"
                        ? "bg-destructive/5 border-destructive/30"
                        : "bg-primary/5 border-primary/30"
                    )}
                  >
                    {getAlertIcon(alert.level)}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">Система: {alert.system}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Emergency simulation */}
            <Panel delay={0.4} variant={simulationRunning ? "accent" : "default"}>
              <PanelHeader
                title="СИМУЛАЦИЯ НА АВАРИЙНИ СИТУАЦИИ"
                icon={<Shield className="w-5 h-5" />}
                status={
                  simulationRunning 
                    ? <StatusIndicator status="warning" label="СИМУЛАЦИЯ" />
                    : <StatusIndicator status="operational" label="ГОТОВА" />
                }
              />
              
              <p className="text-sm text-muted-foreground mb-6">
                Тествайте реакцията на системите при различни аварийни ситуации. Симулациите не засягат реалната работа на кораба.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {emergencyScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={cn(
                      "p-4 rounded-lg border transition-all",
                      activeScenario === scenario.id
                        ? "bg-destructive/10 border-destructive/50"
                        : "bg-muted/20 border-border/30 hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-display text-sm text-foreground tracking-wider">
                          {scenario.name}
                        </h4>
                        <span className={cn(
                          "text-[10px] font-display tracking-wider",
                          scenario.severity === "critical" ? "text-destructive" : "text-warning"
                        )}>
                          {scenario.severity.toUpperCase()}
                        </span>
                      </div>
                      {activeScenario === scenario.id && (
                        <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3">
                      {scenario.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {scenario.affectedSystems.map((sys) => (
                        <span
                          key={sys}
                          className="px-2 py-0.5 text-[10px] bg-muted/50 rounded-md text-muted-foreground"
                        >
                          {sys}
                        </span>
                      ))}
                    </div>

                    {activeScenario === scenario.id ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={handleStopSimulation}
                      >
                        <Square className="w-4 h-4" />
                        СПРИ СИМУЛАЦИЯ
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleStartSimulation(scenario.id)}
                        disabled={simulationRunning}
                      >
                        <Play className="w-4 h-4" />
                        СТАРТИРАЙ
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {simulationRunning && activeScenario && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-destructive animate-pulse" />
                    <span className="font-display text-sm text-destructive tracking-wider">
                      СИМУЛАЦИЯ В ХОД
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Системите реагират на симулирания сценарий. Всички промени са виртуални и не засягат реалната работа на кораба.
                  </p>
                  <div className="mt-4 space-y-2">
                    <ProgressBar 
                      value={65} 
                      label="ПРОГРЕС НА СИМУЛАЦИЯТА"
                      variant="destructive"
                    />
                  </div>
                </motion.div>
              )}
            </Panel>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DiagnosticsPage;
