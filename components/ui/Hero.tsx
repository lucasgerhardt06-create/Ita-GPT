"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
            >
                <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white mb-2 drop-shadow-2xl">
                    ITA<span className="text-italy-neon-green">-GPT</span>
                </h1>
                <motion.div
                    className="absolute -inset-10 bg-italy-neon-green/20 blur-[100px] -z-10 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg md:text-xl text-italy-text-muted max-w-md mx-auto font-light"
            >
                Il tuo tutor personale di italiano.
                <br />
                <span className="text-sm text-italy-neon-red font-medium tracking-wider uppercase mt-2 block animate-pulse">
                    Powered by Gemini
                </span>
            </motion.p>
        </div>
    );
}
