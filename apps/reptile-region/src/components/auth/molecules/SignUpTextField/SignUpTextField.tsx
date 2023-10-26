import { Typo, color, type TextColorType } from '@reptile-region/design-system';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { CancelButton, Success } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';

type SignUpTextFieldState = {
    label: string;
    isLoading: boolean;
    errorMessage?: string | undefined;
};

interface SignUpTextFieldActions {
    onChangeText(text: string): void;
    onPressCancel?(): void;
}

type SignUpTextFieldProps = SignUpTextFieldState & SignUpTextFieldActions;

type TextInputType = 'ERROR' | 'SUCCESS';

type TextInputStyles = {
    [key in TextInputType]: {
        borderColor: string;
        textColor: TextColorType;
    };
};

const TEXT_INPUT_STYLES: TextInputStyles = {
    ERROR: {
        borderColor: color.Red[500].toString(),
        textColor: 'error',
    },
    SUCCESS: {
        borderColor: color.Gray[700].toString(),
        textColor: 'default',
    },
};

const makeTextInputStyles = (isError: boolean) => {
    const type: TextInputType = isError ? 'ERROR' : 'SUCCESS';
    return TEXT_INPUT_STYLES[type];
};

export default function SignUpTextField({ label, errorMessage = 'afsadds', isLoading, onChangeText }: SignUpTextFieldProps) {
    const textInputRef = useRef<TextInput>(null);
    const [currentText, setCurrentText] = useState('');

    useEffect(() => {
        onChangeText(currentText);
    }, [currentText, onChangeText]);

    const handleFocus = () => {
        textInputRef.current?.focus();
    };

    const handleChangeText = (text: string) => {
        setCurrentText(text);
    };

    const handlePressCancel = () => {
        setCurrentText('');
    };

    const style = makeTextInputStyles(!!errorMessage);

    return (
        <TouchableWithoutFeedback onPress={handleFocus}>
            <View style={[styles.wrapper, { borderColor: style.borderColor }]}>
                <View style={styles.textFieldContainer}>
                    <Typo variant="body4" color={style.textColor}>
                        {label}
                    </Typo>
                    <TextInput ref={textInputRef} value={currentText} onChangeText={handleChangeText} />
                </View>
                <ConditionalRenderer
                    condition={isLoading}
                    trueContent={<ActivityIndicator size={'small'} />}
                    falseContent={
                        <View style={styles.successIconContainer}>
                            <ConditionalRenderer
                                condition={!!errorMessage}
                                trueContent={
                                    <TouchableOpacity onPress={handlePressCancel}>
                                        <CancelButton width={24} height={24} />
                                    </TouchableOpacity>
                                }
                                falseContent={
                                    <ConditionalRenderer
                                        condition={currentText === ''}
                                        trueContent={null}
                                        falseContent={<Success fill={color.Green[800].toString()} />}
                                    />
                                }
                            />
                        </View>
                    }
                />
            </View>
            <Typo variant="body5" color="error">
                {errorMessage}
            </Typo>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 5,
        gap: 20,
    },
    textFieldContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    successIconContainer: {
        justifyContent: 'center',
    },
});
