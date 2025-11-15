import React, { useState } from 'react';
import { LevelData, Ingredient } from '../types';
import { INGREDIENT_INFO } from '../constants';

const CheckoutItem: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
    const info = INGREDIENT_INFO[ingredient.name];
    if (!info) return null;
    const Icon = info.icon;
    
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
            <div className="flex items-center">
                <Icon className="w-8 h-8 mr-3 text-green-500" />
                <div>
                    <p className="font-semibold text-gray-800">{ingredient.name}</p>
                    <p className="text-sm text-gray-500">{ingredient.quantity}</p>
                </div>
            </div>
            <p className="font-mono text-gray-700">${(Math.random() * 5 + 2).toFixed(2)}</p>
        </div>
    );
};

interface CheckoutScreenProps {
    levelData: LevelData;
    onBack: () => void;
    onCheckoutComplete: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ levelData, onBack, onCheckoutComplete }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            onCheckoutComplete();
        }, 2000); // Simulate network delay
    };

    const total = (levelData.ingredients.length * 3.57).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans antialiased">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <header className="bg-gray-50 p-4 border-b border-gray-200">
                    <button onClick={onBack} className="text-gray-500 hover:text-gray-800">&larr; Back to List</button>
                    <h1 className="text-2xl font-bold text-center text-gray-800">Checkout</h1>
                </header>
                
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                    <div className="max-h-60 overflow-y-auto pr-2">
                        {levelData.ingredients.map(item => <CheckoutItem key={item.name} ingredient={item} />)}
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-3 mt-3 border-t">
                        <span>Total:</span>
                        <span>${total}</span>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
                        <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                            {/* This is a mock payment element */}
                            <p className="text-sm text-center text-gray-500">Mock Stripe Payment Element</p>
                        </div>
                    </div>
                </div>

                <footer className="p-6 bg-gray-50 border-t">
                    <button
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center"
                    >
                        {isProcessing && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>}
                        {isProcessing ? 'Processing...' : `Pay $${total}`}
                    </button>
                </footer>
            </div>
        </div>
    );
};
