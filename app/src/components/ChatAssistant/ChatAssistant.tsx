import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { siteData } from "../../data/siteData";

interface Message {
  role: "bot" | "user";
  text: string;
}

const FALLBACK = "I don't have a canned answer for that yet — try asking about experience, AI tools, tech stack, or how to get in touch. Or use the contact form below!";

function answer(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of siteData.chatFAQ) {
    if (faq.keys.some((key) => lower.includes(key))) return faq.answer;
  }
  return FALLBACK;
}

export const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Hi! I'm a rule-based assistant (not an LLM) that can answer quick questions about ${siteData.identity.firstName}'s experience, AI tools, and stack. Try asking!` },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: answer(text) }]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_rgba(139,92,246,0.5)] flex items-center justify-center"
        aria-label="Open chat assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[min(360px,calc(100vw-3rem))] h-[min(480px,60vh)] glass-panel rounded-3xl border border-foreground/10 shadow-2xl flex flex-col overflow-hidden bg-card/95"
          >
            <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between shrink-0">
              <div>
                <h4 className="font-bold text-sm text-foreground">Ask about {siteData.identity.firstName}</h4>
                <p className="text-[11px] text-muted-foreground">Rule-based assistant · not an LLM</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === "user" ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-foreground border border-foreground/10"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border/60 flex items-center gap-2 shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question…"
                className="flex-1 bg-foreground/5 border border-foreground/10 rounded-full px-4 py-2 text-sm outline-none focus:border-primary/40 text-foreground placeholder:text-muted-foreground/60"
              />
              <button
                onClick={send}
                className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
