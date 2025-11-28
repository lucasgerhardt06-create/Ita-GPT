"use client";

import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { InputArea } from "./InputArea";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (content: string) => {
        const userMessage: Message = { role: "user", content };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.json();
            const assistantMessage: Message = { role: "assistant", content: data.content };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error:", error);
            // Fallback for demo/error
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Mi dispiace, c'è stato un errore. Riprova più tardi." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col h-full relative z-10">
            <div className="glass rounded-3xl overflow-hidden flex flex-col h-[70vh] shadow-2xl border border-white/5 relative bg-[#111613]/80">
                {/* Card Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-italy-neon-green to-italy-neon-green/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,148,0.3)]">
                            <span className="text-italy-dark font-bold text-lg">AI</span>
                        </div>
                        <div>
                            <h2 className="text-white font-display font-semibold text-xl">Tutor Italiano</h2>
                            <p className="text-italy-neon-green text-xs uppercase tracking-wider font-medium">Online • Gemini Pro</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-italy-neon-red/20 border border-italy-neon-red/50" />
                        <div className="w-3 h-3 rounded-full bg-italy-neon-green/20 border border-italy-neon-green/50" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar bg-transparent">
                    <AnimatePresence initial={false}>
                        {messages.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-italy-text-muted mt-20 italic font-light"
                            >
                                Inizia la conversazione in qualsiasi lingua...
                            </motion.div>
                        )}
                        {messages.map((msg, index) => (
                            <MessageBubble
                                key={index}
                                role={msg.role}
                                content={msg.content}
                                isLatest={index === messages.length - 1}
                            />
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-6 bg-black/20 border-t border-white/5 backdrop-blur-md">
                    <InputArea onSend={handleSend} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
