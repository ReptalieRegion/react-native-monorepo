import { Typo } from '@crawl/design-system';
import React, { useMemo, type ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

import { styles } from './styles';

type DisableListItemState = {
    label: string;
    content: string | undefined | ReactNode;
    containerStyle?: Pick<
        ViewStyle,
        | 'padding'
        | 'paddingBottom'
        | 'paddingEnd'
        | 'paddingHorizontal'
        | 'paddingLeft'
        | 'paddingRight'
        | 'paddingStart'
        | 'paddingTop'
        | 'paddingVertical'
    >;
};

export type DisableListItemProps = DisableListItemState;

export default function DisableListItem({ label, content, containerStyle }: DisableListItemProps) {
    const wrapperStyle = useMemo(() => [containerStyle, styles.wrapper], [containerStyle]);

    return (
        <View style={wrapperStyle}>
            <Typo variant="title2">{label}</Typo>
            <Typo>{content}</Typo>
        </View>
    );
}
