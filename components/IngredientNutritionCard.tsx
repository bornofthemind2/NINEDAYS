import React, { useState, useEffect } from 'react';
import { Ingredient, IngredientInfo } from '../types';
import { INGREDIENT_INFO } from '../constants';
import { getCachedNutritionData, IngredientNutrition } from '../services/usdaService';

interface IngredientNutritionCardProps {
  ingredient: Ingredient;
  imageUrl?: string;
}

export const IngredientNutritionCard: React.FC<IngredientNutritionCardProps> = ({ ingredient, imageUrl }) => {
  const [nutritionData, setNutritionData] = useState<IngredientNutrition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const info: IngredientInfo | undefined = INGREDIENT_INFO[ingredient.name];

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        setLoading(true);
        const data = await getCachedNutritionData(ingredient.name);
        setNutritionData(data);
      } catch (err) {
        setError('Failed to load nutrition data');
      } finally {
        setLoading(false);
      }
    };

    fetchNutrition();
  }, [ingredient.name]);

  if (!info) return null;

  const Icon = info.icon;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center mb-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={ingredient.name}
            className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none';
              const iconElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (iconElement) iconElement.style.display = 'block';
            }}
          />
        ) : null}
        <Icon className="w-12 h-12 text-green-500 mr-3 flex-shrink-0" style={{ display: imageUrl ? 'none' : 'block' }} />
        <div>
          <h3 className="font-bold text-lg text-gray-800">{ingredient.name}</h3>
          <p className="text-sm text-gray-600">{ingredient.quantity}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-green-600 text-sm">Nutrition Facts (per 100g)</h4>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-xs text-gray-500 mt-2">Loading nutrition data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-xs text-red-500">{error}</p>
            <div className="mt-2 text-xs text-gray-600">
              <p className="font-medium">Basic Info:</p>
              {Object.entries(info.nutrition).map(([key, value]) => (
                <p key={key} className="text-xs">{key}: {value}</p>
              ))}
            </div>
          </div>
        ) : nutritionData ? (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium text-gray-700">Calories:</span>
              <span className="float-right text-gray-800">{Math.round(nutritionData.nutrition.calories)}</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium text-gray-700">Protein:</span>
              <span className="float-right text-gray-800">{nutritionData.nutrition.protein.toFixed(1)}g</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium text-gray-700">Carbs:</span>
              <span className="float-right text-gray-800">{nutritionData.nutrition.carbs.toFixed(1)}g</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium text-gray-700">Fiber:</span>
              <span className="float-right text-gray-800">{nutritionData.nutrition.fiber.toFixed(1)}g</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium text-gray-700">Vitamin C:</span>
              <span className="float-right text-gray-800">{nutritionData.nutrition.vitaminC.toFixed(1)}mg</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium text-gray-700">Potassium:</span>
              <span className="float-right text-gray-800">{Math.round(nutritionData.nutrition.potassium)}mg</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">Nutrition data not available</p>
            <div className="mt-2 text-xs text-gray-600">
              <p className="font-medium">Basic Info:</p>
              {Object.entries(info.nutrition).slice(0, 3).map(([key, value]) => (
                <p key={key} className="text-xs">{key}: {value}</p>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3">
          <h5 className="font-medium text-green-600 text-xs mb-1">Health Benefits:</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            {info.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-1">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};