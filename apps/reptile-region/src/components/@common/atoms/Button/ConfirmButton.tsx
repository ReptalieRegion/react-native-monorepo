import { Typo, color, type TypoProps } from '@reptile-region/design-system';
import React from 'react';
import { Dimensions, StyleSheet, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ConfirmButtonVariant = 'confirm' | 'cancel' | 'sub';

type ConfirmButtonSize = 'small' | 'medium' | 'large' | 'full';

type ConfirmButtonState = {
    text: string;
    variant?: ConfirmButtonVariant;
    size?: ConfirmButtonSize;
    disabled?: boolean;
};

interface ConfirmButtonActions {
    onPress?(): void;
}

type ConfirmButtonProps = ConfirmButtonState & ConfirmButtonActions;

export default function ConfirmButton({
    text,
    variant = 'confirm',
    size = 'medium',
    disabled = false,
    onPress,
}: ConfirmButtonProps) {
    const generatedSize = styleSizeGenerator(size);
    const generatedColor = styleVariantGenerator(variant);

    return (
        <TouchableOpacity
            containerStyle={styles.container}
            style={styles.container}
            activeOpacity={0.5}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={[styles.view, generatedSize.view, generatedColor.view]}>
                <Typo
                    variant={generatedSize.text.variant}
                    textAlign="center"
                    textAlignVertical="center"
                    color={generatedColor.text.color}
                >
                    {text}
                </Typo>
            </View>
        </TouchableOpacity>
    );
}

function styleVariantGenerator(variant: ConfirmButtonVariant): { view: ViewStyle; text: Pick<TypoProps, 'color'> } {
    switch (variant) {
        case 'confirm':
            return {
                view: {
                    backgroundColor: color.Teal[150].toString(),
                },
                text: {
                    color: 'surface',
                },
            };
        case 'cancel':
            return {
                view: {
                    backgroundColor: color.BlueGray[75].toString(),
                },
                text: {
                    color: 'sub-default',
                },
            };
        case 'sub':
            return {
                view: {},
                text: {},
            };
    }
}

function styleSizeGenerator(size: ConfirmButtonSize): { view: ViewStyle; text: Pick<TypoProps, 'variant'> } {
    switch (size) {
        case 'medium':
            return {
                view: {
                    borderRadius: 15,
                    width: 353,
                    height: 53,
                },
                text: {
                    variant: 'title3',
                },
            };
        case 'small':
            return {
                view: {
                    borderRadius: 15,
                    paddingHorizontal: 15,
                    height: 36,
                    maxWidth: 100,
                },
                text: {
                    variant: 'title3',
                },
            };
        case 'large':
            return {
                view: {
                    width: 390,
                    height: 55,
                },
                text: {
                    variant: 'title3',
                },
            };
        case 'full':
            return {
                view: {
                    width: Dimensions.get('screen').width,
                    height: 55,
                },
                text: {
                    variant: 'title3',
                },
            };
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
    },
});
