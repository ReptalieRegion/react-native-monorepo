import { Typo, color, type TypoProps } from '@crawl/design-system';
import React, { type ReactNode } from 'react';
import { Dimensions, StyleSheet, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ConditionalRenderer from '../ConditionalRenderer';

type ConfirmButtonVariant = 'confirm' | 'cancel' | 'text' | 'outline';

type ConfirmButtonSize = 'small' | 'medium' | 'large' | 'full' | 'modal';

type ConfirmButtonState = {
    text: string;
    variant?: ConfirmButtonVariant;
    size?: ConfirmButtonSize;
    disabled?: boolean;
};

interface ConfirmButtonActions {
    Icon?: ReactNode;
    onPress?(): void;
}

type ConfirmButtonProps = ConfirmButtonState & ConfirmButtonActions;

export default function ConfirmButton({
    text,
    variant = 'confirm',
    size = 'medium',
    disabled = false,
    Icon,
    onPress,
}: ConfirmButtonProps) {
    const generatedSize = styleSizeGenerator(size);
    const generatedColor = styleVariantGenerator(variant, disabled);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                containerStyle={[styles.view, generatedSize.view, generatedColor.view]}
                onPress={onPress}
                disabled={disabled}
            >
                <ConditionalRenderer condition={!!Icon} trueContent={Icon} falseContent={null} />
                <Typo
                    variant={generatedSize.text.variant}
                    textAlign="center"
                    textAlignVertical="center"
                    color={generatedColor.text.color}
                >
                    {text}
                </Typo>
            </TouchableOpacity>
        </View>
    );
}

function styleVariantGenerator(
    variant: ConfirmButtonVariant,
    disabled: boolean,
): { view: ViewStyle; text: Pick<TypoProps, 'color'> } {
    switch (variant) {
        case 'confirm':
            return {
                view: {
                    backgroundColor: disabled ? '#9FD1C0' : color.Teal[150].toString(),
                },
                text: {
                    color: 'surface',
                },
            };
        case 'cancel':
            return {
                view: {
                    backgroundColor: color.Gray[75].toString(),
                },
                text: {
                    color: 'sub-default',
                },
            };
        case 'text':
            return {
                view: {
                    backgroundColor: color.White.toString(),
                },
                text: {
                    color: 'primary',
                },
            };
        case 'outline':
            return {
                view: {
                    borderWidth: 1,
                    borderColor: color.Green[750].toString(),
                },
                text: {
                    color: 'primary',
                },
            };
    }
}

function styleSizeGenerator(size: ConfirmButtonSize): { view: ViewStyle; text: Pick<TypoProps, 'variant'> } {
    switch (size) {
        case 'medium':
            return {
                view: {
                    borderRadius: 15,
                    width: Dimensions.get('screen').width - 40,
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
                    paddingVertical: 10,
                    maxWidth: 140,
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
        case 'modal':
            return {
                view: {
                    borderRadius: 15,
                    paddingHorizontal: 15,
                    height: 55,
                    width: '100%',
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
        gap: 5,
    },
    container: {
        flexDirection: 'row',
    },
});
