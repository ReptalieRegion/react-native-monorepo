import React, { PropsWithChildren, useMemo } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';

import BottomSheetContainer, { BottomSheetContainerProps } from '../atoms/BottomSheetContainer';
import BottomSheetHeader, { BottomSheetHeaderProps } from '../atoms/BottomSheetHeader';

import { UIPromptsDefaultProps } from '<UIPrompts>';
import useBottomSheetGestureAnimation, { UseBottomSheetGestureProps } from '@/hooks/useBottomSheetGestureAnimation';

type BottomSheetProps = {
    containerProps?: BottomSheetContainerProps;
    gestureProps: Omit<UseBottomSheetGestureProps, 'onClose'>;
    headerProps?: BottomSheetHeaderProps;
} & UIPromptsDefaultProps;

const BottomSheet = ({
    uiPromptsClose,
    children,
    containerProps,
    gestureProps,
    headerProps,
}: PropsWithChildren<BottomSheetProps>) => {
    const { gesture, snapAnimatedStyles, closeAnimatedStyles } = useBottomSheetGestureAnimation({
        ...gestureProps,
        onClose: uiPromptsClose,
    });
    const memoChildren = useMemo(() => children, [children]);

    return (
        <BottomSheetContainer
            uiPromptsClose={uiPromptsClose}
            snapAnimatedStyles={snapAnimatedStyles}
            closeAnimatedStyles={closeAnimatedStyles}
            {...containerProps}
        >
            <GestureDetector gesture={gesture}>
                <BottomSheetHeader {...headerProps} />
            </GestureDetector>
            {memoChildren}
        </BottomSheetContainer>
    );
};

export default BottomSheet;
