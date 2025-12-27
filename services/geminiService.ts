
import { GoogleGenAI, Type } from "@google/genai";
import { SecurityScanResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getAIWritingAssistant = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: `Improve the grammar and professional tone of this cybersecurity article:\n\n${text}`,
      config: {
        systemInstruction: "You are a professional technical editor for a cybersecurity magazine. Focus on clarity, precision, and tone. Use fast reasoning for low latency.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant error:", error);
    return null;
  }
};

export const runSecurityScan = async (code: string): Promise<SecurityScanResult[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform a high-fidelity security audit on the following source code.
      For every vulnerability detected:
      1. Provide a concise vulnerability name.
      2. Identify the exact line number(s).
      3. Capture the exact vulnerable code snippet.
      4. Map it to a CWE ID (e.g., CWE-79, CWE-89).
      5. Detail the risk and potential exploit impact.
      6. Provide a set of clear, actionable mitigation steps.
      7. Provide a detailed explanation of the fix.
      8. Provide a production-ready, secure code fix.

      Return the results as a JSON array. Source Code:
      \n\n${code}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              vulnerability: { type: Type.STRING },
              severity: { type: Type.STRING, enum: ["low", "medium", "high", "critical"] },
              description: { type: Type.STRING },
              remediationExplanation: { type: Type.STRING },
              remediationCode: { type: Type.STRING },
              lineNumber: { type: Type.STRING },
              codeSnippet: { type: Type.STRING },
              cweId: { type: Type.STRING },
              mitigationSteps: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
            },
            required: ["vulnerability", "severity", "description", "remediationExplanation", "remediationCode", "lineNumber", "codeSnippet", "cweId", "mitigationSteps"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Security Scan error:", error);
    return [];
  }
};
