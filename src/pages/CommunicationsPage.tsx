import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Radio, 
  Send, 
  Inbox, 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Signal,
  Satellite
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/button";
import { messagesData } from "@/data/communicationsData";
import { cn } from "@/lib/utils";

const CommunicationsPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(messagesData[0]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [filter, setFilter] = useState<"all" | "incoming" | "outgoing">("all");

  const filteredMessages = messagesData.filter((msg) => {
    if (filter === "all") return true;
    return msg.type === filter;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setNewMessage("");
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "warning": return "text-warning";
      default: return "text-muted-foreground";
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
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-display text-primary tracking-widest">
                СУБПРОСТРАНСТВЕН КАНАЛ АКТИВЕН
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-4">
              КОМУНИКАЦИИ
            </h1>
            
            <p className="text-muted-foreground leading-relaxed">
              Център за управление на комуникациите. Връзка със Земята и всички станции на Обединения космически флот.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Communications dashboard */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Panel delay={0} className="text-center py-4">
                <Signal className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="font-display text-2xl text-foreground">94%</p>
                <p className="text-[10px] text-muted-foreground tracking-wider">СИЛА НА СИГНАЛА</p>
              </Panel>
              <Panel delay={0.1} className="text-center py-4">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-display text-2xl text-foreground">0.003ms</p>
                <p className="text-[10px] text-muted-foreground tracking-wider">ЛАТЕНТНОСТ</p>
              </Panel>
              <Panel delay={0.2} className="text-center py-4">
                <Inbox className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="font-display text-2xl text-foreground">{messagesData.filter(m => !m.read).length}</p>
                <p className="text-[10px] text-muted-foreground tracking-wider">НЕПРОЧЕТЕНИ</p>
              </Panel>
              <Panel delay={0.3} className="text-center py-4">
                <Satellite className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-display text-2xl text-foreground">3</p>
                <p className="text-[10px] text-muted-foreground tracking-wider">АКТИВНИ КАНАЛИ</p>
              </Panel>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Message list */}
              <div className="lg:col-span-1">
                <Panel delay={0.4}>
                  <PanelHeader
                    title="СЪОБЩЕНИЯ"
                    icon={<Inbox className="w-5 h-5" />}
                    status={<StatusIndicator status="operational" size="sm" />}
                  />

                  {/* Filter buttons */}
                  <div className="flex gap-2 mb-4">
                    {[
                      { key: "all", label: "ВСИЧКИ" },
                      { key: "incoming", label: "ВХОДЯЩИ" },
                      { key: "outgoing", label: "ИЗХОДЯЩИ" },
                    ].map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setFilter(f.key as typeof filter)}
                        className={cn(
                          "px-3 py-1 text-[10px] font-display tracking-wider rounded-md transition-all",
                          filter === f.key
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Message list */}
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {filteredMessages.map((msg) => (
                      <motion.button
                        key={msg.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setSelectedMessage(msg)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border transition-all",
                          selectedMessage?.id === msg.id
                            ? "bg-primary/10 border-primary/30"
                            : "bg-muted/20 border-border/30 hover:border-primary/20"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            {msg.type === "incoming" ? (
                              <ArrowDownLeft className="w-3 h-3 text-success" />
                            ) : (
                              <ArrowUpRight className="w-3 h-3 text-primary" />
                            )}
                            <span className={cn(
                              "text-[10px] font-display tracking-wider",
                              getPriorityColor(msg.priority)
                            )}>
                              {msg.priority === "high" && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                              {msg.type === "incoming" ? msg.from : msg.to}
                            </span>
                          </div>
                          {!msg.read && (
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs text-foreground truncate">{msg.subject}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{msg.timestamp}</p>
                      </motion.button>
                    ))}
                  </div>
                </Panel>
              </div>

              {/* Message viewer */}
              <div className="lg:col-span-2 space-y-6">
                <Panel delay={0.5}>
                  <PanelHeader
                    title="ПРЕГЛЕД НА СЪОБЩЕНИЕ"
                    icon={selectedMessage?.type === "incoming" ? 
                      <ArrowDownLeft className="w-5 h-5" /> : 
                      <ArrowUpRight className="w-5 h-5" />
                    }
                  />

                  {selectedMessage ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedMessage.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/30">
                          <div>
                            <p className="text-xs text-muted-foreground tracking-wider">
                              {selectedMessage.type === "incoming" ? "ОТ:" : "ДО:"}
                            </p>
                            <p className="font-display text-sm text-primary">
                              {selectedMessage.type === "incoming" ? selectedMessage.from : selectedMessage.to}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground tracking-wider">ДАТА:</p>
                            <p className="text-xs text-foreground">{selectedMessage.timestamp}</p>
                          </div>
                        </div>

                        <h3 className="font-display text-lg text-foreground mb-4">
                          {selectedMessage.subject}
                        </h3>

                        <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {selectedMessage.content}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="text-xs text-success">Съобщението е декриптирано успешно</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      Изберете съобщение от списъка
                    </p>
                  )}
                </Panel>

                {/* Send message */}
                <Panel delay={0.6}>
                  <PanelHeader
                    title="ИЗПРАЩАНЕ НА СИГНАЛ"
                    icon={<Send className="w-5 h-5" />}
                  />

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground tracking-wider block mb-2">
                        ПОЛУЧАТЕЛ
                      </label>
                      <select className="w-full bg-muted/30 border border-border/50 rounded-lg px-4 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none">
                        <option>Централно командване - Земя</option>
                        <option>Космическа станция Титан</option>
                        <option>Научен институт Марс</option>
                        <option>Всички станции (Broadcast)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground tracking-wider block mb-2">
                        СЪОБЩЕНИЕ
                      </label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Въведете съобщение..."
                        className="w-full h-32 bg-muted/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Очаквано време за доставка: ~4.2 часа (8.6 светлинни години)
                      </p>
                      <Button 
                        variant="hero" 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isSending}
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ИЗПРАЩАНЕ...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            ИЗПРАТИ СИГНАЛ
                          </>
                        )}
                      </Button>
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

export default CommunicationsPage;
