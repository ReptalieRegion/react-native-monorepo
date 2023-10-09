import { createContext } from 'react';

type ImagesIndicatorState = {
    indicatorIndex: number;
};

interface ImagesIndicatorActions {
    calcIndicatorIndex(baseWidth: number, width: number): void;
}

export const ImagesIndicatorStateContext = createContext<ImagesIndicatorState | null>(null);

export const ImageIndicatorActionsContext = createContext<ImagesIndicatorActions | null>(null);
