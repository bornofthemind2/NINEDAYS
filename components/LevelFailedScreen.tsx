import React from 'react';

interface LevelFailedScreenProps {
    onPurchaseToRestart: () => void;
    onQuit: () => void;
}

export const LevelFailedScreen: React.FC<LevelFailedScreenProps> = ({ onPurchaseToRestart, onQuit }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
            <h2 className="text-2xl font-bold text-red-700 mb-2">Level Failed</h2>
            <p className="text-gray-600 mb-6">
                Looks like you missed a few too many juice prompts. Consistency is key! You'll need to purchase the produce again to restart the level.
            </p>
            <div className="w-full mt-4">
                <button
                    onClick={onPurchaseToRestart}
                    className="w-full bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg mb-3"
                >
                    Purchase Produce to Restart
                </button>
                <button
                    onClick={onQuit}
                    className="w-full bg-gray-500 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-lg"
                >
                    Quit & Start Over
                </button>
            </div>
        </div>
    );
};
