import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { Message } from "@/lib/chat";
import { User, Sparkles } from "lucide-react";

export function MessageBlock({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`block-container ${isUser ? "border-muted/30" : ""}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
          isUser 
            ? "bg-muted border border-border/50" 
            : "bg-gradient-to-br from-primary to-accent"
        }`}>
          {isUser ? (
            <User className="h-3 w-3 text-muted-foreground" />
          ) : (
            <Sparkles className="h-3 w-3 text-primary-foreground" />
          )}
        </div>
        <span className="text-xs font-medium text-muted-foreground tracking-wide">
          {isUser ? "You" : "Aura"}
        </span>
        <span className="text-[10px] text-muted-foreground/40 tabular-nums ml-auto">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {isUser ? (
        <p className="text-foreground leading-relaxed ml-[34px]" style={{ fontSize: 15 }}>
          {message.content}
        </p>
      ) : (
        <div className="prose-aura ml-[34px]">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      )}
    </motion.div>
  );
}
