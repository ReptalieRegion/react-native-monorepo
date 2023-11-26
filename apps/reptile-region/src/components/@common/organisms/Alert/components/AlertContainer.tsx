import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { Modal, StyleSheet, View, useWindowDimensions } from 'react-native';

import useAlertHandler from '../hooks/useAlertHandler';
import useAlertState from '../hooks/useAlertState';

import { ConditionalRenderer, TextButton } from '@/components/@common/atoms';

export default function AlertContainer() {
    const { width } = useWindowDimensions();
    const { show, contents, title, buttons } = useAlertState();
    const { closeAlert } = useAlertHandler();
    const modalWidth = width < 275 ? width * 0.8 : 275;
    const buttonWidth = modalWidth / 2 - 30;

    return (
        <Modal visible={show} transparent={true}>
            <View style={styles.container}>
                <View style={[styles.modalContainer, { width: modalWidth }]}>
                    <View style={styles.textContainer}>
                        <Typo variant="title3" textAlign="center">
                            {title}
                        </Typo>
                        <ConditionalRenderer
                            condition={!!contents}
                            trueContent={
                                <Typo variant="body2" textAlign="center">
                                    {contents}
                                </Typo>
                            }
                            falseContent={null}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        {buttons.map((button, index) => {
                            const handleButtonClick = () => {
                                closeAlert();
                                button.onPress?.();
                            };

                            switch (button.type) {
                                case 'ok':
                                    return (
                                        <TextButton
                                            key={button.text + index}
                                            type="view"
                                            color="surface"
                                            text={button?.text ?? '확인'}
                                            onPress={handleButtonClick}
                                            containerStyle={{ width: buttonWidth }}
                                        />
                                    );
                                case 'cancel':
                                default:
                                    return (
                                        <TextButton
                                            key={button.text + index}
                                            type="outline"
                                            text={button?.text ?? '취소'}
                                            color="sub-placeholder"
                                            onPress={handleButtonClick}
                                            containerStyle={{ width: buttonWidth }}
                                        />
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
        backgroundColor: color.Black.alpha(0.65).toString(),
    },
    modalContainer: {
        backgroundColor: color.White.toString(),
        paddingHorizontal: 20,
        paddingVertical: 26,
        borderRadius: 10,
    },
    textContainer: {
        marginBottom: 20,
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
});
