import React, { useState, useEffect, useRef } from 'react';
import { INGREDIENT_INFO, BLEND_BENEFITS, PROGRAM_DATA, INGREDIENT_IMAGES } from '../constants';

const JuiceGlass: React.FC<{ filled: boolean }> = ({ filled }) => (
    <div className={`w-12 h-16 border-2 ${filled ? 'border-green-500' : 'border-gray-300'} rounded-t-lg rounded-b-md relative transition-all duration-300`}>
        <div
            className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-b-sm transition-all duration-500 ease-in-out"
            style={{ height: filled ? '100%' : '0%' }}
        ></div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500">{filled && 'Done!'}</div>
    </div>
);

const WaterBottle: React.FC<{ filled: boolean }> = ({ filled }) => (
    <div className={`w-8 h-12 border-2 ${filled ? 'border-blue-500' : 'border-gray-300'} rounded-lg relative transition-all duration-300`}>
        <div
            className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-lg transition-all duration-1000 ease-in-out"
            style={{ height: filled ? '100%' : '0%' }}
        ></div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-gray-400 rounded-full"></div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500">{filled && '💧'}</div>
    </div>
);


interface DayInProgressScreenProps {
    day: number;
    juiceName: string;
    juiceIngredients: string[];
    juicesConsumed: number;
    onResponse: (isTimely: boolean, elapsed: number) => void;
    onQuit: () => void;
}

export const DayInProgressScreen: React.FC<DayInProgressScreenProps> = ({ day, juiceName, juiceIngredients, juicesConsumed, onResponse, onQuit }) => {
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [randomBenefit, setRandomBenefit] = useState<string>('');
    const [allIngredients, setAllIngredients] = useState<string[]>([]);
    const [waterBottlesFilled, setWaterBottlesFilled] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);
    const waterTimerRef = useRef<number | null>(null);

    useEffect(() => {
        // Reset the component's state for each new juice prompt.
        // This fixes issues with stale state when the component re-renders for a new day.
        setIsTimeUp(false);
        setShowButton(false);
        setWaterBottlesFilled(0);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (waterTimerRef.current) {
            clearInterval(waterTimerRef.current);
        }

        // Get all ingredients for the current day from PROGRAM_DATA
        const currentDayData = PROGRAM_DATA.find(d => d.day === day);
        if (currentDayData) {
            setAllIngredients(currentDayData.ingredients);
        }

        // Generate random benefit for this juice iteration
        const benefits = BLEND_BENEFITS[juiceName] || [];
        if (benefits.length > 0) {
            const randomIndex = Math.floor(Math.random() * benefits.length);
            setRandomBenefit(benefits[randomIndex]);
        } else {
            setRandomBenefit('This powerful blend nourishes your body with essential nutrients and supports overall wellness.');
        }

        // A short delay before the button and timer appear
        const showButtonTimer = setTimeout(() => {
            setShowButton(true);
            setStartTime(Date.now());

            // Start water bottle filling animation (20 seconds total, 4 bottles, so every 5 seconds)
            let bottlesFilled = 0;
            waterTimerRef.current = window.setInterval(() => {
                bottlesFilled += 1;
                setWaterBottlesFilled(bottlesFilled);
                if (bottlesFilled >= 4) {
                    if (waterTimerRef.current) {
                        clearInterval(waterTimerRef.current);
                    }
                }
            }, 5000); // 5 seconds per bottle (20 seconds total for 4 bottles)
        }, 1000);

        return () => {
            clearTimeout(showButtonTimer);
            if (waterTimerRef.current) {
                clearInterval(waterTimerRef.current);
            }
        };
    }, [day, juicesConsumed, juiceName]); // Re-trigger when the day or juice number changes

    useEffect(() => {
        if (showButton) {
            timerRef.current = window.setTimeout(() => {
                setIsTimeUp(true);
            }, 5000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [showButton]);

    const handleResponse = (isTimely: boolean) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        const elapsed = startTime ? Date.now() - startTime : 0;
        onResponse(isTimely, elapsed);
    };
    
    return (
        <div className="text-center flex flex-col items-center justify-between h-full animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-green-800 mb-1">Day {day}: {juiceName}</h2>
                <p className="text-gray-600 mb-4">Time for Juice #{juicesConsumed + 1} of 3.</p>
                
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Today's blend contains:</p>
                    <div className="flex justify-center items-center flex-wrap gap-3 px-4 max-w-md mx-auto">
                        {allIngredients.map(name => {
                            const info = INGREDIENT_INFO[name];
                            if (!info) return null;
                            const imageUrl = INGREDIENT_IMAGES[name];
                            return (
                                <div key={name} className="flex flex-col items-center text-center min-w-0 flex-1">
                                    <div className="bg-green-100/70 rounded-full p-2 mb-1">
                                        {imageUrl && (
                                            <img
                                                src={imageUrl}
                                                alt={name}
                                                className="w-5 h-5 rounded-full object-cover"
                                                onError={() => {
                                                    console.warn(`Failed to load image for ${name}`);
                                                }}
                                            />
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-600 leading-tight break-words">{name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mb-8">
                    {[...Array(4)].map((_, i) => <JuiceGlass key={i} filled={i < juicesConsumed} />)}
                </div>
            </div>

            <div className="w-full mt-auto">
                 {showButton && !isTimeUp && (
                     <div className="w-full">
                         <div className="h-2 bg-green-200 rounded-full mb-2 overflow-hidden">
                             <div className="h-full bg-green-500 animate-shrink-width"></div>
                         </div>
                         <button
                             onClick={() => handleResponse(true)}
                             className="w-full bg-green-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg text-lg"
                         >
                             I Drank Juice #{juicesConsumed + 1}!
                         </button>
                         {randomBenefit && (
                             <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                                 <p className="text-sm text-green-800 leading-relaxed">{randomBenefit}</p>
                             </div>
                         )}
                     </div>
                 )}
                 {isTimeUp && (
                     <div className="w-full">
                         <button
                             onClick={() => handleResponse(false)}
                             className="w-full bg-yellow-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-yellow-600 transition-all shadow-lg text-lg animate-pulse"
                         >
                             I was late to the party...
                         </button>
                         {randomBenefit && (
                             <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                 <p className="text-sm text-yellow-800 leading-relaxed">{randomBenefit}</p>
                             </div>
                         )}
                     </div>
                 )}

                 <button
                     onClick={onQuit}
                     className="mt-3 text-sm text-gray-500 hover:text-red-500 transition-colors"
                 >
                     Restart or try another time
                 </button>
             </div>
        </div>
    );
};