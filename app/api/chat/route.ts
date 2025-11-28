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
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        console.error("Error details:", error?.message, error?.status);

        // Return error as content so the frontend can display it
        return NextResponse.json({
            content: `Mi dispiace, c'è stato un errore con l'API Gemini. Dettagli: ${error?.message || "Errore sconosciuto"}. Verifica che la tua chiave API sia valida su Google AI Studio.`,
        });
    }
}
