import React, { ComponentType, SVGProps } from 'react';

interface LevelCompleteModalProps {
    level: number;
    rewardTitle: string;
    RewardIcon: ComponentType<SVGProps<SVGSVGElement>>;
    surpriseMessage: string;
    isLoading: boolean;
    onNextLevel: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({ level, rewardTitle, RewardIcon, surpriseMessage, isLoading, onNextLevel }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all animate-scale-in">
                <h2 className="text-sm font-bold uppercase text-green-500 tracking-widest">Level {level} Complete!</h2>
                <div className="my-4 text-green-600 flex justify-center">
                    <RewardIcon className="w-20 h-20" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">You've earned the "{rewardTitle}" badge!</h3>
                
                <div className="my-6 p-4 bg-green-50 rounded-lg min-h-[80px] flex items-center justify-center">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    ) : (
                        <p className="text-green-800 italic">"{surpriseMessage}"</p>
                    )}
                </div>

                <button
                    onClick={onNextLevel}
                    className="w-full bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
                >
                    Start Level {level + 1}
                </button>
            </div>
        </div>
    );
};
