import { color } from 'design-system';
import React, { PropsWithChildren } from 'react';
import { Insets } from 'react-native';

import BackDrop from '../components/BackDrop';
import BottomSheetProvider from '../providers/BottomSheetProvider';
import { BackDropStyle, ContainerStyle, SnapInfo } from '../types/bottom-sheet';

import BottomSheetContainer from './BottomSheetContainer';
import BottomSheetHeader from './BottomSheetHeader';

type BottomSheetProps = {
    onClose: () => void;
    backDropStyle?: BackDropStyle;
    containerStyle?: ContainerStyle;
    snapInfo: SnapInfo;
    insets?: Insets;
};

const BottomSheet = ({
    containerStyle = {
        borderTopRightRadius: 16,
        borderTopEndRadius: 16,
        borderTopLeftRadius: 16,
        borderTopStartRadius: 16,
    },
    backDropStyle = { backgroundColor: color.Black.alpha(0.3).toString() },
    children,
    snapInfo,
    insets,
    onClose,
}: PropsWithChildren<BottomSheetProps>) => {
    return (
        <BottomSheetProvider insets={insets} onClose={onClose} snapInfo={snapInfo}>
            <BackDrop style={backDropStyle}>
                <BottomSheetContainer style={containerStyle}>
                    <BottomSheetHeader />
                    {children}
                </BottomSheetContainer>
            </BackDrop>
        </BottomSheetProvider>
    );
};

export default BottomSheet;
