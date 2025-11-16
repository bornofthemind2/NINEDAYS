import React from 'react';
import { Ingredient, IngredientInfo } from '../types';
import { INGREDIENT_INFO } from '../constants';

interface IngredientNutritionCardProps {
  ingredient: Ingredient;
  imageUrl?: string;
  isSelected?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  expanded?: boolean;
  onExpandToggle?: () => void;
}

export const IngredientNutritionCard: React.FC<IngredientNutritionCardProps> = ({
  ingredient,
  imageUrl,
  isSelected = false,
  onToggle,
  disabled = false,
  expanded = false,
  onExpandToggle
}) => {
  const info: IngredientInfo | undefined = INGREDIENT_INFO[ingredient.name];

  if (!info) return null;

  const Icon = info.icon;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border-2 transition-all duration-200 ${
        isSelected
          ? 'border-green-500 bg-green-50 shadow-lg'
          : 'border-gray-200 hover:border-green-300 hover:shadow-lg'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {/* Header - always visible */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center flex-grow cursor-pointer" onClick={disabled ? undefined : onToggle}>
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
          <Icon className={`w-12 h-12 mr-3 flex-shrink-0 ${isSelected ? 'text-green-600' : 'text-green-500'}`} style={{ display: imageUrl ? 'none' : 'block' }} />
          <div className="flex-grow">
            <h3 className={`font-bold text-lg ${isSelected ? 'text-green-800' : 'text-gray-800'}`}>{ingredient.name}</h3>
            <p className={`text-sm ${isSelected ? 'text-green-600' : 'text-gray-600'}`}>{ingredient.quantity}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpandToggle?.();
            }}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer ${isSelected ? 'bg-green-500' : 'bg-gray-200'}`}
            onClick={disabled ? undefined : onToggle}
          >
            {isSelected && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
          </div>
        </div>
      </div>

      {/* Expandable content */}
      {expanded && (
        <div className="space-y-2 border-t pt-3 mt-3">
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
      )}
    </div>
  );
};