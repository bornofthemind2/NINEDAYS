import React from 'react';

interface LevelDecisionScreenProps {
    onProceed: () => void;
    onRestart: () => void;
}

export const LevelDecisionScreen: React.FC<LevelDecisionScreenProps> = ({ onProceed, onRestart }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
            <h2 className="text-2xl font-bold text-yellow-700 mb-2">It's a Tie!</h2>
            <p className="text-gray-600 mb-6">
                You had an equal number of timely and missed juices this level. It's your call: do you feel ready to move on, or do you want to master this level first?
            </p>
            <div className="w-full mt-4">
                <button
                    onClick={onProceed}
                    className="w-full bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg mb-3"
                >
                    Proceed to Next Level
                </button>
                <button
                    onClick={onRestart}
                    className="w-full bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
                >
                    Restart Level (Re-purchase)
                </button>
            </div>
        </div>
    );
};
