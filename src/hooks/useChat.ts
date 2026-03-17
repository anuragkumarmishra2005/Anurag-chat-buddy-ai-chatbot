import { useState, useCallback } from "react";
import { Message, streamChat } from "@/lib/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (input: string) => {
    if (!input.trim() || isStreaming) return;
    setError(null);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    let assistantContent = "";
    const assistantId = crypto.randomUUID();

    const upsert = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.id === assistantId) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [
          ...prev,
          { id: assistantId, role: "assistant" as const, content: assistantContent, timestamp: new Date() },
        ];
      });
    };

    try {
      const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));
      await streamChat({
        messages: history,
        onDelta: upsert,
        onDone: () => setIsStreaming(false),
      });
    } catch (e) {
      setIsStreaming(false);
      setError(e instanceof Error ? e.message : "An error occurred");
    }
  }, [messages, isStreaming]);

  const clear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isStreaming, error, send, clear };
}
