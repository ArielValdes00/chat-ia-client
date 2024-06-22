import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ERROR_MESSAGE } from "./constants";

const MODEL_PRO_VISION = "gemini-pro-vision";
const MODEL_TEXT = "gemini-1.5-flash";

export const generateAIResponse = async (promptValue: string, file?: File | null) => {
    try {
        const modelType = file ? MODEL_PRO_VISION : MODEL_TEXT;
        const chatSession = await initializeChatSession(modelType);
        const result = await sendMessageToAI(chatSession, promptValue, file || null);
        const formattedResponse = result.response.text();
        return {
            content: formattedResponse,
            timestamp: new Date().toISOString(),
            sender: "ai",
        };
    } catch (error) {
        console.error("Error in generateAIResponse:", error);

        return {
            content: ERROR_MESSAGE,
            timestamp: new Date().toISOString(),
            sender: "ai",
        };
    }
};

export const initializeChatSession = async (modelType: string) => {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: modelType });

    return model.startChat({
        generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        },
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ],
        history: [],
    });
};

const sendMessageToAI = async (chatSession: any, promptValue: string, file?: File | null) => {
    try {
        let image = null;

        if (file) {
            const base64 = await convertFileToBase64(file);
            image = {
                inlineData: {
                    data: base64?.split(',')[1],
                    mimeType: file.type,
                },
            };
        }

        const messagePayload = image ? [promptValue, image] : promptValue;

        const result = await chatSession.sendMessage(messagePayload);

        return result;
    } catch (error) {
        console.error('Error in sendMessageToAI:', error);
        throw error;
    }
};

const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            } else {
                reject(new Error("File reading failed"));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};
