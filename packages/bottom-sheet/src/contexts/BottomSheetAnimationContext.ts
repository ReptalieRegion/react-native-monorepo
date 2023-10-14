import { createContext } from 'react';

import type { BottomSheetAnimationAction, BottomSheetAnimationState } from '../types/bottom-sheet';

export const BottomSheetAnimationStateContext = createContext<BottomSheetAnimationState | null>(null);

export const BottomSheetAnimationActionContext = createContext<BottomSheetAnimationAction | null>(null);
