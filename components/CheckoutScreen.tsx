import React, { useState, useEffect } from 'react';
import { LevelData, Ingredient } from '../types';
import { INGREDIENT_INFO, INGREDIENT_IMAGES } from '../constants';
import { getProducePrice } from '../services/geminiService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Test publishable key from Stripe dashboard
const stripePromise = loadStripe('pk_test_51QjAMKAVuBsgrnVAT3mo3R1VFlMRfFQ73HsZUMEp3q6d2HXL01Uzj8XNyKDBikyP9Df5JShLEO57B6qDxrHZZ5CG00UvfGGFxF');

const parseQuantity = (quantity: string): number => {
    const match = quantity.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
};

const CheckoutItem: React.FC<{ ingredient: Ingredient, unitPrice: number }> = ({ ingredient, unitPrice }) => {
    const info = INGREDIENT_INFO[ingredient.name];
    if (!info) return null;
    const imageUrl = INGREDIENT_IMAGES[ingredient.name];
    const quantityNum = parseQuantity(ingredient.quantity);
    const price = (quantityNum * unitPrice).toFixed(2);

    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
            <div className="flex items-center">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={ingredient.name}
                        className="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0"
                        onError={(e) => {
                            // Fallback to icon if image fails
                            e.currentTarget.style.display = 'none';
                            const iconElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (iconElement) iconElement.style.display = 'block';
                        }}
                    />
                ) : null}
                <div className={`w-8 h-8 mr-3 flex-shrink-0 ${imageUrl ? 'hidden' : 'block'}`}>
                    {React.createElement(info.icon, { className: "w-8 h-8 text-green-500" })}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{ingredient.name}</p>
                    <p className="text-sm text-gray-500">{quantityNum} x ${unitPrice.toFixed(2)} = ${price}</p>
                </div>
            </div>
            <p className="font-mono text-gray-700">${price}</p>
        </div>
    );
};

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const CheckoutForm: React.FC<{ levelData: LevelData, onBack: () => void, onCheckoutComplete: () => void, loadingPrices: boolean, total: string }> = ({ levelData, onBack, onCheckoutComplete, loadingPrices, total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Card element not found');
            setIsProcessing(false);
            return;
        }

        // For test mode, we'll simulate a successful payment
        // In production, you would create a payment intent on your server
        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For test mode, always succeed
            onCheckoutComplete();
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
                <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <p className="text-xs text-gray-500 mt-2">
                    Use test card: 4242 4242 4242 4242, any future expiry, any CVC
                </p>
            </div>

            <footer className="p-6 bg-gray-50 border-t">
                <button
                    type="submit"
                    disabled={!stripe || isProcessing || loadingPrices}
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center"
                >
                    {isProcessing && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>}
                    {isProcessing ? 'Processing...' : loadingPrices ? 'Loading prices...' : `Pay $${total}`}
                </button>
            </footer>
        </form>
    );
};

interface CheckoutScreenProps {
    levelData: LevelData;
    onBack: () => void;
    onCheckoutComplete: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ levelData, onBack, onCheckoutComplete }) => {
    const [prices, setPrices] = useState<Record<string, number>>({});
    const [loadingPrices, setLoadingPrices] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            const pricePromises = levelData.ingredients.map(async (ingredient) => {
                const price = await getProducePrice(ingredient.name, ingredient.quantity);
                return { name: ingredient.name, price };
            });

            const results = await Promise.all(pricePromises);
            const priceMap = results.reduce((acc, { name, price }) => {
                acc[name] = price;
                return acc;
            }, {} as Record<string, number>);

            setPrices(priceMap);
            setLoadingPrices(false);
        };

        fetchPrices();
    }, [levelData.ingredients]);

    const calculateTotal = () => {
        const produceTotal = levelData.ingredients.reduce((sum, ingredient) => {
            const quantityNum = parseQuantity(ingredient.quantity);
            const unitPrice = prices[ingredient.name] || 2.5;
            return sum + (quantityNum * unitPrice);
        }, 0);
        return produceTotal + 25; // Add prep fee
    };

    const produceTotal = levelData.ingredients.reduce((sum, ingredient) => {
        const quantityNum = parseQuantity(ingredient.quantity);
        const unitPrice = prices[ingredient.name] || 2.5;
        return sum + (quantityNum * unitPrice);
    }, 0).toFixed(2);

    const prepFee = 25;
    const total = calculateTotal().toFixed(2);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans antialiased">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <header className="bg-gray-50 p-4 border-b border-gray-200">
                    <button onClick={onBack} className="text-gray-500 hover:text-gray-800">&larr; Back to List</button>
                    <h1 className="text-2xl font-bold text-center text-gray-800">Checkout</h1>
                </header>
                
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                    {loadingPrices ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                            <p className="text-sm text-gray-500 mt-2">Getting real-time prices...</p>
                        </div>
                    ) : (
                        <div className="max-h-60 overflow-y-auto pr-2">
                            {levelData.ingredients.map(item => <CheckoutItem key={item.name} ingredient={item} unitPrice={prices[item.name] || 2.5} />)}
                        </div>
                    )}
                    <div className="pt-3 mt-3 border-t space-y-2">
                        <div className="flex justify-between">
                            <span>Produce Subtotal:</span>
                            <span>${produceTotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Prep Fee:</span>
                            <span>${prepFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total:</span>
                            <span>${total}</span>
                        </div>
                    </div>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            levelData={levelData}
                            onBack={onBack}
                            onCheckoutComplete={onCheckoutComplete}
                            loadingPrices={loadingPrices}
                            total={total}
                        />
                    </Elements>
                </div>
            </div>
        </div>
    );
};
