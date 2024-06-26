import React from 'react';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import type { GestureResponderEvent, ViewProps } from 'react-native';

import { customDoubleTab } from '@/utils/gesture';

interface DoubleTabViewProps extends ViewProps {
    onDoubleTab: (event: GestureResponderEvent) => void;
}

export default function DoubleTabView({ children, onDoubleTab, ...props }: PropsWithChildren<DoubleTabViewProps>) {
    const doubleTab = customDoubleTab();
    const touchEndEvent = (event: GestureResponderEvent) => {
        if (!onDoubleTab) {
            return;
        }

        doubleTab.end(event);
        const isDoubleTab = doubleTab.getIsDoubleTab();
        if (isDoubleTab) {
            onDoubleTab(event);
        }
    };

    return (
        <View
            {...props}
            onTouchStart={doubleTab.start}
            onTouchMove={doubleTab.move}
            onTouchEnd={touchEndEvent}
            onTouchCancel={touchEndEvent}
        >
            {children}
        </View>
    );
}
