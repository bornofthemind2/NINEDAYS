
import React from 'react';

interface WelcomeScreenProps {
    onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Welcome to Your Reset</h2>
            <p className="text-gray-600 mb-6">
                Embark on a 9-day juicing program designed to refresh your body and mind. Three levels, three days each. Are you ready?
            </p>
            <button
                onClick={onStart}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
            >
                Start Your 9-Day Journey
            </button>
        </div>
    );
};
