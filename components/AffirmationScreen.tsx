import React, { useState, useEffect } from 'react';
import { getDailyAffirmation } from '../services/geminiService';

interface AffirmationScreenProps {
    onContinue: () => void;
    day: number;
}

export const AffirmationScreen: React.FC<AffirmationScreenProps> = ({ onContinue, day }) => {
    const [affirmation, setAffirmation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadAffirmation = async () => {
            setIsLoading(true);
            const affirmationText = await getDailyAffirmation(day);
            setAffirmation(affirmationText);
            setIsLoading(false);
        };

        loadAffirmation();
    }, [day]);

    return (
        <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
            <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-green-800 mb-6">Day {day} Affirmation</h2>

                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-8">
                    {isLoading ? (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Preparing your affirmation...</p>
                        </div>
                    ) : (
                        <p className="text-lg text-green-800 font-medium leading-relaxed italic">
                            "{affirmation}"
                        </p>
                    )}
                </div>

                <button
                    onClick={onContinue}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg text-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    I Am Worth It
                </button>

                <p className="text-sm text-gray-500 mt-4">
                    Take a moment to breathe and affirm your commitment to this journey.
                </p>
            </div>
        </div>
    );
};