import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Loader2 } from "lucide-react";

interface PromptBarProps {
  onSubmit: (text: string) => void;
  isStreaming: boolean;
}

export function PromptBar({ onSubmit, isStreaming }: PromptBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isStreaming) textareaRef.current?.focus();
  }, [isStreaming]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const submit = () => {
    if (!value.trim() || isStreaming) return;
    onSubmit(value);
    setValue("");
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <motion.div
      className="sticky bottom-0 w-full max-w-[800px] mx-auto px-6 pb-6 pt-2 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative group">
        {/* Glow effect behind input */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
        
        <div className="relative glass-card rounded-2xl transition-all duration-300 group-focus-within:border-primary/30">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything…"
            disabled={isStreaming}
            rows={1}
            className="w-full resize-none bg-transparent px-5 py-4 pr-14 text-foreground placeholder:text-muted-foreground/60 text-[15px] leading-relaxed focus:outline-none disabled:opacity-50 rounded-2xl"
          />
          <button
            onClick={submit}
            disabled={!value.trim() || isStreaming}
            className="absolute right-3 bottom-3 h-9 w-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground transition-all duration-200 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] active:scale-95 disabled:opacity-20 disabled:pointer-events-none disabled:shadow-none"
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <p className="text-center text-[11px] text-muted-foreground/40 mt-2.5">
        <kbd className="px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground/50 text-[10px]">Shift+Enter</kbd>
        {" "}newline · {" "}
        <kbd className="px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground/50 text-[10px]">Enter</kbd>
        {" "}send
      </p>
    </motion.div>
  );
}
