import React from 'react';

interface ProgressIndicatorProps {
    currentDay: number;
    currentLevel: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentDay, currentLevel }) => {
    const dayInLevel = (currentDay - 1) % 3 + 1;
    const levelProgress = (dayInLevel / 3) * 100;
    const overallProgress = (currentDay / 9) * 100;

    return (
        <div className="w-full px-2 mb-4 space-y-3">
            {/* Level Progress */}
            <div>
                <div className="flex justify-between items-center text-sm text-green-700 mb-1">
                    <span>Level {currentLevel} Progress</span>
                    <span>Day {dayInLevel} of 3</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2.5">
                    <div 
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${levelProgress}%` }}
                    ></div>
                </div>
            </div>

            {/* Overall Progress */}
            <div>
                 <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                    <span>Overall Journey</span>
                    <span>Day {currentDay} of 9</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-gray-400 h-2.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${overallProgress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};