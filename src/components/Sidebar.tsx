import { Plus, MessageSquare, Trash2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  onNewThread: () => void;
  hasMessages: boolean;
}

export function Sidebar({ onNewThread, hasMessages }: SidebarProps) {
  return (
    <aside className="w-[260px] h-screen border-r border-border/50 bg-sidebar flex flex-col shrink-0 relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="p-6 border-b border-border/50 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              aura
            </h1>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2 ml-[42px]">AI reasoning engine</p>
      </div>

      <div className="p-3 flex-1 relative">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewThread}
          className="w-full flex items-center gap-2.5 px-3.5 h-9 rounded-xl text-sm text-muted-foreground border border-border/50 bg-card/40 hover:bg-primary/10 hover:border-primary/30 hover:text-foreground transition-all duration-200"
        >
          <Plus className="h-3.5 w-3.5" />
          New thread
        </motion.button>

        {hasMessages && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-4"
          >
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sidebar-accent-foreground text-sm">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <span className="truncate flex-1">Current thread</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 border-t border-border/50">
        {hasMessages && (
          <button
            onClick={onNewThread}
            className="w-full flex items-center gap-2.5 px-3.5 h-9 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear thread
          </button>
        )}
      </div>
    </aside>
  );
}
