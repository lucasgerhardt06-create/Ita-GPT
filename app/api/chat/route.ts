import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Mock response if no API key is present
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return NextResponse.json({
                content: "Ciao! Non ho trovato una chiave API Gemini configurata. Aggiungi GEMINI_API_KEY nel file .env.local per chattare con me. (Modalità Demo)",
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `Sei un'insegnante di italiano severa ma incoraggiante. 
    DEVI rispondere SEMPRE e SOLO in italiano, indipendentemente dalla lingua usata dall'utente. 
    Il tuo tono deve essere accademico, pedagogico e chiaro. 
    Correggi gli errori dell'utente se necessario, ma mantieni la conversazione fluida.
    Usa un vocabolario ricco ma comprensibile per chi sta imparando.`;

        // Convert messages to Gemini format
        // Note: Gemini history format is slightly different, but for single turn or simple chat, we can construct the prompt.
        // For better context, we should format the history.

        const chatHistory = messages.slice(0, -1).map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        const lastMessage = messages[messages.length - 1].content;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Ho capito. Sarò la tua insegnante di italiano. Iniziamo la lezione." }],
                },
                ...chatHistory,
            ],
        });

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const content = response.text();

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Errore nella comunicazione con l'IA." },
            { status: 500 }
        );
    }
}
