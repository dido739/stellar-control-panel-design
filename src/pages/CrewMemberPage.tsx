import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Users, Shield, Target, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/button";
import { crewData } from "@/data/shipData";

// Import crew images
import commanderImg from "@/assets/crew/commander.jpg";
import scientistImg from "@/assets/crew/scientist.jpg";
import engineerImg from "@/assets/crew/engineer.jpg";
import pilotImg from "@/assets/crew/pilot.jpg";
import medicImg from "@/assets/crew/medic.jpg";
import securityImg from "@/assets/crew/security.jpg";

const avatarMap: Record<string, string> = {
  commander: commanderImg,
  scientist: scientistImg,
  engineer: engineerImg,
  pilot: pilotImg,
  medic: medicImg,
  security: securityImg,
};

const CrewMemberPage = () => {
  const { id } = useParams<{ id: string }>();
  const member = crewData.find((m) => m.id === id);

  if (!member) {
    return <Navigate to="/crew" replace />;
  }

  return (
    <Layout>
      {/* Back navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Button asChild variant="ghost" className="gap-2">
          <Link to="/crew">
            <ChevronLeft className="w-4 h-4" />
            ОБРАТНО КЪМ ЕКИПАЖА
          </Link>
        </Button>
      </div>

      {/* Member profile */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Avatar column */}
              <div className="lg:col-span-2">
                <Panel animate delay={0}>
                  <div className="relative">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border/50">
                      <img
                        src={avatarMap[member.avatar]}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                    
                    {/* Status overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-card/80 backdrop-blur-md border border-border/50">
                        <span className="text-xs font-display tracking-wider text-muted-foreground">
                          СТАТУС
                        </span>
                        <StatusIndicator 
                          status={member.status === "active" ? "operational" : "warning"}
                          label={member.status === "active" ? "АКТИВЕН" : "В РЕЗЕРВ"}
                        />
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>

              {/* Info column */}
              <div className="lg:col-span-3 space-y-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <Shield className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-display text-primary tracking-widest">
                      {member.shortRole} • {member.role}
                    </span>
                  </div>
                  
                  <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-wider mb-2">
                    {member.name}
                  </h1>
                </motion.div>

                {/* Bio panel */}
                <Panel delay={0.2}>
                  <h2 className="font-display text-sm text-primary tracking-wider mb-4">
                    ДОСИЕ
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.fullBio}
                  </p>
                </Panel>

                {/* Skills panel */}
                <Panel delay={0.3}>
                  <h2 className="font-display text-sm text-primary tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    СПЕЦИАЛИЗАЦИИ
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50 text-xs font-display tracking-wider text-foreground"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </Panel>

                {/* Quick stats */}
                <Panel delay={0.4}>
                  <h2 className="font-display text-sm text-primary tracking-wider mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    СТАТИСТИКА
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                      <p className="text-[10px] text-muted-foreground tracking-wider mb-1">
                        МИСИИ
                      </p>
                      <p className="font-display text-xl text-foreground">
                        {Math.floor(Math.random() * 20) + 5}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                      <p className="text-[10px] text-muted-foreground tracking-wider mb-1">
                        ГОДИНИ ОПИТ
                      </p>
                      <p className="font-display text-xl text-foreground">
                        {Math.floor(Math.random() * 15) + 5}
                      </p>
                    </div>
                  </div>
                </Panel>

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button asChild variant="hero" size="lg" className="w-full">
                    <Link to="/crew">
                      <Users className="w-5 h-5" />
                      ВИЖ ОСТАНАЛИЯ ЕКИПАЖ
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CrewMemberPage;
