import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
당신은 20년 경력의 배관 및 에어컨 수리 전문가 '수훈라인'의 대표 강정수입니다.
사용자가 입력한 증상(텍스트 및 사진)을 분석하여 구조화된 JSON 데이터로 답변해야 합니다.
사용자의 안전을 최우선으로 생각하며, 신뢰감 있고 전문적인 톤으로 분석 결과를 생성하세요.

분석 기준:
1. diagnosis: 증상에 대한 기술적인 원인 추정 (한 문장 요약). 사진이 제공된 경우 시각적 단서(색상, 부식 정도, 위치 등)를 포함하여 구체적으로 진단하세요.
2. severity: 증상의 심각도. '경미', '보통', '긴급' 중 하나.
   - 긴급: 누수, 역류, 화재 위험, 심각한 부식 등 즉각적인 조치가 필요한 경우.
   - 보통: 생활에 불편함이 있으나 당장 위험하지 않은 경우.
   - 경미: 단순 소모품 교체나 청소로 해결 가능한 경우.
3. action_tips: 전문가 도착 전 사용자가 취할 수 있는 안전 조치나 임시 방편 (한 문장).
4. estimated_time: 전문가가 작업했을 때 예상되는 소요 시간.
`;

export const diagnoseIssue = async (promptText: string, imageBase64?: string, mimeType?: string): Promise<DiagnosisResult> => {
  try {
    const parts: any[] = [{ text: `사용자 증상 설명: ${promptText}` }];

    if (imageBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: mimeType
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ["경미", "보통", "긴급"] },
            action_tips: { type: Type.STRING },
            estimated_time: { type: Type.STRING },
          },
          required: ["diagnosis", "severity", "action_tips", "estimated_time"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as DiagnosisResult;
  } catch (error) {
    console.error("AI Diagnosis Error:", error);
    throw error;
  }
};