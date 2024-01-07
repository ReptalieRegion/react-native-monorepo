import { createContext } from 'react';

type HeartAnimationState = {
    isStartHeartAnimation: boolean;
};

interface HeartAnimationActions {
    startHeartAnimation(): void;
    stopHeartAnimation(): void;
}

export const HeartAnimationStateContext = createContext<HeartAnimationState | null>(null);

export const HeartAnimationActionsContext = createContext<HeartAnimationActions | null>(null);
