import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedSolution } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateArchitecture = async (requirements: string): Promise<GeneratedSolution> => {
  const modelId = "gemini-3-pro-preview";

  const systemInstruction = `
    You are a world-class Senior Backend Engineer specializing in C#, ASP.NET Core 8, and High-Performance Distributed Systems.
    Your goal is to generate robust, production-ready code snippets based on the user's architectural requirements.
    
    Focus on:
    1. Dependency Injection best practices.
    2. Resiliency (Polly, try-catch, fallback logic).
    3. Performance (Async/Await, Caching, Concurrency).
    4. Code Cleanliness (File-scoped namespaces, C# 12 features).

    Return the response as a structured JSON object containing the content for specific key files: Program.cs, AggregatorService.cs, and AggregatorController.cs, along with a brief architectural explanation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: requirements,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            programCs: {
              type: Type.STRING,
              description: "The full content of Program.cs including DI setup.",
            },
            aggregatorServiceCs: {
              type: Type.STRING,
              description: "The implementation of the AggregatorService class.",
            },
            aggregatorControllerCs: {
              type: Type.STRING,
              description: "The minimal controller implementation.",
            },
            explanation: {
              type: Type.STRING,
              description: "A brief summary of the architectural decisions made.",
            },
          },
          required: ["programCs", "aggregatorServiceCs", "aggregatorControllerCs", "explanation"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedSolution;
    }
    
    throw new Error("No content generated.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};