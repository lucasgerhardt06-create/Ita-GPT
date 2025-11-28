"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MessageBubbleProps {
    role: "user" | "assistant";
    content: string;
    isLatest?: boolean;
}

export function MessageBubble({ role, content, isLatest }: MessageBubbleProps) {
    const [displayedContent, setDisplayedContent] = useState(role === "user" ? content : "");
    const isUser = role === "user";

    useEffect(() => {
        if (isUser || !isLatest) {
            setDisplayedContent(content);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i < content.length) {
                setDisplayedContent((prev) => prev + content.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 20); // Typing speed

        return () => clearInterval(interval);
    }, [content, isUser, isLatest]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
                "flex w-full mb-4",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed relative overflow-hidden",
                    isUser
                        ? "bg-italy-neon-green/10 border border-italy-neon-green/20 text-white rounded-tr-sm shadow-[0_0_15px_rgba(0,255,148,0.05)]"
                        : "glass-card text-gray-200 rounded-tl-sm border-l-4 border-l-italy-neon-red"
                )}
            >
                {isUser && <div className="absolute inset-0 bg-gradient-to-br from-italy-neon-green/5 to-transparent pointer-events-none" />}
                <p className="whitespace-pre-wrap relative z-10">{displayedContent}</p>
            </div>
        </motion.div>
    );
}
