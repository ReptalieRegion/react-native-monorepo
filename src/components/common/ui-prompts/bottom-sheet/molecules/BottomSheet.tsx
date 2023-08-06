import React, { PropsWithChildren } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';

import BottomSheetContainer, { BottomSheetContainerProps } from '../atoms/BottomSheetContainer';
import BottomSheetHeader from '../atoms/BottomSheetHeader';

import { UIPromptsDefaultProps } from '<UIPrompts>';
import useBottomSheetGestureAnimation, { UseBottomSheetGestureProps } from '@/hooks/useBottomSheetGestureAnimation';

type BottomSheetProps = BottomSheetContainerProps & Omit<UseBottomSheetGestureProps, 'onClose'> & UIPromptsDefaultProps;

const BottomSheet = ({
    uiPromptsClose,
    children,
    backDropStyle,
    containerStyle,
    snapInfo,
}: PropsWithChildren<BottomSheetProps>) => {
    const { gesture, snapAnimatedStyles, closeAnimatedStyles } = useBottomSheetGestureAnimation({
        snapInfo,
        onClose: uiPromptsClose,
    });

    return (
        <BottomSheetContainer
            uiPromptsClose={uiPromptsClose}
            containerStyle={containerStyle}
            backDropStyle={backDropStyle}
            snapAnimatedStyles={snapAnimatedStyles}
            closeAnimatedStyles={closeAnimatedStyles}
        >
            <GestureDetector gesture={gesture}>
                <BottomSheetHeader />
            </GestureDetector>
            {children}
        </BottomSheetContainer>
    );
};

export default BottomSheet;
