import { Typo, color, type TextColorType } from '@crawl/design-system';
import React, { useRef } from 'react';
import { ActivityIndicator, Platform, StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { CancelButton, Error, Success } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';

type SignUpTextFieldState = {
    value: string;
    label: string;
    isLoading: boolean;
    errorMessage?: string | undefined;
    autoFocus?: boolean;
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

export default function SignUpTextField({
    label,
    value,
    errorMessage,
    isLoading,
    autoFocus,
    onChangeText,
    onPressCancel,
}: SignUpTextFieldProps) {
    const textInputRef = useRef<TextInput>(null);

    const handleFocus = () => {
        textInputRef.current?.focus();
    };

    const style = makeTextInputStyles(!!errorMessage);

    return (
        <TouchableWithoutFeedback onPress={handleFocus}>
            <View style={[styles.wrapper, { borderColor: style.borderColor }]}>
                <View style={styles.textFieldContainer}>
                    <Typo variant="body4" color={style.textColor}>
                        {label}
                    </Typo>
                    <TextInput
                        autoFocus={autoFocus}
                        style={styles.textInput}
                        ref={textInputRef}
                        value={value}
                        onChangeText={onChangeText}
                    />
                </View>
                <View style={styles.successIconContainer}>
                    <ConditionalRenderer
                        condition={!!errorMessage}
                        trueContent={
                            <ConditionalRenderer
                                condition={value === ''}
                                trueContent={<Error fill={style.borderColor} />}
                                falseContent={
                                    <TouchableOpacity onPress={onPressCancel}>
                                        <CancelButton width={24} height={24} />
                                    </TouchableOpacity>
                                }
                            />
                        }
                        falseContent={
                            <ConditionalRenderer
                                condition={isLoading}
                                trueContent={<ActivityIndicator size={'small'} />}
                                falseContent={<Success fill={color.Green[800].toString()} />}
                            />
                        }
                    />
                </View>
            </View>
            <Typo variant="body4" color="error">
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
        marginBottom: 10,
        gap: 20,
    },
    textFieldContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    successIconContainer: {
        justifyContent: 'center',
    },
    textInput: {
        ...Platform.select({
            android: {
                padding: 0,
            },
        }),
    },
});
