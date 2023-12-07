import { Typo, color } from '@reptile-region/design-system';
import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import Variety from '@/components/diary/organisms/Variety/Variety';
import type { EntityVariety } from '@/types/apis/diary/entity';

type VarietyModalState = {
    initialSelected: EntityVariety;
    visible: boolean;
};

interface VarietyModalActions {
    onComplete(selectedVariety: EntityVariety): void;
    onClose(): void;
}

type VarietyModalProps = VarietyModalState & VarietyModalActions;

export default function VarietyModal({ visible, initialSelected, onComplete, onClose }: VarietyModalProps) {
    const [variety, setVariety] = useState<EntityVariety>(initialSelected);
    const { bottom, left, right, top } = useSafeAreaInsets();

    const handleChangeVariety = useCallback((changeVariety: EntityVariety) => {
        setVariety(changeVariety);
    }, []);

    const handleComplete = () => {
        onComplete(variety);
    };

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={[styles.wrapper, { paddingBottom: bottom, paddingLeft: left, paddingRight: right, paddingTop: top }]}>
                <View style={styles.container}>
                    <View>
                        <Typo>종류 모프</Typo>
                    </View>
                    <Variety initialSelected={initialSelected} onChangeVariety={handleChangeVariety} />
                    <View style={styles.buttonWrapper}>
                        <View style={styles.buttonContainer}>
                            <ConfirmButton text="취소" variant="cancel" size="modal" onPress={onClose} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <ConfirmButton text="적용하기" variant="confirm" size="modal" onPress={handleComplete} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    buttonWrapper: {
        marginTop: 'auto',
        flexDirection: 'row',
        gap: 10,
    },
    buttonContainer: {
        flex: 1,
    },
});
