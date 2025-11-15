
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

export const getDailyAffirmation = async (day: number): Promise<string> => {
    if (!API_KEY) {
        // Fallback affirmations
        const fallbacks = [
            "You are worthy of this transformation. Your body deserves nourishment.",
            "Every sip brings you closer to your best self. You are enough.",
            "Your commitment to health is a gift you give yourself. You deserve it.",
            "Today is your day to shine. You are strong and capable.",
            "Your wellness journey is unique and valuable. Trust the process.",
            "You are worthy of feeling vibrant and healthy. Embrace this moment.",
            "Your dedication inspires. You are making a difference in your life.",
            "Today holds promise. You are ready for this beautiful change.",
            "Your health matters. You are deserving of this care and attention."
        ];
        return fallbacks[(day - 1) % fallbacks.length];
    }
    try {
        const prompt = `Generate a short, positive affirmation for someone starting Day ${day} of a 9-day juice cleanse. Make it empowering, about self-worth and health. Keep it under 20 words.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error fetching affirmation:", error);
        return "You are worthy of this journey. Every step forward is a victory.";
    }
};

// Mock produceIQ prices for organic produce (demo - in real app, this would be API calls)
const MOCK_PRICES: Record<string, number> = {
    'Cucumbers': 3.49,
    'Green Apples': 3.99,
    'Kale': 5.99,
    'Parsley': 4.49,
    'Cilantro': 2.99,
    'Spinach': 6.49,
    'Lemons': 1.49,
    'Carrots': 2.49,
    'Romaine Lettuce': 4.99,
    'Celery': 3.99,
    'Beets': 4.49,
    'Ginger': 7.99,
};

export const getProducePrice = async (produceName: string, quantity: string): Promise<number> => {
    // Use mock prices for demo, in production this would call produceIQ API
    return MOCK_PRICES[produceName] || 2.5;

    // Uncomment below for real API integration
    /*
    if (!API_KEY) {
        return MOCK_PRICES[produceName] || 2.5;
    }
    try {
        const prompt = `What is the current average retail price per unit for ${produceName} in the US? Consider the quantity "${quantity}". Provide only the price as a number in dollars, no other text.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const priceText = response.text.trim();
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        return isNaN(price) ? MOCK_PRICES[produceName] || 2.5 : price;
    } catch (error) {
        console.error("Error fetching produce price:", error);
        return MOCK_PRICES[produceName] || 2.5;
    }
    */
};
