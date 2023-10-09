import { createContext } from 'react';

export type FloatingActionButtonState = {
    startAnimation: boolean;
};

interface SecondaryIconUpAnimation {
    type: 'SECONDARY_UP_ANIMATION';
}

interface SecondaryIconDownAnimation {
    type: 'SECONDARY_DOWN_ANIMATION';
}

export type FloatingActionButtonActions = SecondaryIconUpAnimation | SecondaryIconDownAnimation;

export const FloatingActionButtonStateContext = createContext<FloatingActionButtonState | null>(null);

export const FloatingActionButtonActionsContext = createContext<React.Dispatch<FloatingActionButtonActions> | null>(null);
