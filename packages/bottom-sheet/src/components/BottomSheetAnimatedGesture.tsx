import React from 'react';
import type { ReactNode } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';

import useBottomSheetGestureAnimation from '../hooks/useGestureAnimation';

const BottomSheetAnimatedGesture = ({ children }: { children: ReactNode }) => {
    const panGesture = useBottomSheetGestureAnimation();

    return <GestureDetector gesture={panGesture}>{children}</GestureDetector>;
};

export default BottomSheetAnimatedGesture;
