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
    'Cucumbers': { icon: CucumberIcon, benefits: ['High in water content for hydration', 'Low in calories', 'Good source of vitamin K', 'Contains antioxidants', 'Supports digestion'], nutrition: { 'Calories': '15 kcal per 100g', 'Water': '96.7g per 100g', 'Vitamin K': '16.4µg per 100g', 'Vitamin C': '2.8mg per 100g', 'Potassium': '147mg per 100g' } },
    'Green Apples': { icon: AppleIcon, benefits: ['Rich in fiber for digestion', 'Good source of vitamin C', 'Contains antioxidants', 'Supports heart health', 'Low glycemic index'], nutrition: { 'Calories': '52 kcal per 100g', 'Fiber': '2.4g per 100g', 'Vitamin C': '4.6mg per 100g', 'Potassium': '107mg per 100g', 'Sugar': '10.4g per 100g' } },
    'Kale': { icon: KaleIcon, benefits: ['Extremely nutrient-dense', 'Excellent source of vitamins A, C, K', 'High in antioxidants', 'Supports bone health', 'Anti-inflammatory properties'], nutrition: { 'Calories': '35 kcal per 100g', 'Vitamin K': '817µg per 100g', 'Vitamin A': '500µg per 100g', 'Vitamin C': '93mg per 100g', 'Calcium': '254mg per 100g' } },
    'Parsley': { icon: ParsleyIcon, benefits: ['Rich in antioxidants', 'Supports bone health', 'Good source of vitamins A, C, K', 'May help with kidney health', 'Anti-inflammatory'], nutrition: { 'Calories': '36 kcal per 100g', 'Vitamin K': '1640µg per 100g', 'Vitamin C': '133mg per 100g', 'Vitamin A': '421µg per 100g', 'Iron': '6.2mg per 100g' } },
    'Cilantro': { icon: CilantroIcon, benefits: ['Rich in antioxidants', 'May help with heavy metal detoxification', 'Supports digestion', 'Anti-inflammatory', 'Good source of vitamins A, C, K'], nutrition: { 'Calories': '23 kcal per 100g', 'Vitamin K': '310µg per 100g', 'Vitamin C': '27mg per 100g', 'Vitamin A': '337µg per 100g', 'Potassium': '521mg per 100g' } },
    'Spinach': { icon: SpinachIcon, benefits: ['High in iron and folate', 'Excellent source of vitamins A, C, K', 'Supports eye health', 'Anti-inflammatory', 'May help prevent cancer'], nutrition: { 'Calories': '23 kcal per 100g', 'Vitamin K': '483µg per 100g', 'Vitamin A': '469µg per 100g', 'Folate': '194µg per 100g', 'Iron': '2.7mg per 100g' } },
    'Lemons': { icon: LemonIcon, benefits: ['Excellent source of vitamin C', 'Supports immune function', 'May help with weight management', 'Anti-inflammatory', 'Supports heart health'], nutrition: { 'Calories': '29 kcal per 100g', 'Vitamin C': '53mg per 100g', 'Citric Acid': '5g per 100g', 'Potassium': '138mg per 100g', 'Fiber': '2.8g per 100g' } },
    'Carrots': { icon: CarrotIcon, benefits: ['Excellent source of beta-carotene (vitamin A)', 'Supports eye health', 'High in fiber', 'May reduce cancer risk', 'Supports immune function'], nutrition: { 'Calories': '41 kcal per 100g', 'Vitamin A': '835µg per 100g', 'Fiber': '2.8g per 100g', 'Potassium': '320mg per 100g', 'Vitamin K': '13.2µg per 100g' } },
    'Romaine Lettuce': { icon: LettuceIcon, benefits: ['Good source of vitamins A, C, K', 'High in water content', 'Low in calories', 'Supports hydration', 'Contains folate'], nutrition: { 'Calories': '17 kcal per 100g', 'Vitamin K': '103µg per 100g', 'Vitamin A': '370µg per 100g', 'Folate': '136µg per 100g', 'Water': '95g per 100g' } },
    'Celery': { icon: CeleryIcon, benefits: ['High in water content for hydration', 'Low in calories', 'Contains antioxidants', 'Supports digestion', 'May help lower blood pressure'], nutrition: { 'Calories': '16 kcal per 100g', 'Water': '95g per 100g', 'Potassium': '260mg per 100g', 'Vitamin K': '29.3µg per 100g', 'Fiber': '1.6g per 100g' } },
    'Beets': { icon: BeetrootIcon, benefits: ['High in nitrates for blood pressure', 'Good source of folate', 'Contains antioxidants', 'May improve athletic performance', 'Supports liver health'], nutrition: { 'Calories': '43 kcal per 100g', 'Folate': '109µg per 100g', 'Potassium': '325mg per 100g', 'Manganese': '0.3mg per 100g', 'Fiber': '2.8g per 100g' } },
    'Ginger': { icon: GingerIcon, benefits: ['Anti-inflammatory properties', 'May help with nausea', 'Supports digestion', 'Contains antioxidants', 'May help with pain relief'], nutrition: { 'Calories': '80 kcal per 100g', 'Potassium': '415mg per 100g', 'Manganese': '0.2mg per 100g', 'Vitamin B6': '0.2mg per 100g', 'Iron': '0.6mg per 100g' } },
};

// Local images for ingredients (replace with your actual produce images)
export const INGREDIENT_IMAGES: { [key: string]: string } = {
    'Cucumbers': '/images/cucumbers.jpg',
    'Green Apples': '/images/green-apples.jpg',
    'Kale': '/images/kale.jpg',
    'Parsley': '/images/parsley.jpg',
    'Cilantro': '/images/cilantro.jpg',
    'Spinach': '/images/spinach.jpg',
    'Lemons': '/images/lemons.jpg',
    'Carrots': '/images/carrots.jpg',
    'Romaine Lettuce': '/images/romaine-lettuce.jpg',
    'Celery': '/images/celery.jpg',
    'Beets': '/images/beets.jpg',
    'Ginger': '/images/ginger.jpg',
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