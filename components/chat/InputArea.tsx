"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface InputAreaProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export function InputArea({ onSend, isLoading }: InputAreaProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [input]);

    return (
        <div className="relative w-full mx-auto">
            <div className="glass-input rounded-2xl p-2 flex items-end gap-2 shadow-lg group focus-within:ring-1 focus-within:ring-italy-neon-green/30 transition-all duration-300">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Chiedi qualcosa in italiano..."
                    className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 px-4 text-white placeholder:text-italy-text-muted/50"
                    rows={1}
                    disabled={isLoading}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-italy-neon-green text-italy-dark p-3 rounded-xl hover:bg-italy-neon-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 mb-1 mr-1 shadow-[0_0_10px_rgba(0,255,148,0.4)]"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-italy-dark/30 border-t-italy-dark rounded-full animate-spin" />
                    ) : (
                        <Send size={20} className="stroke-[2.5px]" />
                    )}
                </motion.button>
            </div>
        </div>
    );
}
