import Image from "next/image";
import { Hero } from "@/components/ui/Hero";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { ChatInterface } from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      <LiquidBackground />

      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col h-screen">
        <Hero />
        <ChatInterface />
      </div>
    </main>
  );
}
