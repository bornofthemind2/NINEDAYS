import axios from 'axios';

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  vitaminC: number;
  vitaminA: number;
  calcium: number;
  iron: number;
}

export interface IngredientNutrition {
  name: string;
  nutrition: NutritionData;
  servingSize: string;
}

const USDA_API_KEY = 'DEMO_KEY'; // Replace with actual API key
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export const getNutritionData = async (ingredientName: string): Promise<IngredientNutrition | null> => {
  try {
    // Search for the food item
    const searchResponse = await axios.get(`${USDA_BASE_URL}/foods/search`, {
      params: {
        api_key: USDA_API_KEY,
        query: ingredientName,
        dataType: 'Foundation,SR Legacy',
        pageSize: 1,
      },
    });

    if (!searchResponse.data.foods || searchResponse.data.foods.length === 0) {
      return null;
    }

    const food = searchResponse.data.foods[0];
    const fdcId = food.fdcId;

    // Get detailed nutrition data
    const detailResponse = await axios.get(`${USDA_BASE_URL}/food/${fdcId}`, {
      params: {
        api_key: USDA_API_KEY,
      },
    });

    const foodDetails = detailResponse.data;
    const nutrients = foodDetails.foodNutrients || [];

    // Extract nutrition values (per 100g serving)
    const nutrition: NutritionData = {
      calories: getNutrientValue(nutrients, 1008), // Energy
      protein: getNutrientValue(nutrients, 1003), // Protein
      carbs: getNutrientValue(nutrients, 1005), // Carbohydrate, by difference
      fat: getNutrientValue(nutrients, 1004), // Total lipid (fat)
      fiber: getNutrientValue(nutrients, 1079), // Fiber, total dietary
      sugar: getNutrientValue(nutrients, 2000), // Sugars, total
      sodium: getNutrientValue(nutrients, 1093), // Sodium
      potassium: getNutrientValue(nutrients, 1092), // Potassium
      vitaminC: getNutrientValue(nutrients, 1162), // Vitamin C
      vitaminA: getNutrientValue(nutrients, 1106), // Vitamin A, RAE
      calcium: getNutrientValue(nutrients, 1087), // Calcium
      iron: getNutrientValue(nutrients, 1089), // Iron
    };

    return {
      name: ingredientName,
      nutrition,
      servingSize: '100g',
    };
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    return null;
  }
};

const getNutrientValue = (nutrients: any[], nutrientId: number): number => {
  const nutrient = nutrients.find(n => n.nutrient.id === nutrientId);
  return nutrient ? nutrient.amount : 0;
};

// Cache for nutrition data
const nutritionCache: Map<string, IngredientNutrition> = new Map();

export const getCachedNutritionData = async (ingredientName: string): Promise<IngredientNutrition | null> => {
  if (nutritionCache.has(ingredientName)) {
    return nutritionCache.get(ingredientName)!;
  }

  const data = await getNutritionData(ingredientName);
  if (data) {
    nutritionCache.set(ingredientName, data);
  }
  return data;
};