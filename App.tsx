import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState } from './types';
import { PROGRAM_DATA, LEVEL_REWARDS, LEVEL_DATA } from './constants';
import { getSurpriseReward } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LevelStartScreen } from './components/LevelStartScreen';
import { DayTransitionScreen } from './components/DayTransitionScreen';
import { AffirmationScreen } from './components/AffirmationScreen';
import { DayInProgressScreen } from './components/DayInProgressScreen';
import { WaterBreakScreen } from './components/WaterBreakScreen';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { GameCompleteScreen } from './components/GameCompleteScreen';
import { GameFailedScreen } from './components/GameFailedScreen';
import { LevelFailedScreen } from './components/LevelFailedScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { ProgressIndicator } from './components/ProgressIndicator';
import { AppleIcon } from './components/icons/AppleIcon';
import { CucumberIcon } from './components/icons/CucumberIcon';
import { LevelDecisionScreen } from './components/LevelDecisionScreen';

const App: React.FC = () => {
    // Load initial state from localStorage
    const loadState = (key: string, defaultValue: any) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    };

    const [gameState, setGameState] = useState<GameState>(loadState('gameState', GameState.Welcome));
    const [currentScreen, setCurrentScreen] = useState<'app' | 'checkout'>(loadState('currentScreen', 'app'));
    const [currentDay, setCurrentDay] = useState<number>(loadState('currentDay', 1));
    const [juicesConsumed, setJuicesConsumed] = useState<number>(loadState('juicesConsumed', 0));
    const [missedResponses, setMissedResponses] = useState<number>(loadState('missedResponses', 0));
    const [successfulResponses, setSuccessfulResponses] = useState<number>(loadState('successfulResponses', 0));
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
    const [rewardMessage, setRewardMessage] = useState<string>(loadState('rewardMessage', ''));
    const [isLoadingReward, setIsLoadingReward] = useState<boolean>(false);
    const [purchasedLevel, setPurchasedLevel] = useState<number | null>(loadState('purchasedLevel', null));
    const [totalMissedResponses, setTotalMissedResponses] = useState<number>(loadState('totalMissedResponses', 0));
    const [imperfectCompletion, setImperfectCompletion] = useState<boolean>(loadState('imperfectCompletion', false));
    const [lastIsTimely, setLastIsTimely] = useState<boolean>(loadState('lastIsTimely', true));
    const [lastElapsed, setLastElapsed] = useState<number>(loadState('lastElapsed', 0));
    const [isNightRest, setIsNightRest] = useState<boolean>(false);

    const alarmIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        Notification.requestPermission().then(setNotificationPermission);
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }, [gameState]);

    useEffect(() => {
        localStorage.setItem('currentScreen', JSON.stringify(currentScreen));
    }, [currentScreen]);

    useEffect(() => {
        localStorage.setItem('currentDay', JSON.stringify(currentDay));
    }, [currentDay]);

    useEffect(() => {
        localStorage.setItem('juicesConsumed', JSON.stringify(juicesConsumed));
    }, [juicesConsumed]);

    useEffect(() => {
        localStorage.setItem('missedResponses', JSON.stringify(missedResponses));
    }, [missedResponses]);

    useEffect(() => {
        localStorage.setItem('successfulResponses', JSON.stringify(successfulResponses));
    }, [successfulResponses]);

    useEffect(() => {
        localStorage.setItem('rewardMessage', JSON.stringify(rewardMessage));
    }, [rewardMessage]);

    useEffect(() => {
        localStorage.setItem('purchasedLevel', JSON.stringify(purchasedLevel));
    }, [purchasedLevel]);

    useEffect(() => {
        localStorage.setItem('totalMissedResponses', JSON.stringify(totalMissedResponses));
    }, [totalMissedResponses]);

    useEffect(() => {
        localStorage.setItem('imperfectCompletion', JSON.stringify(imperfectCompletion));
    }, [imperfectCompletion]);

    useEffect(() => {
        localStorage.setItem('lastIsTimely', JSON.stringify(lastIsTimely));
    }, [lastIsTimely]);

    useEffect(() => {
        localStorage.setItem('lastElapsed', JSON.stringify(lastElapsed));
    }, [lastElapsed]);

    const sendNotification = useCallback((title: string, body: string) => {
        if (notificationPermission === 'granted') {
            new Notification(title, { body });
        }
    }, [notificationPermission]);

    const clearAlarmInterval = () => {
        if (alarmIntervalRef.current) {
            clearInterval(alarmIntervalRef.current);
            alarmIntervalRef.current = null;
        }
    };

    useEffect(() => {
        if (gameState === GameState.DayInProgress) {
            const twoHours = 2 * 60 * 1000;
            alarmIntervalRef.current = window.setInterval(() => {
                sendNotification('Time for your juice!', `Don't forget to drink your ${PROGRAM_DATA[currentDay - 1].juiceName} and log it in the app.`);
            }, twoHours);
        } else {
            clearAlarmInterval();
        }
        
        return () => clearAlarmInterval();
    }, [gameState, currentDay, sendNotification]);

    const handleStartJourney = () => {
        setGameState(GameState.LevelStart);
        setCurrentDay(1);
        setJuicesConsumed(0);
        setMissedResponses(0);
        setSuccessfulResponses(0);
        setPurchasedLevel(null);
        setTotalMissedResponses(0);
        setImperfectCompletion(false);
    };
    
    const handleStartDay = () => {
        // For days 2 and 3, show transition screen first
        if (currentDay % 3 === 2 || currentDay % 3 === 0) {
            setGameState(GameState.DayTransition);
        } else {
            setGameState(GameState.DayStart);
        }
        setJuicesConsumed(0);
        setLastIsTimely(true);
        setLastElapsed(0);
        sendNotification(`Day ${currentDay} has begun!`, `Start your day with an affirmation and then enjoy your first juice: ${PROGRAM_DATA[currentDay - 1].juiceName}.`);
    };

    const handleJuiceResponse = (isTimely: boolean, elapsed: number = 0) => {
        setLastIsTimely(isTimely);
        setLastElapsed(elapsed);
        if (isTimely) {
            setSuccessfulResponses(prev => prev + 1);
        } else {
            setMissedResponses(prev => prev + 1);
            setTotalMissedResponses(prev => prev + 1);
        }

        if (juicesConsumed < 3) {
            setGameState(GameState.WaterBreak);
            setIsNightRest(false);
        } else {
            // Day ended, go to night rest
            setGameState(GameState.WaterBreak);
            setIsNightRest(true);
        }
    };

    const handleDayTransitionContinue = () => {
        setGameState(GameState.DayStart);
    };

    const handleAffirmationContinue = () => {
        setGameState(GameState.DayInProgress);
        sendNotification('Great job!', `Time for Juice #1: ${PROGRAM_DATA[currentDay - 1].juiceName}. Enjoy!`);
    };

    const handleWaterBreakComplete = () => {
        if (isNightRest) {
            // After night rest, advance to next day
            setIsNightRest(false);
            const nextDay = currentDay + 1;
            setCurrentDay(nextDay);
            setJuicesConsumed(0);
            setMissedResponses(0);
            setSuccessfulResponses(0);
            // Check if level complete
            if (nextDay % 3 === 1) { // Start of new level
                const levelIndex = Math.floor((nextDay - 1) / 3);
                if (levelIndex > 0) { // Completed a level
                    if (totalMissedResponses > successfulResponses) {
                        setGameState(GameState.LevelFailed);
                    } else if (totalMissedResponses < successfulResponses) {
                        if (nextDay > 9) {
                            setGameState(GameState.GameComplete);
                        } else {
                            setGameState(GameState.LevelComplete);
                            handleGenerateReward();
                        }
                    } else {
                        setGameState(GameState.LevelDecision);
                    }
                } else {
                    setGameState(GameState.LevelStart);
                }
            } else {
                setGameState(GameState.DayInProgress);
                sendNotification(`Day ${nextDay} has begun!`, `Time for Juice #1: ${PROGRAM_DATA[nextDay - 1].juiceName}. Enjoy!`);
            }
        } else {
            setJuicesConsumed(prev => prev + 1);
            setGameState(GameState.DayInProgress);
            sendNotification('Great job!', `Time for Juice #${juicesConsumed + 2}. Keep it up!`);
        }
    };
    
    const handleGenerateReward = async () => {
        setIsLoadingReward(true);
        setRewardMessage('');
        const levelIndex = Math.floor((currentDay - 1) / 3);
        const reward = await getSurpriseReward(levelIndex);
        setRewardMessage(reward);
        setIsLoadingReward(false);
    };
    
    const handleNextLevel = () => {
        setCurrentDay(prevDay => prevDay + 1);
        setGameState(GameState.LevelStart);
        setRewardMessage('');
        setMissedResponses(0);
        setSuccessfulResponses(0);
    };

    const handlePurchaseToRestart = () => {
        const levelStartDay = Math.floor((currentDay - 1) / 3) * 3 + 1;
        setCurrentDay(levelStartDay);
        setJuicesConsumed(0);
        setMissedResponses(0);
        setSuccessfulResponses(0);
        setPurchasedLevel(null); // Force re-purchase
        setCurrentScreen('checkout');
    };
    
    const handleRestartProgram = () => {
        setGameState(GameState.Welcome);
        setCurrentDay(1);
        setJuicesConsumed(0);
        setMissedResponses(0);
        setSuccessfulResponses(0);
        setRewardMessage('');
        setCurrentScreen('app');
        setPurchasedLevel(null);
        setTotalMissedResponses(0);
        setImperfectCompletion(false);
    };

    const handleQuit = () => {
        setGameState(GameState.GameFailed);
    };

    const handleGoToCheckout = () => {
        setCurrentScreen('checkout');
    };

    const handleCheckoutComplete = () => {
        setPurchasedLevel(currentLevel);
        setCurrentScreen('app');
        if (gameState === GameState.LevelFailed || gameState === GameState.LevelDecision) {
            setGameState(GameState.LevelStart);
        }
    };

    const handleProceedFromDecision = () => {
        if (currentDay === 9) {
            setGameState(GameState.GameComplete);
        } else {
            setGameState(GameState.LevelComplete);
            handleGenerateReward();
        }
    };

    const handleRestartFromDecision = () => {
        handlePurchaseToRestart();
    };

    const currentLevel = Math.ceil(currentDay / 3);
    const dayData = PROGRAM_DATA[currentDay - 1];
    const levelData = LEVEL_DATA[currentLevel - 1];
    const rewardData = LEVEL_REWARDS[currentLevel - 1];
    
    if (currentScreen === 'checkout') {
        return <CheckoutScreen levelData={levelData} onBack={() => setCurrentScreen('app')} onCheckoutComplete={handleCheckoutComplete} />;
    }

    return (
        <div className="min-h-screen bg-green-50 text-gray-800 flex flex-col items-center justify-center p-4 font-sans antialiased relative overflow-hidden">
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 opacity-10">
                <AppleIcon className="w-64 h-64 text-green-400" />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-10">
                <CucumberIcon className="w-80 h-80 text-green-400" />
            </div>

            <main className="w-full max-w-md mx-auto z-10">
                <header className="text-center mb-6">
                    <h1 className="text-5xl md:text-6xl font-bold text-green-800 tracking-wider">NINE DAYS</h1>
                    <p className="text-green-600 mt-2">Your 9-day path to a refreshed you.</p>
                </header>

                {gameState !== GameState.Welcome && gameState !== GameState.GameComplete && gameState !== GameState.GameFailed && gameState !== GameState.LevelFailed && gameState !== GameState.LevelDecision && gameState !== GameState.DayStart && gameState !== GameState.DayTransition && (
                      <ProgressIndicator currentDay={currentDay} currentLevel={currentLevel} />
                )}

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 mt-4 min-h-[480px] flex flex-col justify-center">
                    {gameState === GameState.Welcome && <WelcomeScreen onStart={handleStartJourney} />}
                    {gameState === GameState.LevelStart && <LevelStartScreen levelData={levelData} onStart={handleStartDay} onPurchase={handleGoToCheckout} autoCheck={purchasedLevel === currentLevel} />}
                    {gameState === GameState.DayTransition && <DayTransitionScreen onContinue={handleDayTransitionContinue} day={currentDay} />}
                    {gameState === GameState.DayStart && <AffirmationScreen onContinue={handleAffirmationContinue} day={currentDay} />}
                    {gameState === GameState.DayInProgress && <DayInProgressScreen day={currentDay} juiceName={dayData.juiceName} juiceIngredients={dayData.ingredients} juicesConsumed={juicesConsumed} onResponse={handleJuiceResponse} onQuit={handleQuit}/>}
                    {gameState === GameState.WaterBreak && <WaterBreakScreen onComplete={handleWaterBreakComplete} juicesConsumed={juicesConsumed} isTimely={lastIsTimely} elapsed={lastElapsed} missedResponses={missedResponses} isNightRest={isNightRest} />}
                    {gameState === GameState.GameComplete && <GameCompleteScreen onRestart={handleRestartProgram} />}
                    {gameState === GameState.GameFailed && <GameFailedScreen onRestart={handleRestartProgram} imperfect={imperfectCompletion} />}
                    {gameState === GameState.LevelFailed && <LevelFailedScreen onPurchaseToRestart={handlePurchaseToRestart} onQuit={handleQuit} />}
                    {gameState === GameState.LevelDecision && <LevelDecisionScreen onProceed={handleProceedFromDecision} onRestart={handleRestartFromDecision} />}
                </div>
            </main>
            
            {gameState === GameState.LevelComplete && (
                <LevelCompleteModal 
                    level={currentLevel}
                    rewardTitle={rewardData.title}
                    RewardIcon={rewardData.icon}
                    surpriseMessage={rewardMessage}
                    isLoading={isLoadingReward}
                    onNextLevel={handleNextLevel}
                />
            )}
        </div>
    );
};

export default App;