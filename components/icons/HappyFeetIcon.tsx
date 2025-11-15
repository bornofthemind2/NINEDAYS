import React from 'react';

export const HappyFeetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" {...props}>
        <g>
            <path
                d="M 50,80 C 40,95 20,95 10,80 S 10,50 30,50 S 60,65 50,80 Z"
                className="animate-feet-walk"
                style={{ animationDelay: '0s', transformOrigin: '30px 60px' }}
            />
        </g>
        <g>
            <path
                d="M 150,80 C 140,95 120,95 110,80 S 110,50 130,50 S 160,65 150,80 Z"
                className="animate-feet-walk"
                style={{ animationDelay: '0.4s', transformOrigin: '130px 60px' }}
            />
        </g>
    </svg>
);
