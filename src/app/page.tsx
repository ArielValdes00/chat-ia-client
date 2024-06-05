"use client"
import { useState } from "react";
import Chatbox from "./components/Chatbox";
import Sidebar from "./components/Sidebar";

export default function Home() {
    const [isLogged, setIsLogged] = useState<boolean>(true);

    const {
        GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold,
    } = require("@google/generative-ai");

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    async function run() {
        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
        });


        const result = await chatSession.sendMessage("hola");
        console.log(result.response.text());
    }

    return (
        <main className="h-screen flex">
            <Sidebar isLogged={isLogged}/>
            <Chatbox isLogged={isLogged}/>
        </main>
    );
}
