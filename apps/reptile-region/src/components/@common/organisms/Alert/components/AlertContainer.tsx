import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { Modal, StyleSheet, View, useWindowDimensions } from 'react-native';

import useAlertHandler from '../hooks/useAlertHandler';
import useAlertState from '../hooks/useAlertState';

import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';

export default function AlertContainer() {
    const { width } = useWindowDimensions();
    const { show, contents, title, buttons } = useAlertState();
    const { closeAlert } = useAlertHandler();
    const modalWidth = width - 80;

    return (
        <Modal visible={show} transparent={true}>
            <View style={styles.container}>
                <View style={[styles.modalContainer, { width: modalWidth }]}>
                    <View style={styles.textContainer}>
                        <Typo variant="title1">{title}</Typo>
                        <ConditionalRenderer
                            condition={!!contents}
                            trueContent={
                                <Typo variant="body1" color="sub-placeholder">
                                    {contents}
                                </Typo>
                            }
                            falseContent={null}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        {buttons.map((button, index) => {
                            const handleButtonClick = () => {
                                closeAlert();
                                button.onPress?.();
                            };

                            switch (button.type) {
                                case 'ok':
                                    return (
                                        <View key={index} style={styles.buttonContainer}>
                                            <ConfirmButton
                                                text={button.text}
                                                variant="confirm"
                                                size="modal"
                                                onPress={handleButtonClick}
                                            />
                                        </View>
                                    );
                                case 'cancel':
                                default:
                                    return (
                                        <View key={index} style={styles.buttonContainer}>
                                            <ConfirmButton
                                                text={button.text}
                                                variant="cancel"
                                                size="modal"
                                                onPress={handleButtonClick}
                                            />
                                        </View>
                                    );
                            }
                        })}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.DarkGray[500].alpha(0.3).toString(),
    },
    modalContainer: {
        backgroundColor: color.White.toString(),
        margin: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
    },
    textContainer: {
        marginBottom: 20,
        gap: 10,
    },
    buttonWrapper: {
        flexDirection: 'row',
        gap: 10,
    },
    buttonContainer: {
        flex: 1,
    },
});
