import React from 'react';
import { HappyFeetIcon } from './icons/HappyFeetIcon';

interface GameCompleteScreenProps {
    onRestart: () => void;
}

export const GameCompleteScreen: React.FC<GameCompleteScreenProps> = ({ onRestart }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
            <h2 className="text-3xl font-bold text-green-800 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-4">You have completed the NINE DAYS challenge!</p>
            
            <HappyFeetIcon className="w-32 h-32 text-green-600 my-4" />

            <p className="text-gray-700 font-semibold text-lg">You are the winner of the</p>
            <h3 className="text-2xl font-bold text-green-700 mt-1 mb-6">"Apple of my Cuke"</h3>
            <p className="text-sm text-gray-500 mb-6">You've shown incredible dedication with a perfect run! To claim your special reward, take a screenshot of this screen and send it to the app developer.</p>
            <button
                onClick={onRestart}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
            >
                Start Over
            </button>
        </div>
    );
};