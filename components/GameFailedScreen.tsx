import React from 'react';

interface GameFailedScreenProps {
    onRestart: () => void;
    imperfect?: boolean;
}

export const GameFailedScreen: React.FC<GameFailedScreenProps> = ({ onRestart, imperfect = false }) => {
    const title = imperfect ? "Almost Perfect!" : "It's Okay to Pause";
    const message = imperfect
        ? "You've completed the 9-day challenge, which is a fantastic achievement! To unlock the final medal and special reward, you need a perfect record with no missed juices. Try again for a perfect run!"
        : "Every step on a health journey is valuable. Come back whenever you're ready to start your 9-day journey again.";
    const buttonText = imperfect ? "Restart for Perfection" : "Start Over";

    return (
        <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
            <h2 className={`text-2xl font-bold ${imperfect ? 'text-green-800' : 'text-gray-700'} mb-2`}>{title}</h2>
            <p className="text-gray-600 mb-6">
                {message}
            </p>
            <button
                onClick={onRestart}
                className={`${imperfect ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'} text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg`}
            >
                {buttonText}
            </button>
        </div>
    );
};