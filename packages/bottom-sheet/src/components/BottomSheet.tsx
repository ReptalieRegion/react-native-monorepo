import { color } from '@reptile-region/design-system';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { Modal, type Insets } from 'react-native';

import BackDrop from '../components/BackDrop';
import BottomSheetProvider from '../providers/BottomSheetProvider';
import type { BackDropStyle, ContainerStyle, SnapInfo } from '../types/bottom-sheet';

import BottomSheetContainer from './BottomSheetContainer';
import BottomSheetHeader, { type BottomSheetHeaderProps } from './BottomSheetHeader';

type BottomSheetProps = {
    onClose: () => void;
    backDropStyle?: BackDropStyle;
    containerStyle?: ContainerStyle;
    snapInfo: SnapInfo;
    insets?: Insets;
} & BottomSheetHeaderProps;

const BottomSheet = ({
    containerStyle = {
        borderTopRightRadius: 16,
        borderTopEndRadius: 16,
        borderTopLeftRadius: 16,
        borderTopStartRadius: 16,
    },
    backDropStyle = { backgroundColor: color.DarkGray[500].alpha(0.3).toString() },
    children,
    snapInfo,
    insets,
    header,
    onClose,
}: PropsWithChildren<BottomSheetProps>) => {
    return (
        <Modal transparent={true}>
            <BottomSheetProvider insets={insets} onClose={onClose} snapInfo={snapInfo}>
                <BackDrop style={backDropStyle} />
                <BottomSheetContainer style={{ ...containerStyle, paddingBottom: insets?.bottom }}>
                    <BottomSheetHeader header={header} />
                    {children}
                </BottomSheetContainer>
            </BottomSheetProvider>
        </Modal>
    );
};

export default BottomSheet;
