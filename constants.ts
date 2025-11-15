import React from 'react';
import { DayData, LevelData, IngredientInfo } from './types';
import { AppleIcon } from './components/icons/AppleIcon';
import { CucumberIcon } from './components/icons/CucumberIcon';
import { CarrotIcon } from './components/icons/CarrotIcon';
import { LemonIcon } from './components/icons/LemonIcon';
import { KaleIcon } from './components/icons/KaleIcon';
import { ParsleyIcon } from './components/icons/ParsleyIcon';
import { CilantroIcon } from './components/icons/CilantroIcon';
import { SpinachIcon } from './components/icons/SpinachIcon';
import { LettuceIcon } from './components/icons/LettuceIcon';
import { CeleryIcon } from './components/icons/CeleryIcon';
import { BeetrootIcon } from './components/icons/BeetrootIcon';
import { GingerIcon } from './components/icons/GingerIcon';

export const PROGRAM_DATA: DayData[] = [
    // Level 1
    { day: 1, level: 1, juiceName: 'Green Cleanse', description: 'Kickstart your journey with a zesty and refreshing blend.', ingredients: ['Cucumbers', 'Green Apples', 'Kale', 'Lemons'] },
    { day: 2, level: 1, juiceName: 'Green Cleanse', description: 'A bright and sweet juice packed with vitamins.', ingredients: ['Spinach', 'Green Apples', 'Parsley', 'Cucumbers'] },
    { day: 3, level: 1, juiceName: 'Green Cleanse', description: 'An earthy and powerful juice to invigorate you.', ingredients: ['Kale', 'Cilantro', 'Green Apples', 'Lemons'] },
    // Level 2
    { day: 4, level: 2, juiceName: 'Detox Zing', description: 'Go green with this nutrient-dense powerhouse.', ingredients: ['Carrots', 'Green Apples', 'Ginger', 'Lemons'] },
    { day: 5, level: 2, juiceName: 'Detox Zing', description: 'A hydrating and super-refreshing juice.', ingredients: ['Cucumbers', 'Celery', 'Spinach', 'Parsley'] },
    { day: 6, level: 2, juiceName: 'Detox Zing', description: 'A mild and mighty green juice to keep you going.', ingredients: ['Romaine Lettuce', 'Green Apples', 'Beets', 'Lemons'] },
    // Level 3
    { day: 7, level: 3, juiceName: 'Hydration Helper', description: 'A tropical twist to energize your final stretch.', ingredients: ['Cucumbers', 'Celery', 'Green Apples', 'Spinach'] },
    { day: 8, level: 3, juiceName: 'Hydration Helper', description: 'An anti-inflammatory and vibrant blend.', ingredients: ['Kale', 'Green Apples', 'Lemons', 'Parsley'] },
    { day: 9, level: 3, juiceName: 'Hydration Helper', description: 'End on a high note with this sweet and hydrating delight.', ingredients: ['Romaine Lettuce', 'Cucumbers', 'Celery', 'Lemons'] },
];

export const LEVEL_DATA: LevelData[] = [
    {
        level: 1,
        name: 'Cleansing',
        description: "Gather these ingredients to kickstart your 3-day cleansing journey.",
        benefits: "This level focuses on flushing toxins and resetting your digestive system for a fresh start.",
        ingredients: [
            { name: 'Cucumbers', quantity: '12' },
            { name: 'Green Apples', quantity: '12' },
            { name: 'Kale', quantity: '2 bunches' },
            { name: 'Parsley', quantity: '1 bunch' },
            { name: 'Cilantro', quantity: '1 bunch' },
            { name: 'Spinach', quantity: '2 bags' },
            { name: 'Lemons', quantity: '2' },
        ],
    },
    {
        level: 2,
        name: 'Detox',
        description: "Stock up for the next 3 days of detoxification and energy.",
        benefits: "Packed with nutrients, this phase aims to boost your energy levels and support liver function.",
        ingredients: [
            { name: 'Carrots', quantity: '4 pounds' },
            { name: 'Lemons', quantity: '4 pounds' },
            { name: 'Kale', quantity: '6 bundles' },
            { name: 'Spinach', quantity: '2 big bags' },
            { name: 'Romaine Lettuce', quantity: '4 heads' },
            { name: 'Parsley', quantity: '2 bunches' },
            { name: 'Celery', quantity: '4 bundles' },
            { name: 'Cucumbers', quantity: '6' },
            { name: 'Green Apples', quantity: '12' },
            { name: 'Beets', quantity: '4' },
            { name: 'Ginger', quantity: '2 pieces' },
        ],
    },
    {
        level: 3,
        name: 'Water Extraction',
        description: "Here's your final shopping list for the hydration-focused finale.",
        benefits: "The final phase is all about deep hydration, nourishing your skin and cells from within.",
        ingredients: [
            { name: 'Kale', quantity: '2 bunches' },
            { name: 'Spinach', quantity: '2 bundles' },
            { name: 'Romaine Lettuce', quantity: '2 heads' },
            { name: 'Parsley', quantity: '1 bunch' },
            { name: 'Cucumbers', quantity: '2' },
            { name: 'Celery', quantity: '2 bundles' },
            { name: 'Green Apples', quantity: '4' },
            { name: 'Lemons', quantity: '2' },
        ],
    },
];

export const INGREDIENT_INFO: { [key: string]: IngredientInfo } = {
    'Cucumbers': { icon: CucumberIcon, benefits: ['High in nutrients', 'Promotes hydration', 'May aid in weight loss'], nutrition: { 'Calories': 'Low', 'Water': '96%', 'Vitamin K': 'High' } },
    'Green Apples': { icon: AppleIcon, benefits: ['Rich in fiber', 'Good for digestion', 'Contains antioxidants'], nutrition: { 'Fiber': 'High', 'Vitamin C': 'Good', 'Sugar': 'Low' } },
    'Kale': { icon: KaleIcon, benefits: ['Extremely nutrient-dense', 'Loaded with antioxidants', 'Excellent source of Vitamin C & K'], nutrition: { 'Vitamin K': 'Very High', 'Vitamin A': 'High', 'Calories': 'Low' } },
    'Parsley': { icon: ParsleyIcon, benefits: ['Rich in antioxidants', 'Supports bone health', 'Nutrient-dense'], nutrition: { 'Vitamin K': 'Very High', 'Vitamin C': 'High', 'Vitamin A': 'Good' } },
    'Cilantro': { icon: CilantroIcon, benefits: ['Helps rid the body of heavy metals', 'Protects against oxidative stress', 'May help lower blood sugar'], nutrition: { 'Antioxidants': 'High', 'Vitamin K': 'Good', 'Calories': 'Very Low' } },
    'Spinach': { icon: SpinachIcon, benefits: ['Improves eye health', 'Reduces oxidative stress', 'Helps prevent cancer'], nutrition: { 'Iron': 'Good', 'Vitamin A': 'High', 'Folate': 'High' } },
    'Lemons': { icon: LemonIcon, benefits: ['Supports heart health', 'Helps control weight', 'Good source of Vitamin C'], nutrition: { 'Vitamin C': 'Very High', 'Citric Acid': 'High', 'Potassium': 'Fair' } },
    'Carrots': { icon: CarrotIcon, benefits: ['Excellent source of Vitamin A', 'Good for eye health', 'May reduce risk of cancer'], nutrition: { 'Beta-Carotene': 'Very High', 'Fiber': 'Good', 'Vitamin K1': 'Good' } },
    'Romaine Lettuce': { icon: LettuceIcon, benefits: ['Good source of vitamins A and K', 'Hydrating', 'Low in calories'], nutrition: { 'Vitamin A': 'High', 'Folate': 'Good', 'Water': '95%' } },
    'Celery': { icon: CeleryIcon, benefits: ['Supports digestion', 'Rich in antioxidants', 'Reduces inflammation'], nutrition: { 'Water': '95%', 'Antioxidants': 'High', 'Calories': 'Very Low' } },
    'Beets': { icon: BeetrootIcon, benefits: ['Help keep blood pressure in check', 'Can improve athletic performance', 'Fight inflammation'], nutrition: { 'Nitrates': 'High', 'Folate': 'Good', 'Manganese': 'Good' } },
    'Ginger': { icon: GingerIcon, benefits: ['Treats nausea', 'Has anti-inflammatory effects', 'Can help with osteoarthritis'], nutrition: { 'Gingerol': 'High', 'Antioxidants': 'High', 'Potassium': 'Fair' } },
};

// Photorealistic images for ingredients (nano banana style)
export const INGREDIENT_IMAGES: { [key: string]: string } = {
    'Cucumbers': 'https://images.unsplash.com/photo-1604977042946-1eecc30f30d3?w=400&h=400&fit=crop&crop=center',
    'Green Apples': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center',
    'Kale': 'https://images.unsplash.com/photo-1524179091875-2a0580a2f7e5?w=400&h=400&fit=crop&crop=center',
    'Parsley': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
    'Cilantro': 'https://images.unsplash.com/photo-1618375569909-3c8616cf09ae?w=400&h=400&fit=crop&crop=center',
    'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&crop=center',
    'Lemons': 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=400&fit=crop&crop=center',
    'Carrots': 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=400&fit=crop&crop=center',
    'Romaine Lettuce': 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400&h=400&fit=crop&crop=center',
    'Celery': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&crop=center',
    'Beets': 'https://images.unsplash.com/photo-1551892376-c73ba8b2b6e0?w=400&h=400&fit=crop&crop=center',
    'Ginger': 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop&crop=center',
};

// Blend benefits for random selection
export const BLEND_BENEFITS: { [key: string]: string[] } = {
    'Green Cleanse': [
        'Powerful detoxification that flushes out toxins and supports liver function',
        'Boosts immunity with high vitamin C content from lemons and apples',
        'Provides sustained energy without the crash from processed foods',
        'Supports healthy digestion and gut microbiome balance',
        'Rich in antioxidants that combat oxidative stress and inflammation',
        'Hydrates deeply while nourishing cells at the molecular level',
        'Promotes healthy weight management through nutrient density',
        'Enhances mental clarity and focus throughout the day',
    ],
    'Detox Zing': [
        'Accelerates toxin elimination through synergistic ingredient combinations',
        'Supports metabolic function and natural detoxification pathways',
        'Provides anti-inflammatory compounds that reduce chronic inflammation',
        'Boosts circulation and cardiovascular health markers',
        'Enhances nutrient absorption and bioavailability',
        'Supports healthy blood sugar regulation naturally',
        'Promotes cellular repair and regeneration processes',
        'Strengthens the body\'s natural defense mechanisms',
    ],
    'Hydration Helper': [
        'Delivers deep cellular hydration for optimal organ function',
        'Supports electrolyte balance and mineral replenishment',
        'Enhances skin health and natural glow from within',
        'Promotes joint health and reduces inflammation',
        'Supports kidney function and natural detoxification',
        'Boosts cognitive function through improved hydration',
        'Enhances athletic performance and recovery',
        'Promotes healthy aging through cellular nourishment',
    ],
};

export const LEVEL_REWARDS = [
    { title: 'The Cool Cleanser', icon: CucumberIcon },
    { title: 'The Detox Dynamo', icon: BeetrootIcon },
    { title: 'The Hydration Hero', icon: KaleIcon },
];