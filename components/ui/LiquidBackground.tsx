"use client";

import { motion } from "framer-motion";

export function LiquidBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-italy-dark">

            {/* Neon Green Blob */}
            <motion.div
                className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-italy-neon-green/10 rounded-full blur-[120px]"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Neon Red Blob */}
            <motion.div
                className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-italy-neon-red/10 rounded-full blur-[120px]"
                animate={{
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Center Glow */}
            <motion.div
                className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-italy-neon-green/5 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
