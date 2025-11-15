import React from 'react';

export enum GameState {
    Welcome,
    LevelStart,
    DayTransition,
    DayStart,
    DayInProgress,
    WaterBreak,
    LevelComplete,
    GameComplete,
    GameFailed,
    LevelFailed,
    LevelDecision,
}

export interface DayData {
    day: number;
    level: number;
    juiceName: string;
    description: string;
    ingredients: string[];
}

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface IngredientInfo {
    // FIX: Import React to provide types for React components.
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    benefits: string[];
    nutrition: { [key: string]: string };
}

export interface LevelData {
    level: number;
    name: string;
    description: string;
    benefits: string;
    ingredients: Ingredient[];
}