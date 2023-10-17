import { color } from '@reptile-region/design-system';
import React from 'react';
import type { PropsWithChildren } from 'react';
import type { Insets } from 'react-native';

import BackDrop from '../components/BackDrop';
import BottomSheetProvider from '../providers/BottomSheetProvider';
import type { BackDropStyle, ContainerStyle, SnapInfo } from '../types/bottom-sheet';

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
            <BackDrop style={backDropStyle} />
            <BottomSheetContainer style={{ ...containerStyle, paddingBottom: insets?.bottom }}>
                <BottomSheetHeader />
                {children}
            </BottomSheetContainer>
        </BottomSheetProvider>
    );
};

export default BottomSheet;
