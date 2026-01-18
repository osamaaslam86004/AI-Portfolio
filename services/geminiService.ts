
import { GoogleGenAI, Type } from "@google/genai";
import { DEVELOPER_INFO, SKILLS, PROJECTS } from "../constants";

const getApiKey = () => process.env.API_KEY || "";

export const chatWithGemini = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  
  const systemInstruction = `
    You are an AI assistant representing ${DEVELOPER_INFO.name}, a ${DEVELOPER_INFO.role}. 
    Your goal is to answer questions about their career, skills, and projects based on the provided context.
    
    Context:
    - Bio: ${DEVELOPER_INFO.bio}
    - Skills: ${SKILLS.map(s => `${s.name} (${s.level}%)`).join(", ")}
    - Projects:
      ${PROJECTS.map(p => `
      * ${p.title}
        - Description: ${p.description}
        - Tech Stack: ${p.tags.join(", ")}
        - Details: ${p.longDescription || "No detailed description available."}
      `).join("\n")}
    
    Guidelines:
    - Be professional, technical, and concise.
    - If a question is unrelated to the portfolio, politely steer it back to the developer's expertise.
    - Highlight Django and Python expertise when relevant.
    - Use Markdown for formatting.
    - You represent Alex directly; use "I" or "my" where appropriate but remain professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my neural network right now. Please try again later!";
  }
};
