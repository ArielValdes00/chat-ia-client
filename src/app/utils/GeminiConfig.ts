import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ERROR_MESSAGE } from "./constants";

export const generateAIResponse = async (promptValue: string) => {
  try {
    const chatSession = await initializeChatSession();
    const result = await sendMessageToAI(chatSession, promptValue);
    const formattedResponse = result.response.text();
    return {
      content: formattedResponse,
      timestamp: new Date().toISOString(), 
      sender: "ai",
    };
  } catch (error) {
    console.error("Error in generate AIResponse:", error);
    return {
      content: ERROR_MESSAGE,
      timestamp: new Date().toISOString(),
      sender: "ai",
    };
  }
};

export const initializeChatSession = async () => {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

export const sendMessageToAI = async (chatSession: any, promptValue: string) => {
  const result = await chatSession.sendMessage(promptValue);
  return result; 
};