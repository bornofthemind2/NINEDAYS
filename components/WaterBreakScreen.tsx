import React, { useEffect, useState } from 'react';

const WaterBottle: React.FC<{ filled: boolean }> = ({ filled }) => (
    <div className="relative w-20 h-32 mx-auto">
        {/* Bottle outline */}
        <div className="absolute inset-0 border-2 border-gray-300 rounded-lg bg-white shadow-lg overflow-hidden">
            {/* Bottle neck */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4 bg-gray-300 rounded-t"></div>
            {/* Bottle cap */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-400 rounded-full"></div>
        </div>

        {/* Water fill with spilling effect */}
        <div className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out">
            {/* Main water body */}
            <div
                className="bg-blue-400 rounded-b-lg shadow-inner"
                style={{
                    height: filled ? '100%' : '0%',
                    background: filled ? 'linear-gradient(to top, #10b981, #34d399)' : 'transparent',
                    transition: 'height 1s ease-in-out'
                }}
            ></div>

            {/* Water spilling effect */}
            {filled && (
                <>
                    {/* Spilling water droplets */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-green-400 rounded-full animate-bounce opacity-70"></div>
                    <div className="absolute top-1 left-1/3 w-0.5 h-1.5 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-1 right-1/3 w-0.5 h-1.5 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.4s' }}></div>

                    {/* Water surface bubbles */}
                    <div className="absolute top-2 left-2 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-50"></div>
                    <div className="absolute top-3 right-2 w-0.5 h-0.5 bg-green-300 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute top-4 left-3 w-0.5 h-0.5 bg-green-300 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.6s' }}></div>
                </>
            )}
        </div>

        {/* Bottle label/shadow effect */}
        <div className="absolute inset-1 border border-gray-200 rounded-lg pointer-events-none"></div>
    </div>
);

interface WaterBreakScreenProps {
    onComplete: () => void;
    juicesConsumed: number;
}

export const WaterBreakScreen: React.FC<WaterBreakScreenProps> = ({ onComplete, juicesConsumed }) => {
    const [countdown, setCountdown] = useState(20);
    const [waterBottlesFilled, setWaterBottlesFilled] = useState(0);

    useEffect(() => {
        // Start water bottle filling animation
        const waterTimer = setInterval(() => {
            setWaterBottlesFilled(prev => {
                const next = prev + 1;
                return next > 4 ? 4 : next;
            });
        }, 5000); // Fill one bottle every 5 seconds

        // Countdown timer
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => {
                clearTimeout(timer);
                clearInterval(waterTimer);
            };
        } else {
            // Use a short delay before completing to allow animation to finish
            const completeTimer = setTimeout(onComplete, 200);
            return () => {
                clearTimeout(completeTimer);
                clearInterval(waterTimer);
            };
        }
    }, [countdown, onComplete]);

    return (
        <div className="text-center flex flex-col items-center justify-between h-full animate-fade-in">
             <div>
                 <h2 className="text-2xl font-bold text-blue-800 mb-2">Stay Hydrated!</h2>
                 <p className="text-gray-600 mb-4">Drink 4 bottles of water over the next 20 seconds.</p>


                 <div className="text-sm text-gray-500 mb-4">
                     {countdown}s remaining
                 </div>
             </div>

             <div className="flex justify-center space-x-4 mb-6">
                 {[...Array(4)].map((_, i) => <WaterBottle key={i} filled={i < waterBottlesFilled} />)}
             </div>

             <div className="text-center mb-4">
                 <p className="text-lg font-semibold text-blue-800 mb-2">Drink Water Now</p>
                 <p className="text-sm text-gray-600">Watch the bottles fill as you hydrate over 20 seconds</p>
             </div>

             <div className="w-full mt-4">
                 <button
                     onClick={onComplete}
                     className="w-full bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg mb-2"
                 >
                     {waterBottlesFilled >= 4 ? 'All Done! Continue' : `Drink Water Bottle ${waterBottlesFilled + 1}`}
                 </button>
                 <p className="text-gray-500 text-sm">Auto-advancing in {countdown}s...</p>
             </div>
        </div>
    );
};