import React from 'react';

export const WaterBottleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <div className="relative w-24 h-48" {...props}>
        {/* Bottle Outline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H9V6H15V3Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 6H7V44C7 45.1046 7.89543 46 9 46H15C16.1046 46 17 45.1046 17 44V6Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {/* Water Inside */}
        <div className="absolute bottom-1 left-1 right-1 overflow-hidden" style={{ height: 'calc(100% - 4px - 1rem)'}}>
             <div className="absolute bottom-0 left-0 w-full rounded-b-lg" style={{height: 'calc(100% - 32px)'}}>
                <div className="absolute bottom-0 left-0 w-full bg-blue-400 animate-drain-water" style={{ height: '100%'}}></div>
             </div>
        </div>
    </div>
);