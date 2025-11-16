import React, { useState, useEffect } from 'react';
import { LevelData, Ingredient } from '../types';
import { INGREDIENT_INFO, INGREDIENT_IMAGES } from '../constants';
import { IngredientNutritionCard } from './IngredientNutritionCard';

interface LevelStartScreenProps {
    levelData: LevelData;
    onStart: () => void;
    onPurchase: () => void;
    autoCheck?: boolean;
}

export const LevelStartScreen: React.FC<LevelStartScreenProps> = ({ levelData, onStart, onPurchase, autoCheck = false }) => {
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [isInDMV, setIsInDMV] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if user is in DMV area (DC, MD, VA)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // DMV area approximate bounds
                    const inDMV = latitude >= 37 && latitude <= 40 && longitude >= -80 && longitude <= -75;
                    setIsInDMV(inDMV);
                },
                (error) => {
                    console.log('Geolocation error:', error);
                    setIsInDMV(false); // Default to not in DMV if location fails
                }
            );
        } else {
            setIsInDMV(false);
        }
    }, []);

    const canUsePreMade = isInDMV === true;
    const forceSelection = isInDMV === false;

    useEffect(() => {
        if (canUsePreMade && autoCheck) {
            const allSelected = levelData.ingredients.reduce((acc, item) => {
                acc[item.name] = true;
                return acc;
            }, {} as Record<string, boolean>);
            setSelectedItems(allSelected);
        } else if (forceSelection) {
            setSelectedItems({});
        }
    }, [canUsePreMade, forceSelection, autoCheck, levelData.ingredients]);

    const handleToggle = (ingredientName: string) => {
        setSelectedItems(prev => {
            const newSelected = !prev[ingredientName];
            // Auto-expand when selecting, collapse when deselecting
            setExpandedItems(prevExpanded => ({
                ...prevExpanded,
                [ingredientName]: newSelected
            }));
            return { ...prev, [ingredientName]: newSelected };
        });
    };

    const handleExpandToggle = (ingredientName: string) => {
        setExpandedItems(prev => ({ ...prev, [ingredientName]: !prev[ingredientName] }));
    };

    const allItemsSelected = levelData.ingredients.length > 0 && levelData.ingredients.every(item => !!selectedItems[item.name]);

    return (
        <div className="text-center flex flex-col items-center justify-between h-full animate-fade-in w-full">
            <div>
                <h2 className="text-xl font-bold text-green-500 bg-green-100 rounded-full px-4 py-1 inline-block">Level {levelData.level}: {levelData.name}</h2>
                <p className="text-gray-600 mt-3">{levelData.description}</p>
                <div className="bg-green-100/50 border-l-4 border-green-500 text-green-800 p-3 my-4 text-sm text-left rounded-r-lg">
                    <p className="font-semibold">Level Focus:</p>
                    <p>{levelData.benefits}</p>
                </div>
            </div>

            <div className="w-full overflow-y-auto max-h-96 space-y-4 p-1 my-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Ingredients to Purchase:</h3>
                    <p className="text-sm text-gray-600 mb-4">Click on each ingredient card below to select it for purchase. Each card shows nutritional information and health benefits.</p>
                </div>

                <div className="space-y-3">
                    {levelData.ingredients.map(ingredient => (
                        <IngredientNutritionCard
                            key={ingredient.name}
                            ingredient={ingredient}
                            imageUrl={INGREDIENT_IMAGES[ingredient.name]}
                            isSelected={!!selectedItems[ingredient.name]}
                            onToggle={() => handleToggle(ingredient.name)}
                            disabled={autoCheck}
                            expanded={!!expandedItems[ingredient.name]}
                            onExpandToggle={() => handleExpandToggle(ingredient.name)}
                        />
                    ))}
                </div>
            </div>
            
            <div className="w-full mt-auto">
                <button
                    onClick={onStart}
                    disabled={!allItemsSelected}
                    className="w-full bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg mb-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {allItemsSelected ? `Begin Day ${levelData.level * 3 - 2}` : 'Select all items to start'}
                </button>
                {canUsePreMade && (
                    <button
                        onClick={onPurchase}
                        disabled={autoCheck}
                        className="w-full bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {autoCheck ? 'Pre-made Juice Ordered' : 'Order Pre-made Juice Delivery'}
                    </button>
                )}
                {!canUsePreMade && isInDMV === false && (
                    <button
                        onClick={onPurchase}
                        disabled={!allItemsSelected}
                        className="w-full bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {allItemsSelected ? 'Purchase Produce' : 'Select all items to purchase'}
                    </button>
                )}
                <div className="mt-4 text-xs text-gray-600 text-center px-4">
                    <p className="mb-2">
                        Purchase all the organic produce listed above from your local grocery store and use a standard juice press to extract the juices. Transfer the juice into twelve airtight 12-ounce jars, sufficient for three days of consumption — four jars per day.
                    </p>
                    {canUsePreMade && (
                        <p className="text-green-600 font-medium">
                            Alternatively, you can order pre-made juice delivery to your doorstep since you're in the DMV area.
                        </p>
                    )}
                    {!canUsePreMade && isInDMV === false && (
                        <p className="text-orange-600">
                            Pre-made delivery is not available in your area. Please purchase the produce locally and select the items above.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
