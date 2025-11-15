import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState } from './types';
import { PROGRAM_DATA, LEVEL_REWARDS, LEVEL_DATA } from './constants';
import { getSurpriseReward } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LevelStartScreen } from './components/LevelStartScreen';
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
    const [gameState, setGameState] = useState<GameState>(GameState.Welcome);
    const [currentScreen, setCurrentScreen] = useState<'app' | 'checkout'>('app');
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [juicesConsumed, setJuicesConsumed] = useState<number>(0);
    const [missedResponses, setMissedResponses] = useState<number>(0);
    const [successfulResponses, setSuccessfulResponses] = useState<number>(0);
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
    const [rewardMessage, setRewardMessage] = useState<string>('');
    const [isLoadingReward, setIsLoadingReward] = useState<boolean>(false);
    const [purchasedLevel, setPurchasedLevel] = useState<number | null>(null);
    const [totalMissedResponses, setTotalMissedResponses] = useState<number>(0);
    const [imperfectCompletion, setImperfectCompletion] = useState<boolean>(false);

    const alarmIntervalRef = useRef<number | null>(null);

    useEffect(() => {
        Notification.requestPermission().then(setNotificationPermission);
    }, []);

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
        setGameState(GameState.DayInProgress);
        setJuicesConsumed(0);
        sendNotification(`Day ${currentDay} has begun!`, `Time for Juice #1: ${PROGRAM_DATA[currentDay - 1].juiceName}. Enjoy!`);
    };

    const handleJuiceResponse = (isTimely: boolean) => {
        if (isTimely) {
            setSuccessfulResponses(prev => prev + 1);
        } else {
            setMissedResponses(prev => prev + 1);
            setTotalMissedResponses(prev => prev + 1);
        }

        if (juicesConsumed < 3) {
            setGameState(GameState.WaterBreak);
        } else {
            // After 4th juice, end of day.
            if (currentDay % 3 === 0) { // End of a level
                const finalSuccessCount = isTimely ? successfulResponses + 1 : successfulResponses;
                const finalMissedCount = !isTimely ? missedResponses + 1 : missedResponses;

                if (finalMissedCount > finalSuccessCount) {
                    setGameState(GameState.LevelFailed);
                } else if (finalMissedCount < finalSuccessCount) {
                    if (currentDay === 9) {
                        const finalTotalMissed = !isTimely ? totalMissedResponses + 1 : totalMissedResponses;
                        if (finalTotalMissed > 0) {
                            setImperfectCompletion(true);
                            setGameState(GameState.GameFailed);
                        } else {
                            setGameState(GameState.GameComplete);
                        }
                    } else {
                        setGameState(GameState.LevelComplete);
                        handleGenerateReward();
                    }
                } else { // Tie
                    setGameState(GameState.LevelDecision);
                }
            } else {
                // Not end of level, so advance to next day directly
                const nextDay = currentDay + 1;
                setCurrentDay(nextDay);
                setJuicesConsumed(0); // Reset for new day
                setGameState(GameState.DayInProgress);
                sendNotification(`Day ${nextDay} has begun!`, `Time for Juice #1: ${PROGRAM_DATA[nextDay - 1].juiceName}. Enjoy!`);
            }
        }
    };

    const handleWaterBreakComplete = () => {
        setJuicesConsumed(prev => prev + 1);
        setGameState(GameState.DayInProgress);
        sendNotification('Great job!', `Time for Juice #${juicesConsumed + 2}. Keep it up!`);
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

                {gameState !== GameState.Welcome && gameState !== GameState.GameComplete && gameState !== GameState.GameFailed && gameState !== GameState.LevelFailed && gameState !== GameState.LevelDecision && (
                     <ProgressIndicator currentDay={currentDay} currentLevel={currentLevel} />
                )}

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 mt-4 min-h-[480px] flex flex-col justify-center">
                    {gameState === GameState.Welcome && <WelcomeScreen onStart={handleStartJourney} />}
                    {gameState === GameState.LevelStart && <LevelStartScreen levelData={levelData} onStart={handleStartDay} onPurchase={handleGoToCheckout} autoCheck={purchasedLevel === currentLevel} />}
                    {gameState === GameState.DayInProgress && <DayInProgressScreen day={currentDay} juiceName={dayData.juiceName} juiceIngredients={dayData.ingredients} juicesConsumed={juicesConsumed} onResponse={handleJuiceResponse} onQuit={handleQuit}/>}
                    {gameState === GameState.WaterBreak && <WaterBreakScreen onComplete={handleWaterBreakComplete} juicesConsumed={juicesConsumed} />}
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