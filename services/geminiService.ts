
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // This is a fallback for development and will show an alert.
    // In the target environment, process.env.API_KEY is expected to be set.
    console.warn("API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const rewardPrompts = [
    // Level 1 Prompt
    "Generate a short, fun, and surprising reward message for someone who just completed a 3-day health challenge focused on root vegetables. It could be a weird fact about a carrot, a one-sentence fictional story about a heroic beet, or a funny compliment. Keep it under 25 words.",
    // Level 2 Prompt
    "Generate a short, fun, and surprising reward message for someone who just completed a 3-day health challenge focused on green juices. It could be a cool fact about spinach, a one-sentence poem about cucumber, or a funny compliment about being green. Keep it under 25 words.",
    // Level 3 Prompt
    "Generate a short, fun, and surprising reward message for someone who just completed the final 3 days of a 9-day juice challenge, this time with tropical/zesty fruits. It should be celebratory and fun. It could be a fun fact about pineapples or a compliment. Keep it under 25 words."
];

export const getSurpriseReward = async (levelIndex: number): Promise<string> => {
    if (!API_KEY) {
        return "You're doing amazing! Keep up the great work on your health journey!";
    }
    try {
        const prompt = rewardPrompts[levelIndex] || rewardPrompts[0];
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error fetching surprise reward:", error);
        return "You've got the spirit! Your determination is your greatest reward.";
    }
};
