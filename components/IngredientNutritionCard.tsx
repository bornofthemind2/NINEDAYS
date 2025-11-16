import React from 'react';
import { Ingredient, IngredientInfo } from '../types';
import { INGREDIENT_INFO } from '../constants';

interface IngredientNutritionCardProps {
  ingredient: Ingredient;
  imageUrl?: string;
}

export const IngredientNutritionCard: React.FC<IngredientNutritionCardProps> = ({ ingredient, imageUrl }) => {
  const info: IngredientInfo | undefined = INGREDIENT_INFO[ingredient.name];

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

        <div className="space-y-1 text-xs text-gray-600">
          {Object.entries(info.nutrition).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium text-gray-700">{key}:</span>
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <h5 className="font-medium text-green-600 text-xs mb-1">Health Benefits:</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            {info.benefits.map((benefit, index) => (
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