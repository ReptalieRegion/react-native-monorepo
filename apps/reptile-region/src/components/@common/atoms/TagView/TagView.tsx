import { Typo, color, type VariantType } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ConditionalRenderer from '../ConditionalRenderer';

type TagViewSize = 'small' | 'medium' | 'large';

type TagViewState = {
    label: string;
    color?: 'primary' | 'placeholder';
    size?: TagViewSize;
};

interface TagViewActions {
    onPress?(): void;
}

type TagViewProps = TagViewState & TagViewActions;

const variantMap = {
    primary: color.Teal[150].toString(),
    placeholder: color.Gray[500].toString(),
};

export default function TagView(props: TagViewProps): React.JSX.Element {
    const colorType = props?.color ?? 'primary';
    const borderColor = variantMap[colorType];
    const size = sizeGenerator(props?.size ?? 'small');

    return (
        <ConditionalRenderer
            condition={!!props?.onPress}
            trueContent={
                <TouchableOpacity onPress={props?.onPress}>
                    <View style={[styles.container, styles.tag, { borderColor }, size.view]}>
                        <Typo variant={size.text.variant} color={colorType} textAlign="center">
                            {props.label}
                        </Typo>
                    </View>
                </TouchableOpacity>
            }
            falseContent={
                <View style={[styles.container, styles.tag, { borderColor }, size.view]}>
                    <Typo variant={size.text.variant} color={colorType} textAlign="center">
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tag: {
        borderRadius: 15,
        borderWidth: 1,
    },
    empty: {
        flex: 1,
    },
});
