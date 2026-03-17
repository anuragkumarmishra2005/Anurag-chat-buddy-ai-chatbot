import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function ThoughtTrace() {
  return (
    <motion.div
      className="flex items-center gap-2 py-4 pl-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <Sparkles className="h-3 w-3 text-primary-foreground" />
      </div>
      <div className="flex items-center gap-1.5 ml-1">
        <div className="thought-dot" />
        <div className="thought-dot" />
        <div className="thought-dot" />
        <div className="thought-dot" />
      </div>
      <span className="ml-1.5 text-xs text-muted-foreground shimmer-text">
        thinking…
      </span>
    </motion.div>
  );
}
