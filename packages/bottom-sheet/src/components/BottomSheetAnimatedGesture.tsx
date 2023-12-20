import type { ReactNode } from 'react';
import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';

import useBottomSheetGestureAnimation from '../hooks/useGestureAnimation';

export default function BottomSheetAnimatedGesture({ children }: { children: ReactNode }) {
    const panGesture = useBottomSheetGestureAnimation();

    return <GestureDetector gesture={panGesture}>{children}</GestureDetector>;
}
