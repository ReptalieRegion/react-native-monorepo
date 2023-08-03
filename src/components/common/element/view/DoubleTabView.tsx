import React, { PropsWithChildren } from 'react';
import { GestureResponderEvent, View, ViewProps } from 'react-native';

import { customDoubleTab } from '@/utils/gesture';

interface DoubleTabViewProps extends ViewProps {
    onDoubleTab: (event: GestureResponderEvent) => void;
}

const DoubleTabView = ({ children, onDoubleTab, ...props }: PropsWithChildren<DoubleTabViewProps>) => {
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
};

export default DoubleTabView;
