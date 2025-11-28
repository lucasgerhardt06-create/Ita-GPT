import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return NextResponse.json({
                content: "Ciao! Non ho trovato una chiave API Gemini configurata. Aggiungi GEMINI_API_KEY nel file .env.local per chattare con me. (Modalità Demo)",
            });
        }

        const systemPrompt = `Sei un'insegnante di italiano severa ma incoraggiante. 
DEVI rispondere SEMPRE e SOLO in italiano, indipendentemente dalla lingua usata dall'utente. 
Il tuo tono deve essere accademico, pedagogico e chiaro. 
Correggi gli errori dell'utente se necessario, ma mantieni la conversazione fluida.
Usa un vocabolario ricco ma comprensibile per chi sta imparando.`;

        // Build conversation history for Gemini
        const contents = [
            {
                role: "user",
                parts: [{ text: systemPrompt }],
            },
            {
                role: "model",
                parts: [{ text: "Ho capito. Sarò la tua insegnante di italiano. Iniziamo la lezione." }],
            },
        ];

        // Add conversation history
        for (const msg of messages) {
            contents.push({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
            });
        }

        // Call Google Generative Language API with Gemini 2.0 Flash
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2048,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "Mi dispiace, non ho ricevuto una risposta.";

        return NextResponse.json({ content });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        console.error("Error details:", error?.message);

        return NextResponse.json({
            content: `Mi dispiace, c'è stato un errore con l'API Gemini. Dettagli: ${error?.message || "Errore sconosciuto"}. Verifica che la tua chiave API sia valide.`,
        });
    }
}
