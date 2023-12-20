import { Typo, color, type TextColorType, type VariantType } from '@crawl/design-system';
import React, { useMemo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ConditionalRenderer from '../ConditionalRenderer';

type TagViewSize = 'small' | 'medium' | 'large';

type TagColor = 'primary' | 'placeholder' | 'default' | 'fill-primary';

export type TagViewState = {
    label: string;
    color?: TagColor;
    size?: TagViewSize;
    borderStyle?: Pick<ViewStyle, 'borderStyle'>['borderStyle'];
};

interface TagViewActions {
    onPress?(): void;
}

type TagViewProps = TagViewState & TagViewActions;

export default function TagView(props: TagViewProps): React.JSX.Element {
    const colorStyle = colorGenerator(props.color ?? 'primary');
    const size = sizeGenerator(props?.size ?? 'small');

    const wrapperStyle = useMemo(
        () => StyleSheet.flatten([styles.container, size.view, colorStyle.view, { borderStyle: props.borderStyle }]),
        [colorStyle.view, props.borderStyle, size.view],
    );

    return (
        <ConditionalRenderer
            condition={!!props?.onPress}
            trueContent={
                <TouchableOpacity onPress={props?.onPress}>
                    <View style={wrapperStyle}>
                        <Typo variant={size.text.variant} color={colorStyle.text.color} textAlign="center">
                            {props.label}
                        </Typo>
                    </View>
                </TouchableOpacity>
            }
            falseContent={
                <View style={wrapperStyle}>
                    <Typo variant={size.text.variant} color={colorStyle.text.color} textAlign="center">
                        {props.label}
                    </Typo>
                </View>
            }
        />
    );
}

function sizeGenerator(size: TagViewSize): { text: { variant: VariantType }; view: ViewStyle } {
    switch (size) {
        case 'small':
            return {
                text: {
                    variant: 'body4',
                },
                view: {
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                },
            };
        case 'medium':
            return {
                text: {
                    variant: 'body2',
                },
                view: {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                },
            };
        case 'large':
            return {
                text: {
                    variant: 'body1',
                },
                view: {
                    minWidth: 40,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                },
            };
    }
}

function colorGenerator(propColor: TagColor): { text: { color: TextColorType }; view: ViewStyle } {
    switch (propColor) {
        case 'primary':
            return {
                text: {
                    color: 'primary',
                },
                view: {
                    borderColor: color.Teal[150].toString(),
                },
            };
        case 'fill-primary':
            return {
                text: {
                    color: 'surface',
                },
                view: {
                    backgroundColor: color.DarkGray[350].toString(),
                    borderColor: color.DarkGray[350].toString(),
                },
            };
        case 'placeholder':
            return {
                text: {
                    color: 'placeholder',
                },
                view: {
                    borderColor: color.Gray[500].toString(),
                },
            };
        case 'default':
            return {
                text: {
                    color: 'default',
                },
                view: {
                    borderColor: color.Gray[500].toString(),
                },
            };
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    empty: {
        flex: 1,
    },
});
