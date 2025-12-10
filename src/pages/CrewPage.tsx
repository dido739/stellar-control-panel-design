import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";
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

const CrewPage = () => {
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
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-primary tracking-widest">
                ЛИЧЕН СЪСТАВ
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-4">
              ЕКИПАЖ НА МИСИЯТА
            </h1>
            
            <p className="text-muted-foreground leading-relaxed">
              Запознайте се с елитния екипаж на Aurora Eternis - 
              най-добрите специалисти от Обединения космически флот, 
              избрани за историческата мисия Stellar Dawn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Crew grid */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {crewData.map((member, index) => (
              <Panel 
                key={member.id} 
                delay={index * 0.1}
                className="group hover:border-primary/50 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="aspect-square rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/30 transition-colors">
                    <img
                      src={avatarMap[member.avatar]}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  
                  {/* Role badge */}
                  <div className="absolute -bottom-3 left-4 px-3 py-1 bg-secondary border border-border rounded-md">
                    <span className="font-display text-xs text-primary tracking-wider">
                      {member.shortRole}
                    </span>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute top-3 right-3">
                    <StatusIndicator 
                      status={member.status === "active" ? "operational" : "warning"} 
                      size="md"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="pt-2">
                  <h3 className="font-display text-lg text-foreground tracking-wide mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-primary/80 font-display tracking-wider mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {member.bio}
                  </p>
                  
                  <Button asChild variant="panel" className="w-full group-hover:border-primary/50">
                    <Link to={`/crew/${member.id}`}>
                      ПОВЕЧЕ ИНФОРМАЦИЯ
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CrewPage;
