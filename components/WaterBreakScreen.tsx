import React, { useEffect, useState } from 'react';

const WaterBottle: React.FC<{ filled: boolean, onClick: () => void }> = ({ filled, onClick }) => (
    <img src="/images/water.png" alt="Water Bottle" className="w-20 h-32 mx-auto cursor-pointer object-contain" onClick={onClick} />
);

interface WaterBreakScreenProps {
    onComplete: () => void;
    juicesConsumed: number;
    isTimely: boolean;
    elapsed: number;
    missedResponses: number;
    isNightRest?: boolean;
}

export const WaterBreakScreen: React.FC<WaterBreakScreenProps> = ({ onComplete, juicesConsumed, isTimely, elapsed, missedResponses, isNightRest = false }) => {
    // For night rest, use a longer timer (8 hours) and different logic
    const baseTimer = isNightRest ? 8 * 60 * 60 : 6 * 60 * 60; // 8 hours for night, 6 for regular
    const adjustedTimer = isNightRest ? baseTimer : Math.max(60, baseTimer - Math.floor(elapsed / 1000));
    const [selectedBottles, setSelectedBottles] = useState<boolean[]>(isNightRest ? [true, true, true, true] : [false, false, false, false]); // Pre-filled for night rest
    const [continueTimer, setContinueTimer] = useState(adjustedTimer);

    useEffect(() => {
        // Timer for continue button (6 hours)
        if (continueTimer > 0) {
            const timer = setTimeout(() => setContinueTimer(continueTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [continueTimer]);

    const handleBottleClick = (index: number) => {
        setSelectedBottles(prev => {
            const newSelected = [...prev];
            newSelected[index] = !newSelected[index];
            return newSelected;
        });
    };

    const allBottlesSelected = selectedBottles.every(selected => selected);
    const canContinue = allBottlesSelected || continueTimer <= 0;

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="text-center flex flex-col items-center justify-between h-full animate-fade-in">
             <div>
                 <h2 className="text-2xl font-bold text-blue-800 mb-2">
                     {isNightRest ? 'Night Rest & Hydration' : 'Water Break'}
                 </h2>
                 <p className="text-gray-600 mb-4">
                     {isNightRest
                         ? 'Take time to rest and stay hydrated overnight. Your bottles are ready.'
                         : 'Click on each water bottle to mark as consumed.'
                     }
                 </p>

                 {!isNightRest && !isTimely && (
                     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-r-lg">
                         <p className="font-semibold">Strike! ⚠️</p>
                         <p>You were late to juice consumption. Total strikes: {missedResponses}</p>
                     </div>
                 )}

                 {!canContinue && (
                     <div className="text-sm text-gray-500 mb-4">
                         Continue button available in: {formatTime(continueTimer)}
                     </div>
                 )}
             </div>

             <div className="flex justify-center space-x-4 mb-6">
                 {selectedBottles.map((selected, i) => (
                     <WaterBottle
                         key={i}
                         filled={selected}
                         onClick={isNightRest ? undefined : () => handleBottleClick(i)}
                     />
                 ))}
             </div>

             <div className="text-center mb-4">
                 <p className="text-lg font-semibold text-blue-800 mb-2">
                     {isNightRest ? 'Overnight Hydration' : 'Hydration Progress'}
                 </p>
                 <p className="text-sm text-gray-600">
                     {isNightRest
                         ? 'Rest well and stay hydrated through the night'
                         : `${selectedBottles.filter(Boolean).length} of 4 bottles consumed`
                     }
                 </p>
             </div>

             <div className="w-full mt-4">
                 <button
                     onClick={onComplete}
                     disabled={!canContinue}
                     className={`w-full font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg mb-2 ${
                         canContinue
                             ? 'bg-blue-500 text-white hover:bg-blue-600'
                             : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                     }`}
                 >
                     {isNightRest
                         ? 'Good Morning! Start Next Day'
                         : allBottlesSelected ? 'All Done! Continue' : 'Continue (Available in 6 hours)'
                     }
                 </button>
                 {!canContinue && !isNightRest && (
                     <p className="text-gray-500 text-sm">
                         Select all 4 bottles or wait for the continue button
                     </p>
                 )}
                 {isNightRest && !canContinue && (
                     <p className="text-gray-500 text-sm">
                         Take time to rest. The next day will begin automatically.
                     </p>
                 )}
             </div>
        </div>
    );
};